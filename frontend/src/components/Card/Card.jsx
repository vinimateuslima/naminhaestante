import { useEffect, useState } from "react";

import "./Card.css";

import * as FaIcons from "react-icons/fa6";

const Card = ({ tumbnail, title, authors, rate, pageCount, currentPage }) => {
  const rating = new Array(5).fill(<FaIcons.FaRegStar />);

  const countRating = (rate) => {
    for (let i = 0; i < rate; i++) {
      rating[i] = <FaIcons.FaStar />;
    }

    return rating;
  };

  const progress = (pageCount, currentPage) => {

    return ((currentPage / pageCount) * 100).toFixed(0);

  }

  return (
    <>
      <div className="card-img">
        <img src={tumbnail} alt="" />
      </div>
      <div className="card-body">
        <div className="card-title">
          <h5>{title}</h5>
        </div>
        <span className="card-autor">{authors}</span>

        <div className="card-info">
          <div className="card-rating">
            {countRating(rate).map((star, index) => (
              <span key={index}>{star}</span>
            ))}
          </div>
          <div className="card-progress">
            <span>{progress(pageCount, currentPage)}</span><span>%</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
