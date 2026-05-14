import "./Orders.css";

export default function Orders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <div className="orders-container">
      <h1>📦 Order History</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">

            <h3>Order #{order.id}</h3>
            <p>{new Date(order.date).toLocaleString()}</p>

            {order.items.map((item) => (
              <div key={item.id}>
                {item.title} - ${item.price}
              </div>
            ))}

            <h4>Total: ${order.total}</h4>
          </div>
        ))
      )}
    </div>
  );
}