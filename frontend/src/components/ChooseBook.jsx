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
        const url =
          "https://www.googleapis.com/books/v1/volumes?q=harrypotter&maxResults=9&key=AIzaSyCkHU_f9A5tkTVWUdZQ7kmNpp4L1wF8uUs";

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log(data.items);
            setBooks(data.items);
          })
          .catch((error) => {
            console.error(error.message);
          });
      } catch (error) {
        console.log(error.message);
      }
    };

    getGoogleBooks();
  }, []);

  const handleClick = (index, book) => {
    console.log("Clicou", book);
    updateFieldHandler("googleBookId", book.id);
    updateFieldHandler("title", book.volumeInfo.title);
    updateFieldHandler("authors", book.volumeInfo.authors);
    updateFieldHandler("description", book.volumeInfo.description);
    updateFieldHandler("thumbnail", book.volumeInfo.imageLinks.thumbnail || "");
    updateFieldHandler("categories", book.volumeInfo.categories);
    updateFieldHandler("pageCount", book.volumeInfo.pageCount);
    setSelectedCard(index);
  };

  return (
    <div className="choose-book">
      <div className="search-container">
        <input type="search" name="" id="" placeholder="Pesquise pelo livro" />
        <IoSearch className="search-icon" />
      </div>
      <div className="grid">
        {books.length > 0 &&
          books.map((book, index) => (
            <CardBookSearch
              key={index}
              img={
                book.volumeInfo.imageLinks
                  ? book.volumeInfo.imageLinks.thumbnail
                  : "http://via.placeholder.com/90x142"
              }
              selected={selectedCard === index}
              onClick={() => handleClick(index, book)}
            />
          ))}
      </div>
    </div>
  );
};

export default ChooseBook;
