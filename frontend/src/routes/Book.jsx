import axios from "../axios-config";

import "./Book.css";

import { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import Swal from "sweetalert2";

import withReactContent from "sweetalert2-react-content";

import { useNavigate } from "react-router-dom";

import * as FaIcons from "react-icons/fa";

import { CiMenuKebab } from "react-icons/ci";

import progressCalculator from "../progressCalculator";

const Book = () => {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const getBook = async () => {
      const res = await axios.get(`users/book/${id}`);

      setBook(res.data);
    };

    getBook();
  }, []);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const deleteBook = async (userId, bookId) => {
    MySwal.fire({
      title: "Deseja excluir o livro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      allowOutsideClick: false,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.patch(`users/${userId}/book/${bookId}`, {
            "Content-Type": "application/json",
          });
          toast.success(res.data.msg);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.msg);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log("Usuário respondeu Não");
        // Lógica para quando o usuário clica em Não
      }
    });
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
          <Link className="option" to={`/update-book/${book._id}`}>Editar</Link>
          <Link
            className="option delete"
            onClick={() => deleteBook("66a3f31891ae8751357cda7f", id)}
          >
            Excluir
          </Link>
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
