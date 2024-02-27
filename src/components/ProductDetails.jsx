import React, { useContext, useEffect } from "react";
import { productContext } from "./context/ProductContextProvider";
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
        <h2 className="h1-details">details</h2>

        <div className="container-2">
          {oneProduct ? (
            <div className="card-details">
              <div>
                <img
                  className="img-cart-details"
                  src={oneProduct.image}
                  alt=""
                />
              </div>
              <div>
                <div className="text-details">
                  <h5 className="name-details">{oneProduct.name}</h5>
                  <p className="description-details">
                    {oneProduct.description}
                  </p>
                  <p className="price-details">{oneProduct.price}$</p>
                </div>
                <button
                  className="btn red batton-details"
                  onClick={() => navigate(-1)}
                >
                  назад
                </button>
              </div>
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
