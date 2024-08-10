import './ReviewBook.css'

import * as FaIcons from "react-icons/fa6";

const ReviewBook = ({ data, updateFieldHandler }) => {
  return (
    <div className="reviewBook">
      <div className="pagina">
      <h3>Em qual página você está?</h3>
      <p>(Este livro possui {data.pageCount} páginas)</p>
      <input type="number" name="" id="" />
      </div>
      <div className="avaliacao">
        <h3>Como você avalia o livro?</h3>
        <div className="stars">
        <FaIcons.FaStar />
        <FaIcons.FaStar />
        <FaIcons.FaStar />
        <FaIcons.FaStar />
        <FaIcons.FaStar />
        </div>
      </div>
      <div className="resenha">
        <h3>Escreva uma resenha <span>(opcional)</span></h3>
        <textarea name="" id=""></textarea>
      </div>
    </div>
  );
};

export default ReviewBook;
