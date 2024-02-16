import React, { useEffect, useState } from "react";
import { useProduct } from "../context/ProductContextProvider";
import { Link } from "react-router-dom";
import PaginationAllCard from "./PaginationAllCard";

const ProductCart = () => {
  const { products, deleteProduct, getProducts } = useProduct();
  console.log(products);

  const [page, setPage] = useState(1);
  const itemPerPage = 6;
  const count = Math.ceil(products.length / itemPerPage);
  console.log(count);
  const currentData = () => {
    const begin = (page - 1) * itemPerPage;
    const end = begin + itemPerPage;
    return products.slice(begin, end);
  };
  const handleChange = (e, value) => {
    setPage(value);
    console.log(value);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="wrapper">
        <div class="container">
          {currentData().map((elem, index) => (
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
          <PaginationAllCard
            count={count}
            page={page}
            handleChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default ProductCart;
