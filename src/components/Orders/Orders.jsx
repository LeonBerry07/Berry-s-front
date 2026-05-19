import "./Orders.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = localStorage.getItem("token");

        // Si el usuario no está logueado, lo enviamos al login
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:3001/api/orders",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log("Orders received:", data);

        if (!response.ok) {
          console.error(data.message || "Error loading orders");
          return;
        }

        // Asegurarnos de que siempre sea un array
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error loading orders:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [navigate]);

  return (
    <div className="orders-container">
      <h2>📦 My Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>Order #{order.id}</h3>

            <p>
              Total:{" "}
              <strong>
                ${Number(order.total || 0).toFixed(2)}
              </strong>
            </p>

            <p>
              Date:{" "}
              {order.created_at
                ? new Date(order.created_at).toLocaleDateString()
                : "Unknown date"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}