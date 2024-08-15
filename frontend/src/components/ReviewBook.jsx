import { useState } from "react";
import "./ReviewBook.css";

import * as FaIcons from "react-icons/fa6";

const ReviewBook = ({ data, updateFieldHandler }) => {
  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)


  const handleCurrentPage = (e) => {
    const valorAtual = e.target.value;

    if (valorAtual >= 0 && valorAtual <= data.pageCount) {
      updateFieldHandler({ currentPage: e.target.value });
      console.log(valorAtual);
    } else {
      console.log("valor não pode ser maior que o número de páginas");
    }
  };

  return (
    <div className="reviewBook">
      <div className="pagina">
        <h3>Em qual página você está?</h3>
        <p>(Este livro possui {data.pageCount} páginas)</p>
        <input
          type="number"
          name=""
          id=""
          value={data.currentPage || ""}
          onChange={handleCurrentPage}
          maxLength={data.pageCount.toString.length}
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
              <input type="radio" 
              name="rating"
              value={currentRating}
              onClick={() => setRating(currentRating)}
              />
              <FaIcons.FaStar
              className="star"
              color={currentRating <= (hover || rating) ? "#ff607f" : "#909090"}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
              />
            </label>
          )
          

        })}</div>
      </div>
      <div className="resenha">
        <h3>
          Escreva uma resenha <span>(opcional)</span>
        </h3>
        <textarea name="" id=""></textarea>
      </div>
    </div>
  );
};

export default ReviewBook;
