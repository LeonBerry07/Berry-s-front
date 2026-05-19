import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

export default function Checkout({ cart, setCart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  async function handleCheckout() {
    // Validaciones básicas
    if (!name || !email) {
      alert("Please complete all fields.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      // Obtener token del usuario logueado
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in to complete your purchase.");
        navigate("/login");
        return;
      }

      // Enviar la orden al backend
      const response = await fetch(
        "http://localhost:3001/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            email,
            items: cart,
            total,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error creating order.");
        return;
      }

      // Vaciar carrito
      setCart([]);

      // Mensaje de éxito
      alert("Purchase completed successfully 🎉");

      // Redirigir a la página de éxito
      navigate("/success");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Server error while processing your purchase.");
    }
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {/* RESUMEN DEL CARRITO */}
      <div className="checkout-summary">
        <h2>Your Beats</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="checkout-item"
              >
                <span>{item.title}</span>
                <span>${item.price}</span>
              </div>
            ))}

            <h3>Total: ${total.toFixed(2)}</h3>
          </>
        )}
      </div>

      {/* FORMULARIO */}
      <div className="checkout-form">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <button
          onClick={handleCheckout}
          disabled={cart.length === 0}
        >
          Confirm Purchase 💳
        </button>
      </div>
    </div>
  );
}