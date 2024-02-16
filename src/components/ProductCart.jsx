import React, { useContext, useEffect, useState } from "react";

import { Link, useSearchParams } from "react-router-dom";

const ProductCard = () => {
  const { getProducts, products, deleteProduct } = useContext();
  //!SEARH
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
    <>
      {/* searh */}
      <h1>searh</h1>
      <input
        type="text"
        placeholder="searh"
        value={searh}
        onChange={(e) => setSearh(e.target.value)}
      />
      {/* searh */}
      <div className="container">
        {products.map((elem, index) => (
          <div className="card" key={index}>
            <img className="img-cart" src={elem.image} alt="" />
            <div className="text">
              <h5 className="name">{elem.name}</h5>
              <p className="description">{elem.description}</p>
              <p className="price">{elem.price}$</p>
              <div className="button">
                <button
                  onClick={() => deleteProduct(elem.id)}
                  className="btn add"
                >
                  DELETE
                </button>
                <Link to={`edit/${elem.id}`}>
                  <button className="btn edit">EDIT</button>
                </Link>
                <Link to={`details/${elem.id}`}>
                  <button className="btn details">DETAILS</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductCart;
