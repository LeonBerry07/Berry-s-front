import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../CartContext/CartContext";
import "./Success.css";

export default function Success() {
  const [searchParams] = useSearchParams();

  const [saving, setSaving] = useState(true);
  const [saved, setSaved] = useState(false);
  const [paymentApproved, setPaymentApproved] =
    useState(false);

  const { clearCart } = useCart();

  useEffect(() => {
    async function saveOrder() {
      try {
        // Mercado Pago envía ?status=approved cuando el pago fue exitoso
        const status =
          searchParams.get("status") ||
          searchParams.get("collection_status");

        if (status !== "approved") {
          setPaymentApproved(false);
          setSaving(false);
          return;
        }

        setPaymentApproved(true);

        // Recuperar orden pendiente guardada antes de ir a Mercado Pago
        const pendingOrder = JSON.parse(
          localStorage.getItem("pendingOrder")
        );

        if (!pendingOrder) {
          setSaved(true);
          setSaving(false);
          return;
        }

        // Token del usuario logueado
        const token = localStorage.getItem("token");

        if (!token) {
          setSaving(false);
          return;
        }

        // Evitar guardar la misma orden dos veces si el usuario recarga
        const paymentId =
          searchParams.get("payment_id") ||
          searchParams.get("collection_id");

        const alreadySavedPaymentId =
          localStorage.getItem("lastSavedPaymentId");

        if (
          paymentId &&
          paymentId === alreadySavedPaymentId
        ) {
          clearCart();
          localStorage.removeItem("pendingOrder");
          setSaved(true);
          setSaving(false);
          return;
        }

        // Guardar orden en el backend
        const response = await fetch(
          "http://localhost:3001/api/orders",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              ...pendingOrder,
              paymentId,
              paymentStatus: status,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(
            data.message || "Error saving order."
          );
          setSaving(false);
          return;
        }

        // Marcar pago como ya guardado
        if (paymentId) {
          localStorage.setItem(
            "lastSavedPaymentId",
            paymentId
          );
        }

        // Limpiar carrito y orden pendiente
        clearCart();
        localStorage.removeItem("pendingOrder");

        setSaved(true);
      } catch (error) {
        console.error("Error saving order:", error);
      } finally {
        setSaving(false);
      }
    }

    saveOrder();
  }, [searchParams, clearCart]);

  return (
    <div className="success-container">
      {saving ? (
        <>
          <h1>⏳ Processing Payment...</h1>
          <p>
            Please wait while we confirm your
            purchase.
          </p>
        </>
      ) : !paymentApproved ? (
        <>
          <h1>⚠️ Payment Not Approved</h1>
          <p>
            The payment was not completed or was
            cancelled.
          </p>

          <Link
            to="/cart"
            className="success-button"
          >
            Return to Cart 🛒
          </Link>
        </>
      ) : (
        <>
          <h1>🎉 Purchase Completed!</h1>

          <p>
            Thank you for your purchase. Your beats
            are now available.
          </p>

          {saved && (
            <p>
              Your order has been added to your
              purchase history.
            </p>
          )}

          <p>
            Payment approved successfully with
            Mercado Pago.
          </p>

          <Link
            to="/catalogue"
            className="success-button"
          >
            Back to Catalogue 🎵
          </Link>

          <br />
          <br />

          <Link
            to="/orders"
            className="success-button"
          >
            View My Orders 📦
          </Link>
        </>
      )}
    </div>
  );
}