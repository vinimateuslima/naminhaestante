import axios from "../axios-config";

import "./Book.css";

import { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import * as FaIcons from "react-icons/fa";

import { CiMenuKebab } from "react-icons/ci";

import progressCalculator from "../progressCalculator";

const Book = () => {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const getBook = async () => {
      const res = await axios.get(`users/book/${id}`);

      setBook(res.data);
    };

    getBook();
  });

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  if (!book) return <p>Carregando...</p>;

  return (
    <div className="book-page">
      <div className="book-menu">
        <Link className="btn-voltar" to="/">
          <FaIcons.FaArrowLeft />
        </Link>

        <Link onClick={toggleOptions} className="btn-menu">
          <CiMenuKebab />
        </Link>
      </div>
      {showOptions && (
            <div className="options-menu">
              <Link className="option">Editar</Link>
              <Link className="option delete">Excluir</Link>
            </div>
          )}
      <div className="book-body">
        <div className="book-img">
          <img src={book.bookId.thumbnail} alt="" />
        </div>
        <div className="book-title">
          <h1>{book.bookId.title}</h1>
          {book.bookId.authors.map((author, index) => (
            <span key={index}>{`${author} `}</span>
          ))}
        </div>
        <div className="book-info">
          <div>
            <p>Avaliação</p>
            <FaIcons.FaStar /> <span>{book.rating}</span>
          </div>
          <div>
            <p>Genero</p>
            <span>{book.bookId.categories}</span>
          </div>
          <div>
            <p>Progresso</p>
            <span>
              {progressCalculator(book.bookId.pageCount, book.currentPage)}%
            </span>
          </div>
        </div>
        <div className="book-sinopse">
          <h3>Sinopse</h3>
          <p>{book.bookId.description}</p>
        </div>
        <div className="book-review">
          <h3>Resenha</h3>
          <p>{book.review}</p>
        </div>
      </div>
    </div>
  );
};

export default Book;
