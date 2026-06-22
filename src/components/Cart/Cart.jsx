import "./Cart.css";
import { useCart } from "../CartContext/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price || 0),
    0
  );

  return (
    <div className="cart-container">
      <h2>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h3>
            Your cart is empty
          </h3>

          <p>
            Browse the store and
            add some beats.
          </p>
        </div>
      ) : (
        <>
          {/* RESUMEN */}

          <div className="cart-summary">
            <div className="summary-card">
              <h3>
                {cart.length}
              </h3>

              <p>
                Beats In Cart
              </p>
            </div>

            <div className="summary-card">
              <h3>
                $
                {total.toFixed(2)}
              </h3>

              <p>
                Total Value
              </p>
            </div>
          </div>

          {/* ITEMS */}

          <div className="cart-items">
            {cart.map((beat) => (
              <div
                key={beat.id}
                className="cart-item"
              >
                <div className="cart-left">
                  {beat.image && (
                    <img
                      src={`http://localhost:3001${beat.image}`}
                      alt={beat.title}
                      className="cart-image"
                    />
                  )}

                  <div>
                    <h3>
                      {beat.title}
                    </h3>

                    <p>
                      Prod.{" "}
                      {beat.producer}
                    </p>

                    <span className="cart-category">
                      {
                        beat.category
                      }
                    </span>
                  </div>
                </div>

                <div className="cart-right">
                  <span className="cart-price">
                    $
                    {Number(
                      beat.price || 0
                    ).toFixed(2)}
                  </span>

                  <button
                    onClick={() =>
                      removeFromCart(
                        beat.id
                      )
                    }
                    className="remove-btn"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* FOOTER */}

          <div className="cart-footer">
            <h3 className="cart-total">
              Total:{" "}
              <span>
                $
                {total.toFixed(2)}
              </span>
            </h3>

            <div className="cart-actions">
              <button
                onClick={clearCart}
                className="clear-cart-btn"
              >
                Clear Cart 🗑️
              </button>

              <button
                className="checkout-btn"
                onClick={() =>
                  navigate("/checkout")
                }
              >
                Go to Checkout 💳
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}