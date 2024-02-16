import React from "react";
import ProductDetailsPage from "../page/ProductDetailsPage";
import ProductCartPage from "../page/ProductCartPage";
import EditProductPage from "../page/EditProductPage";
import AdminPage from "../page/AdminPage";
import HomePage from "../page/HomePage";

import { Navigate, Route, Routes } from "react-router-dom";

import AuthPage from "../page/AuthPage";
import { useAuth } from "../context/AuthContextProvider";
import { ADMIN } from "../helpers/const";
import Auth from "../components/Auth";
import Confirmation from "../components/Confirmation";

import Cart from "../components/cart/Cart";



import FavoritePage from "../page/FavoritePage";

const MainRoutes = () => {
  const { user } = useAuth();
  const PUBLIC_ROUTES = [
    { id: 1, link: "/", element: <HomePage /> },
    { id: 2, link: "/product/details/:id", element: <ProductDetailsPage /> },
    { id: 3, link: "/product", element: <ProductCartPage /> },
    { id: 4, link: "/login", element: <AuthPage /> },
    { id: 4, link: "/confirmation", element: <Confirmation /> },
    { id: 4, link: "/auth", element: <Auth /> },
  ];
  const PRIVATE_ROUTES = [
    { id: 5, link: "/product/edit/:id", element: <EditProductPage /> },
    { id: 6, link: "/admin", element: <AdminPage /> },
    { id: 7, link: "/cart", element: <Cart /> },
    { id: 8, link: "/favorites", element: <FavoritePage /> },
  ];
  return (
    <div>
      <Routes>
        {PUBLIC_ROUTES.map((elem) => (
          <Route path={elem.link} key={elem.id} element={elem.element} />
        ))}
        {user
          ? PRIVATE_ROUTES.map((elem) => (
              <Route
                key={elem.id}
                path={elem.link}
                element={
                  user.email === ADMIN ? elem.element : <Navigate to="*" />
                }
              />
            ))
          : null}
      </Routes>
    </div>
  );
};

export default MainRoutes;
