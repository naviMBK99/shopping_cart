import React from "react";
import { Route, Routes } from "react-router-dom";
import EditProductPage from "../page/EditProductPage";
import AddProductPage from "../page/AddProductPage";
import ProductCartPage from "../page/ProductCartPage";
import ProductDetailsPage from "../page/ProductDetailsPage";
import HomePage from "../page/HomePage";

const MainRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/navbar" element={<NavbarPage />} /> */}
      {/* <Route path="/products" element={<ShowProducts />} /> */}
      <Route path="/add" element={<AddProductPage />} />
      <Route path="/product/edit/:id" element={<EditProductPage />} />
      <Route path="/product" element={<ProductCartPage />} />
      <Route path="product/details/:id" element={<ProductDetailsPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default MainRoutes;
