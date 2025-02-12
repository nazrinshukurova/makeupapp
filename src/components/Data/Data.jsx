import React, { useState, useEffect } from "react";
import "./Data.css";
import AddToCard from "../../shared/AddCartButton/AddToCard";
import Basket from "../../shared/Basket/Basket";

const Data = () => {
  const base_url = "https://dummyjson.com/products";
  const [data, setData] = useState({ products: [] });
  const [error, setError] = useState(null);

  const fetchInfo = () => {
    fetch(base_url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((d) => {
        setData(d);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const beautyProducts = () => {
    return data.products
      .filter((dataObj) => dataObj.category === "beauty")
      .map((dataObj) => ({
        images: dataObj.images,
        price: dataObj.price,
        title: dataObj.title,
        discountPercentage: dataObj.discountPercentage,
      }));
  };

  const beautyProduct = beautyProducts();

  const countDiscount = (price, discount) => {
    if (typeof price !== "number" || typeof discount !== "number") {
      return price;
    }
    return (price - (price * discount) / 100).toFixed(2);
  };

  const Product = ({ product }) => {
    const [count, setCount] = useState(0);

    const handleCountChange = (change) => {
      setCount((prevCount) => {
        const newCount = prevCount + change;
        return newCount < 0 ? 0 : newCount;
      });
    };

    return (
      <div className="productsGroup">
        <img className="imageDiv" src={product.images} alt="product" />

        <div className="prices">
          <p className="productPrice">${product.price}</p>
          <p className="discountedPrice">
            ${countDiscount(product.price, product.discountPercentage)}
          </p>
        </div>

        <p className="productTitle">{product.title}</p>
        <AddToCard
          txt="ADD TO CART"
          bgColor="#9069b2"
          onCountChange={() => handleCountChange(1)}
        />
        <AddToCard
          txt="REMOVE FROM BASKET"
          bgColor="red"
          onCountChange={() => handleCountChange(-1)}
        />
        <AddToCard
          txt="RESET"
          bgColor="#353535"
          onCountChange={() =>setCount(0) }
        />

        <div className="countingItems">
          <p className="countingNumber"> {count}</p>
          <Basket />
        </div>
      </div>
    );
  };

  return (
    <div className="products">
      {beautyProduct.map((product, index) => (
        <Product key={index} product={product} />
      ))}
    </div>
  );
};

export default Data;
