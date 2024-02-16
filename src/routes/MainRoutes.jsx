import React from "react";
import { Route, Routes } from "react-router-dom";
import EditProductPage from "../page/EditProductPage";
import AddProductPage from "../page/AddProductPage";
import NavbarPage from "../page/NavbarPage";
import ProductCartPage from "../page/ProductCartPage";
import Cart from "../components/cart/Cart";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/navbar" element={<NavbarPage />} />
      <Route path="/products" element={<ProductCartPage />} />
      <Route path="/add" element={<AddProductPage />} />
      <Route path="/edit/:id" element={<EditProductPage />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default MainRoutes;
