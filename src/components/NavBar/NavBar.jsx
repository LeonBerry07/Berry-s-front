import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar({ cart }) {
  return (
    <nav className="navbar">

      <div>
        <Link to="/" className="navbar-logo">
          Berry's Music
        </Link>
      </div>

      <ul className="navbar-links">

        <li>
          <Link to="/">Inicio</Link>
        </li>

        <li>
          <Link to="/catalogue">Catalogue</Link>
        </li>

        <li>
          <Link to="/cart">Cart 🛒 ({cart.length})</Link>
        </li>

        <li>
          <Link to="/login" className="login-button">
            Login
          </Link>
        </li>

      </ul>

    </nav>
  );
}

export default NavBar;