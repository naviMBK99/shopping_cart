import React, { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { useProduct } from "../context/ProductContextProvider";

const Navbar = () => {
  const { getProducts, products } = useProduct();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searh, setSearh] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setSearchParams({ q: searh });
  }, [searh]);

  console.log(products); //лежит наша data в []
  useEffect(() => {
    getProducts();
  }, [searchParams]);

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
        <input
          className="searh"
          type="text"
          value={searh}
          onChange={(e) => setSearh(e.target.value)}
          placeholder="searh"
        />
        <NavLink
          to={"/register"}
          style={{
            color: "#FFFFFF",
            textDecoration: "none",
            fontWeight: "1200",
            fontSize: "32px",
          }}
        >
          <ion-icon name="person-circle-outline"></ion-icon>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
