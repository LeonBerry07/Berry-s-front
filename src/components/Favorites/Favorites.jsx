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

  function isInCart(id) {
    return cart.some(
      (item) => item.id === id
    );
  }

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>
          ❤️ Your Favorites
        </h1>

        <p>
          Your personal collection of
          favorite beats on Berry's Music.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <h2>
            No favorites yet
          </h2>

          <p>
            Start exploring the catalogue
            and save your favorite beats
            to access them quickly later.
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
          {favorites.map((beat) => (
            <div
              key={beat.id}
              className="favorite-card"
            >
              <Link
                to={`/beat/${beat.id}`}
              >
                <img
                  src={
                    beat.image
                      ? `http://localhost:3001${beat.image}`
                      : "/placeholder-beat.jpg"
                  }
                  alt={beat.title}
                  className="favorite-image"
                />
              </Link>

              <div className="favorite-info">
                <span className="favorite-category">
                  {beat.category}
                </span>

                <h3>
                  {beat.title}
                </h3>

                <p>
                  Prod. {beat.producer}
                </p>

                <div className="favorite-footer">
                  <span className="favorite-price">
                    $
                    {Number(
                      beat.price || 0
                    ).toFixed(2)}
                  </span>

                  <div className="favorite-actions">
                    <button
                      className="remove-favorite-btn"
                      onClick={() =>
                        toggleFavorite(
                          beat
                        )
                      }
                      title="Remove from favorites"
                    >
                      ♥
                    </button>

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
                        : "Add to Cart 🛒"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}