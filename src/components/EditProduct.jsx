import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { productContext } from "../context/ProductContextProvider"; // Импорт контекста

const EditProduct = () => {
  const { saveEditedProduct, getOnProduct, oneProduct } =
    useContext(productContext); // Передача контекста
  const { id } = useParams(); // Получение id из URL
  const navigate = useNavigate();
  //!--------
  const [productToEdit, setProductToEdit] = useState(oneProduct);
  console.log(oneProduct, "oneProduct");

  const handleInpEditSave = (e) => {
    if (e.target.name === "price") {
      let obj = {
        ...productToEdit,
        [e.target.name]: Number(e.target.value),
      };
      setProductToEdit(obj);
    } else {
      let obj = {
        ...productToEdit,
        [e.target.name]: e.target.value,
      };
      setProductToEdit(obj);
    }
  };

  useEffect(() => {
    getOnProduct(id);
  }, []);

  useEffect(() => {
    setProductToEdit(oneProduct); //он нужен чтоб productToEdit не попал null
  }, [oneProduct]); //!разбор

  return (
    <>
      <div className="wrapper">
        <h1>EDIT</h1>
        {productToEdit ? (
          <div>
            <input
              type="text"
              name="name"
              value={productToEdit.name}
              onChange={handleInpEditSave}
              placeholder="name"
            />
            <input
              type="text"
              name="description"
              value={productToEdit.description}
              onChange={handleInpEditSave}
              placeholder="description"
            />
            <input
              type="text"
              name="price"
              value={productToEdit.price}
              onChange={handleInpEditSave}
              placeholder="price"
            />
            <input
              type="text"
              name="image"
              value={productToEdit.image}
              onChange={handleInpEditSave}
              placeholder="image"
            />
            <input
              type="text"
              name="type"
              value={productToEdit.type}
              onChange={handleInpEditSave}
              placeholder="type"
            />

            <button
              onClick={() => {
                saveEditedProduct(productToEdit); // Передаем объект productToEdit для сохранения
                navigate("/");
              }}
            >
              SAVE EDITED PRODUCT
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default EditProduct;
//! 1 getOnProduct-лежит наша data с id /oneProduct-здесь наша data с null c id /saveEditedProduct-
