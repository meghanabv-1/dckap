import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems, addToCart } from "./actions/cartActions";
import { productsData } from "./data/products";

const Home = () => {
  const items = useSelector((state) => state.items);
  const addedItems = useSelector((state) => state.addedItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems(productsData));
  }, []);

  const dispatchAddToCart = (id) => {
    dispatch(addToCart(id));
  };

  const handleClick = (id) => {
    dispatchAddToCart(id);
  };

  const itemList = items?.map((item) => {
    const showButton =
      addedItems.filter((o) => o.id === item.id).length > 0
        ? "Added to Cart"
        : "Add to Cart";

    return (
      <div className="col-sm-3 my-2" key={item.id}>
        <div className="card">
          <img src={item.img} alt={item.title} className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">{item.desc}</p>
            <p className="card-text">
              <b>{item.price} ₹</b>
            </p>
            <button
              className={`btn ${
                showButton === "Add to Cart" ? "btn-primary" : "btn-success"
              }`}
              onClick={() => {
                handleClick(item.id);
              }}>
              {showButton}
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">{itemList}</div>
    </div>
  );
};

export default Home;
