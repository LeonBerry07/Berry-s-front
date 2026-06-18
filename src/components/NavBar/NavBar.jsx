import "./NavBar.css";

import React, {
  useContext,
} from "react";

import { Link } from "react-router-dom";

import { AuthContext } from "../Context/AuthContext";

import { useCart } from "../CartContext/CartContext";

function NavBar() {
  const {
    user,
    logout,
  } = useContext(AuthContext);

  const {
    cart,
    favorites,
  } = useCart();

  // =========================
  // LOGOUT
  // =========================

  function handleLogout() {
    const savedUser =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    if (savedUser) {
      localStorage.removeItem(
        `cart_${savedUser.email}`
      );
    }

    logout();

    window.location.href = "/";
  }

  // =========================
  // UI
  // =========================

  return (
    <nav className="navbar">
      {/* LOGO */}

      <div>
        <Link
          to="/"
          className="navbar-logo"
        >
          Berry's
        </Link>
      </div>

      {/* LINKS */}

      <ul className="navbar-links">
        <li>
          <Link to="/">
            Home
          </Link>
        </li>

        <li>
          <Link to="/catalogue">
            Catalogue
          </Link>
        </li>

        {/* FAVORITES */}

        <li>
          <Link to="/favorites">
            Favorites ❤️ (
            {favorites?.length ||
              0}
            )
          </Link>
        </li>

        {/* CART */}

        <li>
          <Link to="/cart">
            Cart 🛒 (
            {cart?.length || 0}
            )
          </Link>
        </li>

        {/* ORDERS */}

        <li>
          <Link to="/orders">
            Orders 📦
          </Link>
        </li>

        {/* ADMIN */}

        <li>
          <Link to="/admin">
            Admin 🎛️
          </Link>
        </li>

        {/* USER */}

        {user ? (
          <>
            <li>
              <span
                style={{
                  color:
                    "white",
                }}
              >
                👋{" "}
                {user.name}
              </span>
            </li>

            <li>
              <button
                onClick={
                  handleLogout
                }
              >
                Logout 🚪
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;