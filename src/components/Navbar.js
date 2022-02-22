import React from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Shopping
        </Link>

        <div className="nav justify-content-end">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/cart" className="nav-link active">
                <i className="bi bi-cart4"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
