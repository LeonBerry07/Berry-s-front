import "./Cart.css";

export default function Cart({ cart, setCart }) {

  // eliminar item
  function removeFromCart(id) {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  }

  // total
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-container">
      <h2>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((beat) => (
              <div key={beat.id} className="cart-item">
                <div>
                  <h3>{beat.title}</h3>
                  <p>Prod. {beat.producer}</p>
                </div>

                <div className="cart-right">
                  <span>${beat.price}</span>

                  <button
                    onClick={() => removeFromCart(beat.id)}
                    className="remove-btn"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <h3>Total: ${total}</h3>

            <button className="checkout-btn">
              Checkout 💳
            </button>
          </div>
        </>
      )}
    </div>
  );
}