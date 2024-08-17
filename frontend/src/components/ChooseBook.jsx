import "./ChooseBook.css";

import CardBookSearch from "./CardBookSearch/CardBookSearch";
import { IoSearch } from "react-icons/io5";

import { useState, useEffect } from "react";

const ChooseBook = ({ data, updateFieldHandler }) => {
  const [books, setBooks] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const getGoogleBooks = async () => {
      try {
        const apiKey = "";
        const search = "harry potter"
        const url = `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=9&key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        console.log(data.items);
        setBooks(data.items);
      } catch (error) {
        console.log(error.message);
      }
    };

    getGoogleBooks();
    setSelectedCard(data.googleBookId);
  }, []);

  const handleClick = (book) => {
    console.log("Clicou", book);
    const {
      id,
      volumeInfo: {
        title,
        authors = [""],
        description = "",
        imageLinks: { thumbnail = "" } = {},
        categories = [""],
        pageCount = 0,
      },
    } = book;

    // Atualiza todos os campos relevantes com um único objeto
    updateFieldHandler({
      googleBookId: id,
      title,
      authors,
      description,
      thumbnail,
      categories,
      pageCount,
    });

    // Atualiza o estado do livro selecionado
    setSelectedCard(id);
  };

  return (
    <div className="choose-book">
      <div className="search-container">
        <input type="search" name="" id="" placeholder="Pesquise pelo livro" />
        <IoSearch className="search-icon" />
      </div>
      <div className="grid">
        {books.length > 0 &&
          books.map((book) => (
            <CardBookSearch
              key={book.id}
              img={
                book.volumeInfo.imageLinks
                  ? book.volumeInfo.imageLinks.thumbnail
                  : "http://via.placeholder.com/90x142"
              }
              selected={selectedCard === book.id}
              onClick={() => handleClick(book)}
            />
          ))}
      </div>
    </div>
  );
};

export default ChooseBook;
