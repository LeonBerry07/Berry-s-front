import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import { useCart } from "../CartContext/CartContext";

export default function Checkout() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loadingPayment, setLoadingPayment] =
    useState(false);

  const navigate = useNavigate();

  // Carrito global desde Context
  const { cart, loadUserCart } = useCart();

  // Al entrar al Checkout, recargar el carrito del usuario
  useEffect(() => {
    if (loadUserCart) {
      loadUserCart();
    }
  }, [loadUserCart]);

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
      setLoadingPayment(true);

      // Crear preferencia de pago en el backend
      const response = await fetch(
        "http://localhost:3001/api/payments/create-preference",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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

      if (!response.ok) {
        alert(
          data.message ||
            "Error creating payment preference."
        );
        setLoadingPayment(false);
        return;
      }

      // Redirigir al checkout de Mercado Pago
      const checkoutUrl =
        data.init_point ||
        data.sandbox_init_point;

      if (!checkoutUrl) {
        alert(
          "Mercado Pago did not return a payment URL."
        );
        setLoadingPayment(false);
        return;
      }

      // Guardar datos temporalmente para usarlos luego en Success
      localStorage.setItem(
        "pendingOrder",
        JSON.stringify({
          name,
          email,
          items: cart,
          total,
        })
      );

      // Redirección al checkout de Mercado Pago
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Checkout error:", error);
      alert(
        "Server error while creating payment preference."
      );
      setLoadingPayment(false);
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
                <span>
                  $
                  {Number(
                    item.price || 0
                  ).toFixed(2)}
                </span>
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
          disabled={
            cart.length === 0 || loadingPayment
          }
        >
          {loadingPayment
            ? "Redirecting to Mercado Pago..."
            : "Pay with Mercado Pago 💳"}
        </button>
      </div>
    </div>
  );
}