import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import ShowProducts from "../components/ShowProducts";
import MyCart from "../components/MyCart";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />} />
      <Route path="/products" element={<ShowProducts />} />
      <Route path="/cart" element={<MyCart />} />
    </Routes>
  );
};

export default MainRoutes;
