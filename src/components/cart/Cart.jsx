import React, { useEffect } from "react";
import { useCart } from "../context/CartContextProvider";
import { Button } from "@mui/base";

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
    <div
      style={{
        manWidth: "100%",
        padding: 16,
        display: "grid",
        gridTemplateColumns: "repeat (7,1fr)",
        gap: "100",
      }}
    >
      <table style={{ width: "100%" }}>
        <div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-around",
              marginBottom: "40px",
            }}
          >
            <div style={{ textAlign: "right" }}>Picture</div>
            <div style={{ textAlign: "right" }}>Title</div>
            <div style={{ textAlign: "right" }}>Category</div>
            <div style={{ textAlign: "right" }}>Price</div>
            <div style={{ textAlign: "right" }}>Count</div>
            <div style={{ textAlign: "right" }}>SubPrice</div>
            <div style={{ textAlign: "right" }}>-</div>
          </div>
        </div>

        <tbody>
          {cart.products.map((elem) => (
            <div
              key={elem.item.id}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "stretch",
                justifyContent: "space-between",
                marginBottom: "30px",
              }}
            >
              <div style={{ textAlign: "right" }}>
                <img src={elem.item.image} alt="" width={70} />
              </div>
              <div style={{ textAlign: "right" }}>{elem.item.name}</div>
              <div style={{ textAlign: "right" }}>{elem.item.type}</div>
              <div style={{ textAlign: "right" }}>{elem.item.price}</div>
              <div style={{ textAlign: "right" }}>
                <input
                  onChange={(e) => {
                    changeProductCount(elem.item.id, e.target.value);
                  }}
                  type="number"
                  min={1}
                  max={20}
                  defaultValue={elem.count}
                />
              </div>
              <div style={{ textAlign: "right" }}>{elem.subPrice}</div>
              <div style={{ textAlign: "right" }}>
                <button onClick={() => deleteProductFromCart(elem.item.id)}>
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </tbody>
      </table>
      <Button
        className="btn red"
        style={{ width: "200px", height: "40px" }}
        variant="contained"
        onClick={cartCliner}
      >
        BUY NOW FOR {cart.totalPrice}
      </Button>
    </div>
  );
};

export default Cart;
