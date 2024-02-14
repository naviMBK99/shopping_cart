import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="App-header">
      <h1>TECH SHOP</h1>
      <Link to={"/"}>Home</Link>
      <Link to={"/products"}>Products</Link>
      <input type="text" placeholder="Search..." />
    </header>
  );
};

export default Navbar;
