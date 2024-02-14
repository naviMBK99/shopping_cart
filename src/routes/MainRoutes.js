import React from "react";
import { Route, Routes } from "react-router-dom";
import EditProductPage from "../page/EditProductPage";
import AddProductPage from "../page/AddProductPage";
import NavbarPage from "../page/NavbarPage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/navbar" element={<NavbarPage />} />
      {/* <Route path="/products" element={<ShowProducts />} /> */}
      <Route path="/add" element={<AddProductPage />} />
      <Route path="/edit/:id" element={<EditProductPage />} />
    </Routes>
  );
};

export default MainRoutes;
