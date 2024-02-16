import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS } from "../../helpers/const";
import {
  calcSubPrice,
  calcTotalPrice,
  getLocalStorage,
  getProductsCountInCart,
} from "../../helpers/functions";
const cartContext = createContext();
export const useCart = () => useContext(cartContext);
const INIT_STATE = {
  cart: JSON.parse(localStorage.getItem("cart")),
  cartLength: getProductsCountInCart(),
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_CART:
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};
const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  //! GET
  // функция для получения продуктов добавленных в корзину из хранилища
  const getCart = () => {
    // получаем данные из localStorage
    let cart = getLocalStorage();
    // проверка на наличие данных под ключом cart в localStorage
    if (!cart) {
      localStorage.setItem(
        "cart",
        JSON.stringify({
          products: [],
          totalPrice: 0,
        })
      );
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    // обновляем состояние
    dispatch({
      type: ACTIONS.GET_CART,
      payload: cart,
    });
  };
  //! CREATE
  // функция для добавления товара в корзину
  const addProductToCart = (product) => {
    // получаем содержимое из хранилища под ключом cart
    let cart = getLocalStorage();
    // проверка на существование данных в хранилище под ключом cart
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    // создаем обьект, который добавим в localStorage в массив cart.products
    let newProduct = {
      item: product,
      count: 1,
      subPrice: product.price,
    };

    // проверяем есть ли уже продукт, который хотим добавить в корзину
    let productToFind = cart.products.filter(
      (elem) => elem.item.id === product.id
    );
    // если товар уже добавлен в корзину, то удаляем его из массива cart.products через фильтр, в противном случае добавляем его  cart.products
    if (productToFind.length === 0) {
      cart.products.push(newProduct);
    } else {
      cart.products = cart.products.filter(
        (elem) => elem.item.id !== product.id
      );
    }
    // пересчитываем totalPrice
    cart.totalPrice = calcTotalPrice(cart.products);
    // обновляем данные в localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    // обновляем состояние
    dispatch({
      type: ACTIONS.GET_CART,
      payload: cart,
    });
  };
  // функция для проверки на наличие товара в корзине
  const checkProductInCart = (id) => {
    let cart = getLocalStorage();
    if (cart) {
      let newCart = cart.products.filter((elem) => elem.item.id == id);
      return newCart.length > 0 ? true : false;
    }
  };
  // функция для изменения стоимости за одну позицию
  const changeProductCount = (id, count) => {
    // получаем данные корзины из localStorage
    let cart = getLocalStorage();
    // перебираем массив с продуктами из корзины, и у продукта, у которого id сопадает с тем id? что передали при вызове, перезаписываем count (кол-во) и subPrice
    cart.products = cart.products.map((elem) => {
      if (elem.item.id === id) {
        elem.count = count;
        elem.subPrice = calcSubPrice(elem);
      }
      return elem;
    });
    cart.totalPrice = calcTotalPrice(cart.products);
    // обновляем localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    // обновляем состояние
    dispatch({
      type: ACTIONS.GET_CART,
      payload: cart,
    });
  };
  //! DELETE
  const deleteProductFromCart = (id) => {
    let cart = getLocalStorage();
    cart.products = cart.products.filter((elem) => elem.item.id !== id);
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: ACTIONS.GET_CART,
      payload: cart,
    });
  };
  const values = {
    addProductToCart,
    cart: state.cart,
    getCart,
    checkProductInCart,
    getProductsCountInCart,
    changeProductCount,
    deleteProductFromCart,
  };
  return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
};

export default CartContextProvider;
