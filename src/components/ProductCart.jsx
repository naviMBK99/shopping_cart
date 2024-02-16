import React, { useContext, useEffect, useState } from "react";

import { Link, useSearchParams } from "react-router-dom";
import { useProduct } from "./context/ProductContextProvider";

const ProductCart = () => {
  const { getProducts, products, deleteProduct } = useProduct();
  //!SEARH
  const [searchParams, setSearchParams] = useSearchParams();
  const [searh, setSearh] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setSearchParams({ q: searh });
  }, [searh]);

  console.log(products); //лежит наша data в []
  useEffect(() => {
    getProducts();
  }, [searchParams]);
  return (
    <>
      <div className="wrapper">
        <div class="container">
          {products.map((elem, index) => (
            <div className="card" key={index}>
              <div className="face face1">
                <div className="content-img">
                  <img width="305px" height="280px" src={elem.image} alt="" />
                </div>
              </div>
              <div className="face face2">
                <div className="content">
                  <div className="text-cart">
                    <p className="name">{elem.name}</p>
                    <p>{elem.description}</p>
                    <p className="price">{elem.price}$</p>
                    <div className="icons-position">
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

export default ProductCart;
