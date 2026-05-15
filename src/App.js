import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Catalogue from "./components/Catalogue/Catalogue";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import Success from "./components/Success/Success";
import Orders from "./components/Orders/Orders";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Register from "./components/Register/Register";

function App() {

  // 🛒 carrito global
  const user = JSON.parse(localStorage.getItem("user"));

  const [cart, setCart] = useState(() => {
    if (!user) return [];

    const savedCart = localStorage.getItem(`cart_${user.email}`);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      localStorage.setItem(
        `cart_${user.email}`,
        JSON.stringify(cart)
      );
    }
  }, [cart]);

  return (
    <div className="App">

      <NavBar cart={cart} />

      <header></header>

      <div>
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route
            path="/catalogue"
            element={
              <Catalogue cart={cart} setCart={setCart} />
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart cart={cart} setCart={setCart} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout cart={cart} setCart={setCart} />
              </ProtectedRoute>
            }
          />

          <Route path="/success" element={<Success />} />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route path="/register" element={<Register />} />

        </Routes>
      </div>

      <footer>
        <p>&copy; 2026 Berry's - All rights reserved</p>
      </footer>

    </div>
  );
}

export default App;