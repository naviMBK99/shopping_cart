import React, { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

import { useAuth } from "../context/AuthContextProvider";
=======
import { useProduct } from "./context/ProductContextProvider";
import SearchIcon from "@mui/icons-material/Search";
import { FaCartShopping } from "react-icons/fa6";


const Navbar = () => {
  const { getProducts, products } = useProduct();
  const { user } = useAuth();

  //!searh-----
  const [searchParams, setSearchParams] = useSearchParams();
  const [searh, setSearh] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setSearchParams({ q: searh });
  }, [searh]);

  useEffect(() => {
    getProducts();
  }, [searchParams]);
  //!searh-----finish

  const handleLoginClick = () => {
    if (user) {
      alert(`Привет, ${user.name}`);
    } else {
      window.location.href = "/auth";
    }
  };

  return (
    <div className="wrapper">
      <div className="navbar">
        <NavLink
          to={"/"}
          style={{
            color: "#FFFFFF",
            textDecoration: "none",
            fontWeight: "900",
            fontSize: "22px",
          }}
        >
          <img
            src="https://xiaomi.kg/afd712c84a85eae5e02a922a0e27fa20.svg"
            alt=""
          />
        </NavLink>

        <NavLink
          to={"/product"}
          style={{
            color: "#FFFFFF",
            textDecoration: "none",
            fontWeight: "900",
            fontSize: "22px",
          }}
        >
          Product
        </NavLink>
        <div className="s">
          <input
            className="searh"
            type="text"
            value={searh}
            onChange={(e) => setSearh(e.target.value)}
            placeholder="Search..."
          />
          <SearchIcon className="search-icon" />
        </div>

        {/* Изменяем div на кнопку и добавляем обработчик клика */}
        <button
          onClick={handleLoginClick}


        <NavLink to={"/cart"}>
          <FaCartShopping />
        </NavLink>
        <NavLink to={"/favorites"}>
          <ion-icon name="bookmarks-outline"></ion-icon>
        </NavLink>
        <NavLink
          to={"/admin"}

          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <ion-icon
            name="person-circle-outline"
            style={{
              color: "#FFFFFF",
              textDecoration: "none",
              fontWeight: "1200",
              fontSize: "32px",
            }}
          ></ion-icon>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
