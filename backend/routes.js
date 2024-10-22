const express = require("express");

const router = express.Router();

const {
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
  checkAuth,
} = require("./controllers/UserController");

router.post("/", (req, res) => createUser(req, res));

router.get("/", (req, res) => getUsers(req, res));

router.get("/checkAuth", (req, res) => checkAuth(req, res));

router.get("/:username", (req, res) => getUser(req, res));

router.delete("/:id", (req, res) => deleteUser(req, res));

router.patch("/:id", (req, res) => updateUser(req, res));

router.patch("/books/:id", (req, res) => addBookToUser(req, res));

router.get("/books/:id", (req, res) => getBooksUser(req, res));

router.get("/book/:id", (req, res) => getOnlyOneBookUser(req, res));

router.patch("/:userId/book/:bookId", (req, res) =>
  deleteOnlyOneBookUser(req, res)
);

router.patch("/:userId/updateBook/:bookId", (req, res) =>
  updateBookUser(req, res)
);

router.post("/login", (req, res) => LoginUser(req, res));



module.exports = router;
