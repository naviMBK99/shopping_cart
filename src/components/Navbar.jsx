import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "./context/CartContextProvider";

const Navbar = () => {
  const { addProductToCart, getProductsCountInCart } = useCart();
  const [badgeCount, setBadgeCount] = React.useState(0);
  useEffect(() => {
    setBadgeCount(getProductsCountInCart());
  }, [addProductToCart]);
  return (
    <header className="App-header">
      <h1>TECH SHOP</h1>
      <Link to={"/"}>Home</Link>
      <Link to={"/products"}>Products</Link>
      <input type="text" placeholder="Search..." />
      <Link to="/cart">
        <FaCartShopping />
      </Link>
    </header>
  );
};

export default Navbar;
