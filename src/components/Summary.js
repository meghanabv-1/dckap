import { useSelector } from "react-redux";

const Summary = () => {
  const total = useSelector((state) => state.total);

  return (
    <div className="container">
      <div className="row">
        <div className="collection">
          <ul className="list-group">
            <li className="list-group-item">
              <b>Subtotal: {total} ₹</b>
            </li>
          </ul>
        </div>
        <div className="checkout mt-2">
          <button className="btn btn-primary">View Cart</button>
          <button className="btn btn-primary mx-2">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
