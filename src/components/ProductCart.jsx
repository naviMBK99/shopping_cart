import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useProduct } from "../context/ProductContextProvider";

const ProductCard = () => {
  const { products, deleteProduct } = useProduct();
  return (
    <>
      <div className="wrapper">
        <div class="container">
          {products.map((elem, index) => (
            <div class="card" key={index}>
              <div class="face face1">
                <div class="content-img">
                  <img width="305px" height="280px" src={elem.image} alt="" />
                </div>
              </div>
              <div class="face face2">
                <div class="content">
                  <div className="text-cart">
                    <p className="name">{elem.name}</p>
                    <p>{elem.description}</p>
                    <p className="price">{elem.price}$</p>
                    <div className="icons-position">
                      <Link to={`edit/${elem.id}`}>
                        <button className="icon edit-icon">
                          <ion-icon name="create-outline"></ion-icon>
                        </button>
                      </Link>
                      <Link to={`details/${elem.id}`}>
                        <button className="icon details">
                          <ion-icon name="eye-outline"></ion-icon>
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteProduct(elem.id)}
                        className="icon delete"
                      >
                        <ion-icon name="trash-outline"></ion-icon>
                      </button>

                      <button className="icon like">
                        <ion-icon name="heart-outline"></ion-icon>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
//!pContext -это context который принимает значение
//!getProducts(); вызываем useEffect
//!создаем карточку
//!с помощю products мы распологаем data в map и передаем
