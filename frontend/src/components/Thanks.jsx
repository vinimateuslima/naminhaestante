import "./Thanks.css";

import { toast } from "react-toastify";

import * as FaIcons from "react-icons/fa";

import progressCalculator from "../progressCalculator";

const Thanks = ({ data }) => {
  return (
    <div className="thanks">
      <div className="book">
        <div className="thumbnail">
          <img src={data.thumbnail} alt="" />
        </div>
        <h2>{data.title}</h2>
        <div className="book-info">
          <div>
            <FaIcons.FaStar /> <span>{data.rating}</span>
          </div>
          <div>{progressCalculator(data.pageCount, data.currentPage)} %</div>
        </div>
        <div className="review">
        <p>{data.review}</p>
      </div>
      </div>
    </div>
  );
};

export default Thanks;
