import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  addQuantity,
  subtractQuantity,
} from "./actions/cartActions";
import Summary from "./Summary";

const Cart = () => {
  const getItemCount = JSON.parse(localStorage.getItem("itemCount"));
  const [count, setCount] = useState(getItemCount || {});
  const items = useSelector((state) => state.addedItems);
  const dispatch = useDispatch();
  const stateData = useSelector((state) => state);

  console.log(stateData);

  const dispatchRemoveItem = (id) => {
    dispatch(removeItem(id));
  };
  const dispatchAddQuantity = (id) => {
    dispatch(addQuantity(id));
  };
  const dispatchSubtractQuantity = (id) => {
    dispatch(subtractQuantity(id));
  };

  const handleRemove = (id) => {
    dispatchRemoveItem(id);
    let removeItem = count;
    delete removeItem[id];
    localStorage.setItem("itemCount", JSON.stringify(removeItem));
  };

  const handleAddQuantity = (id) => {
    dispatchAddQuantity(id);
    const getItem = { ...count, [id]: count[id] + 1 || 2 };
    localStorage.setItem("itemCount", JSON.stringify(getItem));
    setCount(getItem);
  };
  const handleSubtractQuantity = (id) => {
    if (count[id] === 1 || count[id] === undefined) {
      return;
    }
    dispatchSubtractQuantity(id);
    const getItem = { ...count, [id]: count[id] - 1 || 1 };
    localStorage.setItem("itemCount", JSON.stringify(getItem));
    setCount(getItem);
  };

  const addedItems = items?.length ? (
    items.map((item) => {
      return (
        <div className="col-sm-12 my-2" key={item.id}>
          <div className="card">
            <div className="row g-0">
              <div className="col-md-1">
                <img
                  src={item.img}
                  alt={item.title}
                  className="img-fluid rounded-start"
                />
              </div>
              <div className="col-md-11">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">
                        <small className="text-muted">{item.desc}</small>
                      </p>
                      <p className="card-text">
                        <b>{item.price} ₹</b>
                      </p>
                    </div>
                    <div className="col-md-3">
                      <p className="card-text">
                        <b>{item.price * (count[item.id] || 1)} ₹</b>
                      </p>
                      <div className="row">
                        <div className="col-md-10">
                          <div className="input-group">
                            <span className="input-group-btn">
                              <button
                                className="btn btn-danger"
                                onClick={() => {
                                  handleSubtractQuantity(item.id);
                                }}>
                                <i className="bi bi-dash-circle"></i>
                              </button>
                            </span>
                            <input
                              type="text"
                              className="form-control text-center"
                              value={count[item.id] || 1}
                              readOnly
                            />
                            <span className="input-group-btn">
                              <button
                                className="btn btn-success"
                                onClick={() => {
                                  handleAddQuantity(item.id);
                                }}>
                                <i className="bi bi-plus-circle"></i>
                              </button>
                            </span>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              handleRemove(item.id);
                            }}>
                            X
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <p>Nothing.</p>
  );

  return (
    <div className="container">
      <div className="row">
        <h5>You have ordered:</h5>
        {addedItems}
      </div>
      <Summary />
    </div>
  );
};

export default Cart;
