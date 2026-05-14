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

function App() {

  // 🛒 carrito global
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
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
              <Cart cart={cart} setCart={setCart} />
            }
          />

          <Route
            path="/checkout"
            element={<Checkout cart={cart} setCart={setCart} />}
          />

          <Route path="/success" element={<Success />} />

          <Route path="/orders" element={<Orders />} />

        </Routes>
      </div>

      <footer>
        <p>&copy; 2026 Berry's - All rights reserved</p>
      </footer>

    </div>
  );
}

export default App;