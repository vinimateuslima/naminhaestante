import "./Search.css";
import axios from "../axios-config";

import { IoSearch } from "react-icons/io5";

import { useState, useEffect } from "react";

import Card from "../components/Card/Card";

const Search = () => {
  const [searchBooks, setSearchBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]); // Livros originais
  const [searchTerm, setSearchTerm] = useState(""); // Termo de busca

  useEffect(() => {
    const getSearchBooks = async () => {
      try {
        const user = "66a3f31891ae8751357cda7f";
        const res = await axios.get(`users/books/${user}`);

        setSearchBooks(res.data);
        setAllBooks(res.data); // Armazenar todos os livros para pesquisa local
      } catch (error) {
        console.log(error);
      }
    };
    getSearchBooks();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase(); // Obtenha o termo de busca e transforme em minúsculo
    setSearchTerm(value);

    // Filtrar os livros que contêm o termo de busca no título ou em qualquer outro campo desejado
    const filteredBooks = allBooks.filter(
      (book) => book.bookId.title.toLowerCase().includes(value) // Exemplo de busca também na review
    );

    setSearchBooks(filteredBooks);
  };

  console.log(searchBooks);

  return (
    <div className="search">
      <div className="search-books">
        <input
          type="search"
          name=""
          id=""
          value={searchTerm}
          onChange={handleSearch}
        />
        <IoSearch className="search-icon" />
      </div>
      <div className="search-cards">
        {searchBooks.length > 0 &&
          searchBooks.map((book) => (
            <div key={book._id} className="search-card">
              <Card
                id={book._id}
                thumbnail={book.bookId.thumbnail}
                title={book.bookId.title}
                authors={book.bookId.authors}
                rate={book.rating}
                pageCount={book.bookId.pageCount}
                currentPage={book.currentPage}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
