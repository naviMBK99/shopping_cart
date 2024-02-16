import React, { useEffect } from "react";
import { useCart } from "../context/CartContextProvider";

const Cart = () => {
  const { cart, getCart, changeProductCount, deleteProductFromCart } =
    useCart();
  console.log(cart.products);
  useEffect(() => {
    getCart();
  }, []);
  const cartCliner = () => {
    localStorage.removeItem("cart");
    getCart();
  };

  return (
    <div style={{ maxWidth: 650, margin: "auto", padding: 16 }}>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "right" }}>Picture</th>
            <th style={{ textAlign: "right" }}>Title</th>
            <th style={{ textAlign: "right" }}>Category</th>
            <th style={{ textAlign: "right" }}>Price</th>
            <th style={{ textAlign: "right" }}>Count</th>
            <th style={{ textAlign: "right" }}>SubPrice</th>
            <th style={{ textAlign: "right" }}>-</th>
          </tr>
        </thead>

        <tbody>
          {cart.products.map((elem) => (
            <tr key={elem.item.id}>
              <td style={{ textAlign: "right" }}>
                <img src={elem.item.image} alt="" width={70} />
              </td>
              <td style={{ textAlign: "right" }}>{elem.item.title}</td>
              <td style={{ textAlign: "right" }}>{elem.item.category}</td>
              <td style={{ textAlign: "right" }}>{elem.item.price}</td>
              <td style={{ textAlign: "right" }}>
                <input
                  onChange={(e) => {
                    changeProductCount(elem.item.id, e.target.value);
                  }}
                  type="number"
                  min={1}
                  max={20}
                  defaultValue={elem.count}
                />
              </td>
              <td style={{ textAlign: "right" }}>{elem.subPrice}</td>
              <td style={{ textAlign: "right" }}>
                <button onClick={() => deleteProductFromCart(elem.item.id)}>
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={cartCliner}>BUY NOW FOR {cart.totalPrice}</button>
    </div>
  );
};

export default Cart;
