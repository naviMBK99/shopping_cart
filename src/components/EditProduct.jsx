import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { productContext } from "./context/ProductContextProvider"; // Импорт контекста

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
        <div className="cont-edit-todo">
          <h1 className="edit-h1">EDIT</h1>
          {productToEdit ? (
            <div className="inp-container">
              <input
                className="inp"
                type="text"
                name="name"
                value={productToEdit.name}
                onChange={handleInpEditSave}
                placeholder="name"
                style={{
                  color: "#57243A",
                  borderColor: "black",
                  fontSize: "18px ",
                  fontFamily: "monospace;",
                  fontWeight: "600",
                }}
              />
              <input
                className="inp"
                type="text"
                name="description"
                value={productToEdit.description}
                onChange={handleInpEditSave}
                placeholder="description"
                style={{
                  color: "#57243A",
                  borderColor: "black",
                  fontSize: "18px ",
                  fontFamily: "monospace;",
                  fontWeight: "600",
                }}
              />
              <input
                className="inp"
                type="text"
                name="price"
                value={productToEdit.price}
                onChange={handleInpEditSave}
                placeholder="price"
                style={{
                  color: "#57243A",
                  borderColor: "black",
                  fontSize: "18px ",
                  fontFamily: "monospace;",
                  fontWeight: "600",
                }}
              />
              <input
                className="inp"
                type="text"
                name="image"
                value={productToEdit.image}
                onChange={handleInpEditSave}
                placeholder="image"
                style={{
                  color: "#57243A",
                  borderColor: "black",
                  fontSize: "18px ",
                  fontFamily: "monospace;",
                  fontWeight: "600",
                }}
              />
              <input
                className="inp"
                type="text"
                name="type"
                value={productToEdit.type}
                onChange={handleInpEditSave}
                placeholder="type"
                style={{
                  color: "#57243A",
                  borderColor: "black",
                  fontSize: "18px ",
                  fontFamily: "monospace;",
                  fontWeight: "600",
                }}
              />

              <button
                className="btn red"
                onClick={() => {
                  saveEditedProduct(productToEdit); // Передаем объект productToEdit для сохранения
                  navigate("/");
                }}
              >
                SAVE EDIT
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default EditProduct;
//! 1 getOnProduct-лежит наша data с id /oneProduct-здесь наша data с null c id /saveEditedProduct-
