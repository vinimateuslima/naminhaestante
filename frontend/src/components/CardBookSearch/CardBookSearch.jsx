import "./CardBookSearch.css";

import { useState } from "react";

const CardBookSearch = ({ img, selected, onClick, data }) => {
  return (
    <div className={`cardBook ${selected ? "selected" : ""}`} onClick={onClick}>
      <img src={img} alt="" />
    </div>
  );
};

export default CardBookSearch;
