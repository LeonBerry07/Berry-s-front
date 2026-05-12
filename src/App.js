import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Catalogue from "./components/Catalogue/Catalogue";
import Cart from "./components/Cart/Cart";

function App() {

  // 🛒 carrito global
  const [cart, setCart] = useState([]);

  return (
    <div className="App">

      <NavBar />

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

        </Routes>
      </div>

      <footer>
        <p>&copy; 2026 Berry's - All rights reserved</p>
      </footer>

    </div>
  );
}

export default App;