// App.js
// Reemplazá TODO tu App.js por este archivo.
// El problema es que tu App todavía estaba usando un estado local `cart`,
// mientras que Checkout, Catalogue y BeatCard usan `CartContext`.
// Eso hacía que el contador del NavBar y algunas páginas leyeran un carrito,
// y otras páginas leyeran otro distinto.

import "./App.css";
import { Routes, Route } from "react-router-dom";

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

import { useCart } from "./components/CartContext/CartContext";

function App() {
  // Usar UN SOLO carrito global desde Context
  const { cart } = useCart();

  return (
    <div className="App">
      {/* NavBar usa el mismo carrito global */}
      <NavBar cart={cart} />

      <header></header>

      <div>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          {/* Ya no se pasan props cart/setCart */}
          <Route path="/catalogue" element={<Catalogue />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
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