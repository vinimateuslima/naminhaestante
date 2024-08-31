import "./ChooseBook.css";

import CardBookSearch from "./CardBookSearch/CardBookSearch";
import { IoSearch } from "react-icons/io5";

import { useState, useEffect } from "react";

const ChooseBook = ({ data, updateFieldHandler }) => {
  const [books, setBooks] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [search, setSearch] = useState(data.search);

  const getGoogleBooks = async () => {
    try {
      const apiKey = "AIzaSyCkHU_f9A5tkTVWUdZQ7kmNpp4L1wF8uUs";
      const searchGoogle = search || "harry potter";
      const url = `https://www.googleapis.com/books/v1/volumes?q=${searchGoogle}&maxResults=9&key=${apiKey}`;
      const response = await fetch(url);
      const dataGoogle = await response.json();

      console.log(dataGoogle.items);
      setBooks(dataGoogle.items);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setSelectedCard(data.googleBookId);
    searchBookGoogle();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const searchBookGoogle = () => {
    getGoogleBooks();
    updateFieldHandler({ search: search });
  };

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

  const placeholderItems = Array.from({ length: 9 }, (_, index) => index);

  return (
    <div className="choose-book">
      <div className="search-container">
        <input
          type="search"
          name=""
          id=""
          value={search}
          onChange={handleSearch}
          placeholder="Pesquise pelo livro"
        />
        <IoSearch className="search-icon" onClick={searchBookGoogle} />
      </div>
      <div className="grid">
        {books.length > 0
          ? books.map((book) => (
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
            ))
          : placeholderItems.map((_, index) => (
              <div key={index} className="placeholder"></div>
            ))}
      </div>
    </div>
  );
};

export default ChooseBook;
