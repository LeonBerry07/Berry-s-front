import "./Orders.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Formatear fecha en formato argentino
  function formatDate(dateString) {
    if (!dateString) return "Unknown date";

    const date = new Date(dateString);

    // Verificar que la fecha sea válida
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    return date.toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

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
          console.error(
            data.message || "Error loading orders"
          );
          return;
        }

        // Asegurarnos de que siempre sea un array
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(
          "Error loading orders:",
          error
        );
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
          <div
            key={order.id}
            className="order-card"
          >
            <h3>Order #{order.id}</h3>

            <p>
              Total:{" "}
              <strong>
                $
                {Number(
                  order.total || 0
                ).toFixed(2)}
              </strong>
            </p>

            <p>
              Date:{" "}
              {formatDate(
                order.date || order.created_at
              )}
            </p>

            {order.items &&
              order.items.length > 0 && (
                <>
                  <h4>Items:</h4>

                  <div className="order-items">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="order-item"
                      >
                        <div>
                          <strong>
                            {item.title}
                          </strong>

                          <p>
                            $
                            {Number(
                              item.price || 0
                            ).toFixed(2)}
                          </p>
                        </div>

                        {/* BOTÓN DESCARGA */}
                        {item.file ? (
                          <a
                            href={`http://localhost:3001/beats/${item.file}`}
                            download
                            className="download-btn"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Download 🎵
                          </a>
                        ) : (
                          <span className="no-file">
                            No file
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
          </div>
        ))
      )}
    </div>
  );
}