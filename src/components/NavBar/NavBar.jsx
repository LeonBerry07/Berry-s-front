import "./NavBar.css";
import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useCart } from "../CartContext/CartContext";

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useCart();

  function handleLogout() {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser) {
      localStorage.removeItem(`cart_${savedUser.email}`);
    }

    logout();

    window.location.href = "/";
  }

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
          <Link to="/cart">Cart 🛒 ({cart?.length || 0})</Link>
        </li>

        <li>
          <Link to="/orders">Orders 📦</Link>
        </li>

        {user ? (
          <>
            <li>
              <span style={{ color: "white" }}>
                👋 {user.name}
              </span>
            </li>

            <li>
              <button onClick={handleLogout}>
                Logout 🚪
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>

    </nav>
  );
}

export default NavBar;