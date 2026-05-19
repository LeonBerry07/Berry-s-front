import "./Cart.css";
import { useCart } from "../CartContext/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  // Usar el MISMO carrito global que usa Checkout
  const {
    cart,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  // Total
  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price || 0),
    0
  );

  return (
    <div className="cart-container">
      <h2>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((beat) => (
              <div
                key={beat.id}
                className="cart-item"
              >
                <div>
                  <h3>{beat.title}</h3>
                  <p>
                    Prod. {beat.producer}
                  </p>
                </div>

                <div className="cart-right">
                  <span>
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

          <div className="cart-footer">
            <h3>
              Total: $
              {total.toFixed(2)}
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