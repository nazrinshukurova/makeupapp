import React from "react";
import "./AddToCart.css";

const AddToCard = (props) => {
  return (
    <div>
      <button
        onClick={props.onCountChange}
        className="addCart"
        style={{ backgroundColor: props.bgColor }}
      >
        {props.txt}
      </button>
    </div>
  );
};

export default AddToCard;