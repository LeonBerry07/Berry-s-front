import "./App.css";

import {
  Routes,
  Route,
} from "react-router-dom";

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

import Admin from "./components/Admin/Admin";

import BeatDetails from "./components/BeatDetails/BeatDetails";

import Favorites from "./components/Favorites/Favorites";

import { useCart } from "./components/CartContext/CartContext";

import GlobalPlayer from "./components/GlobalPlayer/GlobalPlayer";

function App() {
  const { cart } = useCart();

  return (
    <div className="App">
      {/* NAVBAR */}

      <NavBar cart={cart} />

      {/* ROUTES */}

      <Routes>
        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* CATALOGUE */}

        <Route
          path="/catalogue"
          element={
            <Catalogue />
          }
        />

        {/* BEAT DETAILS */}

        <Route
          path="/beat/:id"
          element={
            <BeatDetails />
          }
        />

        {/* FAVORITES */}

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

        {/* CART */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* CHECKOUT */}

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        {/* SUCCESS */}

        <Route
          path="/success"
          element={
            <Success />
          }
        />

        {/* ORDERS */}

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}

        <Route
          path="/admin"
          element={<Admin />}
        />
      </Routes>

      <GlobalPlayer/>

      {/* FOOTER */}

      <footer>
        <p>
          &copy; 2026 Berry's -
          All rights reserved by a GOD's son
        </p>
      </footer>
    </div>
  );
}

export default App;