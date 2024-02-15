import React from "react";
import ProductDetailsPage from "../page/ProductDetailsPage";
import ProductCartPage from "../page/ProductCartPage";
import AddProductPage from "../page/AddProductPage";
import EditProductPage from "../page/EditProductPage";
import AdminPage from "../page/AdminPage";
import HomePage from "../page/HomePage";
import { Route, Routes } from "react-router-dom";

const MainRoutes = () => {
  const PUBLIC_ROUTES = [
    { id: 1, link: "/", element: <HomePage /> },
    { id: 2, link: "/product/details/:id", element: <ProductDetailsPage /> },
    { id: 3, link: "/product", element: <ProductCartPage /> },
    { id: 4, link: "/add", element: <AddProductPage /> },
    { id: 5, link: "/product/edit/:id", element: <EditProductPage /> },
    { id: 6, link: "/admin", element: <AdminPage /> },
  ];
  return (
    <div>
      <Routes>
        {PUBLIC_ROUTES.map((elem) => (
          <Route path={elem.link} key={elem.id} element={elem.element} />
        ))}
      </Routes>
    </div>
  );
};

export default MainRoutes;
