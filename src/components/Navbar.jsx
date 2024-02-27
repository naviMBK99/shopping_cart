import React, { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";
import { useProduct } from "./context/ProductContextProvider";
import SearchIcon from "@mui/icons-material/Search";
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
  const { getProducts } = useProduct();
  const { user } = useAuth();

  //!search-----
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setSearchParams({ q: search });
  }, [search, setSearchParams]);

  useEffect(() => {
    getProducts();
  }, [searchParams, getProducts]);
  //!search-----finish

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
            className="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
          <SearchIcon className="search-icon" />
        </div>

        <button onClick={handleLoginClick}>
          <NavLink to={"/cart"}>
            <FaCartShopping />
          </NavLink>
        </button>
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
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
