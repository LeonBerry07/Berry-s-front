import { useState, useEffect } from "react";
import "./Checkout.css";
import { useCart } from "../CartContext/CartContext";

export default function Checkout() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);

  const { cart, setCart, loadUserCart } = useCart();

  // cargar carrito del usuario
  useEffect(() => {
    if (loadUserCart) {
      loadUserCart();
    }
  }, [loadUserCart]);

  // total
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  // =========================
  // MERCADO PAGO REAL
  // =========================
  async function handleCheckout() {
    if (processing) return;

    if (!name || !email) {
      alert("Please complete all fields.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in.");
      return;
    }

    try {
      setProcessing(true);

      const response = await fetch(
        "http://localhost:3001/api/payments/create-preference",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: cart,
            payer: {
              name,
              email,
            },
          }),
        }
      );

      const data = await response.json();

      console.log("Preference response:", data);

      if (!response.ok) {
        alert(data.message || "Error creating payment.");
        return;
      }

      window.location.href = data.init_point;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Server error while processing payment.");
    } finally {
      setProcessing(false);
    }
  }

  // =========================
  // PAGO SIMULADO
  // =========================
  async function handleFakePayment() {
    if (processing) return;

    if (!name || !email) {
      alert("Please complete all fields.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in.");
      return;
    }

    try {
      setProcessing(true);

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
            status: "approved",
            payment_method: "Simulated Payment",
          }),
        }
      );

      const data = await response.json();

      console.log("Fake payment response:", data);

      if (!response.ok) {
        alert(data.message || "Error creating fake order.");
        return;
      }

      // limpiar carrito
      setCart([]);

      const user = JSON.parse(localStorage.getItem("user"));

      if (user?.email) {
        localStorage.removeItem(`cart_${user.email}`);
      }

      alert("Simulated payment approved 🎉");

      window.location.href = "/success?status=approved";
    } catch (error) {
      console.error("Fake payment error:", error);
      alert("Error simulating payment.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {/* RESUMEN */}
      <div className="checkout-summary">
        <h2>Your Beats</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="checkout-item">
                <span>{item.title}</span>
                <span>${Number(item.price || 0).toFixed(2)}</span>
              </div>
            ))}

            <h3>Total: ${total.toFixed(2)}</h3>
          </>
        )}
      </div>

      {/* FORM */}
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

        {/* MERCADO PAGO REAL */}
        <button
          onClick={handleCheckout}
          disabled={cart.length === 0 || processing}
        >
          {processing ? "Processing..." : "Pay with Mercado Pago 💳"}
        </button>

        {/* PAGO SIMULADO */}
        <button
          onClick={handleFakePayment}
          disabled={cart.length === 0 || processing}
          className="fake-payment-btn"
        >
          {processing
            ? "Processing..."
            : "Simulate Approved Payment ✅"}
        </button>
      </div>
    </div>
  );
}