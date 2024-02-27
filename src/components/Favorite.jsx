import React, { useEffect } from "react";

import { useFav } from "./context/FavoriteContextProvider";

export default function Favourites() {
  const { favourites, getPost, deletePostFromFav } = useFav();
  useEffect(() => {
    getPost();
  }, []);
  console.log(favourites);
  return (
    <>
      {favourites.posts
        ? favourites.posts.map((favourite) => (
            <li key={favourite.item.id} className="posts__item">
              <img src={favourite.item.image} alt="image" />
              <h2>{favourite.item.name}</h2>
              <h3>{favourite.item.type}</h3>
              <button
                className="btn red"
                onClick={() => deletePostFromFav(favourite.item.id)}
              >
                DELETE
              </button>
            </li>
          ))
        : ""}
    </>
  );
}
