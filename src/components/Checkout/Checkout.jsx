import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

export default function Checkout({ cart, setCart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  function handleCheckout() {
  if (!name || !email) return;

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const newOrder = {
    id: Date.now(),
    name,
    email,
    items: cart,
    total,
    date: new Date().toISOString()
  };

  // obtener órdenes anteriores
  const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

  // guardar nueva orden
  localStorage.setItem(
    "orders",
    JSON.stringify([...existingOrders, newOrder])
  );

  // vaciar carrito
  setCart([]);

  // ir a success
  navigate("/success");
  }

  return (
    <div className="checkout-container">

      <h1>Checkout</h1>

      {/* RESUMEN DEL CARRITO */}
      <div className="checkout-summary">
        <h2>Your Beats</h2>

        {cart.map((item) => (
          <div key={item.id} className="checkout-item">
            <span>{item.title}</span>
            <span>${item.price}</span>
          </div>
        ))}

        <h3>Total: ${total}</h3>
      </div>

      {/* FORMULARIO */}
      <div className="checkout-form">

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleCheckout}>
          Confirm Purchase 💳
        </button>

      </div>

    </div>
  );
}