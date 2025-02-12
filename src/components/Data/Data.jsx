import React, { useState, useEffect } from "react";

import "./Data.css";

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
        dicount: dataObj.discountPercentage,
      }));
  };

  const countDiscount = (discount) => {
    return beautyProducts()
  };

  const beautyProduct = beautyProducts();

  return (
    <div className="products">
      {beautyProduct.map((product, index) => (
        <div className="productsGroup">
          <img className="imageDiv" key={index} src={product.images}></img>
          <p className="productPrice" key={index}>
            ${product.price}{" "}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Data;
