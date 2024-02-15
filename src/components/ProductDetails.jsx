import React, { useContext, useEffect } from "react";
import { productContext } from "../context/ProductContextProvider";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const { getOnProduct, oneProduct } = useContext(productContext); // Передача контекста

  const { id } = useParams(); //тут получаем с помощю хука id
  const navigate = useNavigate();
  useEffect(() => {
    getOnProduct(id);
  }, []);
  console.log(oneProduct, "oneProduct888"); //в нем лежит наша data и null
  return (
    <>
      <div className="wrapper">
        <h2>details</h2>

        <div className="container-2">
          {oneProduct ? (
            <div className="card">
              <img className="img-cart" src={oneProduct.image} alt="" />
              <div className="text">
                <h5 className="name">{oneProduct.name}</h5>
                <p className="description">{oneProduct.description}</p>
                <p className="price">{oneProduct.price}</p>
              </div>
              <button className="btn btn-details" onClick={() => navigate(-1)}>
                назад
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
//!1вызываем useEffect для того чтобы при открытие страницы отоброжался наш getOnProduct с id и отоброжается наши карточки с помощю oneProduct в нем лежит наша data с null
//!2 делаем кнопку назад с помощю navigate(-1)
