import "./Favorites.css";

import { Link } from "react-router-dom";

import { useCart } from "../CartContext/CartContext";

export default function Favorites() {
  const {
    favorites,
    toggleFavorite,
    addToCart,
    cart,
  } = useCart();

  // =========================
  // CHECK CART
  // =========================

  function isInCart(id) {
    return cart.some(
      (item) => item.id === id
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="favorites-page">
      {/* HEADER */}

      <div className="favorites-header">
        <h1>
          ❤️ Your Favorites
        </h1>

        <p>
          Your favorite beats
          saved on Berry's Music.
        </p>
      </div>

      {/* EMPTY */}

      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <h2>
            No favorites yet
          </h2>

          <p>
            Start exploring the
            catalogue and save
            your favorite beats.
          </p>

          <Link
            to="/catalogue"
            className="browse-btn"
          >
            Browse Beats 🎵
          </Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map(
            (beat) => (
              <div
                key={beat.id}
                className="favorite-card"
              >
                {/* IMAGE */}

                <Link
                  to={`/beat/${beat.id}`}
                >
                  <img
                    src={`http://localhost:3001${beat.image}`}
                    alt={
                      beat.title
                    }
                    className="favorite-image"
                  />
                </Link>

                {/* INFO */}

                <div className="favorite-info">
                  <span className="favorite-category">
                    {
                      beat.category
                    }
                  </span>

                  <h3>
                    {beat.title}
                  </h3>

                  <p>
                    Prod.{" "}
                    {
                      beat.producer
                    }
                  </p>

                  <div className="favorite-footer">
                    <span className="favorite-price">
                      $
                      {Number(
                        beat.price ||
                          0
                      ).toFixed(2)}
                    </span>

                    <div className="favorite-actions">
                      {/* FAVORITE */}

                      <button
                        className="remove-favorite-btn"
                        onClick={() =>
                          toggleFavorite(
                            beat
                          )
                        }
                      >
                        ♥
                      </button>

                      {/* CART */}

                      <button
                        className={`favorite-cart-btn ${
                          isInCart(
                            beat.id
                          )
                            ? "added"
                            : ""
                        }`}
                        onClick={() =>
                          addToCart(
                            beat
                          )
                        }
                      >
                        {isInCart(
                          beat.id
                        )
                          ? "Added ✓"
                          : "Add 🛒"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}