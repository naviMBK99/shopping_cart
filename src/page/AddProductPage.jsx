import React from "react";
import AddProduct from "../components/AddProduct";
import AddCategory from "../components/AddCategory";
import AddCategoryPage from "./AddCategoryPage";

const AddProductPage = () => {
  return (
    <div>
      <AddCategoryPage />
      <AddProduct />
    </div>
  );
};

export default AddProductPage;
