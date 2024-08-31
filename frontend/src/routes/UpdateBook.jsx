import axios from "../axios-config";
import { toast } from "react-toastify";
import "../components/ReviewBook.css";
import "./UpdateBook.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Link, useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as FaIcons from "react-icons/fa";

const UpdateBook = () => {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`users/book/${id}`);

        setBook(res.data);
        setRating(res.data.rating);
        setCurrentPage(res.data.currentPage);
        console.log(book);
      } catch (error) {
        console.error("Erro ao buscar o livro:", error);
      } finally {
        setLoading(false);
      }
    };

    getBook();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  const updateBook = () => {
    const data = {
      status: "Lendo",
      currentPage: currentPage,
      rating: rating,
      review: review,
    };

    MySwal.fire({
      title: "Deseja atualizar o livro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      allowOutsideClick: false,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const userId = "66a3f31891ae8751357cda7f";

          const res = await axios.patch(
            `users/${userId}/updateBook/${id}`,
            data,
            {
              "Content-Type": "application/json",
            }
          );
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

  const handleCurrentPage = (e) => {
    const valorAtual = e.target.value;

    if (valorAtual >= 0 && valorAtual <= book.bookId.pageCount) {
      setCurrentPage(valorAtual);
      console.log(valorAtual);
    } else {
      toast.error("valor não pode ser maior que o número de páginas");
    }
  };

  const handleReview = (e) => {
    setReview(e.target.value);
  };

  const starClick = (currentRating) => {
    setRating(currentRating);
  };

  return (
    <div className="updateBook">
      <div className="book-menu">
        <Link className="btn-voltar" to={`/books/${id}`}>
          <FaIcons.FaArrowLeft />
        </Link>
      </div>
      <div className="pagina">
        <h3>Em qual página você está?</h3>
        <p>(Este livro possui {book.bookId.pageCount} páginas)</p>
        <input
          type="number"
          name=""
          id=""
          value={currentPage}
          onChange={(e) => handleCurrentPage(e)}
          maxLength={book.bookId.pageCount.toString.length}
          min="0"
        />
      </div>
      <div className="avaliacao">
        <h3>Como você avalia o livro?</h3>
        <div className="stars">
          {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={currentRating}
                  onClick={() => starClick(currentRating)}
                />
                <FaIcons.FaStar
                  className="star"
                  color={
                    currentRating <= (hover || rating) ? "#ff607f" : "#909090"
                  }
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>
      </div>
      <div className="resenha">
        <h3>
          Escreva uma resenha <span>(opcional)</span>
        </h3>
        <textarea name="" id="" maxLength={500} onChange={handleReview}>
          {book.review}
        </textarea>
      </div>
      <div className="updateBook-buttons">
        <Link className="cancelar" to="/">Cancelar</Link>
        <button className="atualizar" onClick={updateBook}>
          Atualizar
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;
