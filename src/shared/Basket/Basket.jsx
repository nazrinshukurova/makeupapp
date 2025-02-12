import React from "react";
import basket from "../../assets/basket.png";
import "./Basket.css";

const Basket = () => {
  return (
    <div className="basket">
      <img className="basketBox" src={basket}></img>
    </div>
  );
};

export default Basket;
