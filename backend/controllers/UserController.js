const User = require("../models/User");
const Book = require("../models/Book");

// Criptografia
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ msg: "Por favor, preencha todos os campos." });
    }

    if (existingUser) {
      return res.status(409).json({ msg: "Usuário já está cadastrado." });
    }

    // Criptografar a senha antes de salvar no banco
    const saltRounds = 10; // Número de rounds para gerar o salt
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      passwordHash,
    });

    await newUser.save();

    res.status(201).json({
      msg: "Usuário criado com sucesso!",
      newUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Ocorreu um erro!");
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).send("Ocorreu um erro!");
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).send("Ocorreu um erro!");
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    res.json({ msg: "Usuário excluído com sucesso!" });
  } catch (error) {
    res.status(500).send("Ocorreu um erro!");
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, email, passwordHash } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    const updateData = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (passwordHash) updateData.passwordHash = passwordHash;

    const updateUser = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json({ updateUser, msg: "Usuário atualizado com sucesso!" });
  } catch (error) {
    res.status(500).send("Ocorreu um erro!");
  }
};

const addBookToUser = async (req, res) => {
  try {
    const {
      googleBookId,
      title,
      authors,
      description,
      thumbnail,
      categories,
      pageCount,
      status,
      rating,
      currentPage,
      review,
    } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    let book = await Book.findOne({ googleBookId });

    if (!book) {
      book = new Book({
        googleBookId,
        title,
        authors,
        description,
        thumbnail,
        categories,
        pageCount,
      });

      await book.save();
      console.log("Livro criado com sucesso!");
    }

    const userBook = { bookId: book._id, status, rating, currentPage, review };

    const filteredBook = user.books.filter((books) =>
      books.bookId.equals(book._id)
    );

    if (filteredBook.length > 0) {
      return res.status(400).json({ msg: "Livro já está adicionado!" });
    }

    user.books.push(userBook);

    await user.save();

    return res.status(200).json({ msg: "Livro adicionado com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocorreu um erro!");
  }
};

const getBooksUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("books.bookId");

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    res.json(user.books);
  } catch (error) {
    res.status(500).send("Ocorreu um erro!");
  }
};

const getOnlyOneBookUser = async (req, res) => {
  try {
    const user = await User.findOne(
      { "books._id": req.params.id },
      { "books.$": 1 }
    ).populate("books.bookId");

    if (!user) {
      return res.status(404).json({ msg: "Livro não encontrado!" });
    }

    res.json(user.books[0]);
  } catch (error) {
    res.status(500).send("Ocorreu um erro!");
  }
};

const deleteOnlyOneBookUser = async (req, res) => {
  try {
    const result = await User.updateOne(
      { _id: req.params.userId, "books._id": req.params.bookId },
      { $pull: { books: { _id: req.params.bookId } } }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ msg: "Livro excluído com sucesso!" });
    } else {
      return res.status(404).json({ msg: "Livro não encontrado!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Erro ao excluir o livro!", error: error.message });
  }
};

const updateBookUser = async (req, res) => {
  try {
    const { status, rating, currentPage, review } = req.body;

    const result = await User.updateOne(
      {
        _id: req.params.userId,
        "books._id": req.params.bookId,
      },
      {
        $set: {
          "books.$.status": status,
          "books.$.rating": rating,
          "books.$.currentPage": currentPage,
          "books.$.review": review,
        },
      }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ msg: "Livro atualizado com sucesso!" });
    } else {
      res.status(404).json({ msg: "Nenhum livro foi atualizado!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Erro ao atualizar o livro!", error: error.message });
  }
};

const LoginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    // Criptografar a senha antes de salvar no banco
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (isPasswordValid) {
      return res.status(200).json({ msg: "Usuário autenticado com sucesso!" });
    }

    return res.status(404).json({ msg: "Senha incorreta!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao fazer login!", error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  addBookToUser,
  getBooksUser,
  getOnlyOneBookUser,
  deleteOnlyOneBookUser,
  updateBookUser,
  LoginUser,
};
