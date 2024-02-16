import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";


import AuthContextProvider from "./context/AuthContextProvider";

import ProductContextProvider from "./components/context/ProductContextProvider";
import CartContextProvider from "./components/context/CartContextProvider";
import FavoriteContextProvider from "./components/context/FavoriteContextProvider";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <ProductContextProvider>
      <CartContextProvider>
        <FavoriteContextProvider>
          <App />
        </FavoriteContextProvider>
      </CartContextProvider>
    </ProductContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
