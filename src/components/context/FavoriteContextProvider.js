import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS } from "../../helpers/const";
const favoriteContext = createContext();
export const useFav = () => useContext(favoriteContext);

const INIT_STATE = {
  favourites: [],
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_FAVOURITE:
      return { ...state, favourites: action.payload };
    default:
      return state;
  }
};
const FavoriteContextProvider = ({ children }) => {
  //   const getLocalStorage = () => {
  //     const post = JSON.parse(localStorage.getItem("post"));
  //     return post;
  //   };
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getLocalStorage = () => {
    const post = JSON.parse(localStorage.getItem("post"));
    if (!post) {
      const defaultPost = { posts: [] }; // Инициализируем объект с ключом posts
      localStorage.setItem("post", JSON.stringify(defaultPost));
      return defaultPost;
    }
    return post;
  };

  const getPost = () => {
    let post = getLocalStorage();
    if (!post) {
      localStorage.setItem(
        "post",
        JSON.stringify({
          posts: [],
        })
      );
      post = {
        posts: [],
      };
    }
    dispatch({
      type: ACTIONS.GET_FAVOURITE,
      payload: post,
    });
  };

  const addPostToFavouriters = (cart) => {
    let post = getLocalStorage();
    let newPost = {
      item: cart,
    };
    let postToFind = post.posts.filter((elem) => elem.item.id === cart.id);
    if (postToFind.length === 0) {
      post.posts.push(newPost);
    } else {
      post.posts = post.posts.filter((elem) => elem.item.id !== cart.id);
    }
    localStorage.setItem("post", JSON.stringify(post));
    dispatch({
      type: ACTIONS.GET_FAVOURITE,
      payload: post,
    });
  };
  console.log(state.favourites);

  const checkPostInFav = (id) => {
    let post = getLocalStorage();
    if (post) {
      let newPost = post.posts.filter((elem) => elem.item.id == id);
      return newPost.length > 0 ? true : false;
    }
  };

  const deletePostFromFav = (id) => {
    let post = getLocalStorage();
    post.posts = post.posts.filter((elem) => elem.item.id !== id);
    localStorage.setItem("post", JSON.stringify(post));
    dispatch({
      type: ACTIONS.GET_FAVOURITE,
      payload: post,
    });
  };
  const values = {
    getPost,
    addPostToFavouriters,
    checkPostInFav,
    deletePostFromFav,
    posts: state.posts,
    post: state.post,
    favourites: state.favourites,
  };
  return (
    <favoriteContext.Provider value={values}>
      {children}
    </favoriteContext.Provider>
  );
};

export default FavoriteContextProvider;
