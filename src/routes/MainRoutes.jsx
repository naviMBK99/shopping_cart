import React from "react";
import ProductDetailsPage from "../page/ProductDetailsPage";
import ProductCartPage from "../page/ProductCartPage";
import EditProductPage from "../page/EditProductPage";
import AdminPage from "../page/AdminPage";
import HomePage from "../page/HomePage";
import { Route, Routes } from "react-router-dom";
import Auth from "../components/Auth";
import Register from "../components/Register";

const MainRoutes = () => {
  const PUBLIC_ROUTES = [
    { id: 1, link: "/", element: <HomePage /> },
    { id: 2, link: "/product/details/:id", element: <ProductDetailsPage /> },
    { id: 3, link: "/product", element: <ProductCartPage /> },
    { id: 4, link: "/product/edit/:id", element: <EditProductPage /> },
    { id: 5, link: "/admin", element: <AdminPage /> },
    { id: 6, link: "/auth", element: <Auth /> },
    { id: 7, link: "/register", element: <Register /> },
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
