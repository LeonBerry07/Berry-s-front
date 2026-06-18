import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

const CartContext = createContext();

export function CartProvider({
  children,
}) {

  const navigate = useNavigate();


  function requireLogin() {
  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  if (!user) {
    navigate("/login");
    return false;
  }

  return true;
}
  // =========================
  // CART
  // =========================

  const [cart, setCart] =
    useState([]);

  // =========================
  // FAVORITES
  // =========================

  const [favorites, setFavorites] =
    useState([]);

  // =========================
  // LOAD USER DATA
  // =========================

  function loadUserCart() {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    // NO USER

    if (!user) {
      setCart([]);
      setFavorites([]);
      return;
    }

    // =========================
    // CART
    // =========================

    const savedCart =
      localStorage.getItem(
        `cart_${user.email}`
      );

    if (savedCart) {
      setCart(
        JSON.parse(savedCart)
      );
    } else {
      setCart([]);
    }

    // =========================
    // FAVORITES
    // =========================

    const savedFavorites =
      localStorage.getItem(
        `favorites_${user.email}`
      );

    if (savedFavorites) {
      setFavorites(
        JSON.parse(
          savedFavorites
        )
      );
    } else {
      setFavorites([]);
    }
  }

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    loadUserCart();
  }, []);

  // =========================
  // SAVE CART
  // =========================

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) return;

    localStorage.setItem(
      `cart_${user.email}`,
      JSON.stringify(cart)
    );
  }, [cart]);

  // =========================
  // SAVE FAVORITES
  // =========================

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) return;

    localStorage.setItem(
      `favorites_${user.email}`,
      JSON.stringify(favorites)
    );
  }, [favorites]);

  // =========================
  // CART FUNCTIONS
  // =========================

  function addToCart(beat) {

    if (!requireLogin())
    return;

    setCart((prev) => {
      const exists = prev.some(
        (item) =>
          item.id === beat.id
      );

      if (exists) return prev;

      return [...prev, beat];
    });
  }

  function removeFromCart(id) {
    setCart((prev) =>
      prev.filter(
        (item) =>
          item.id !== id
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  // =========================
  // FAVORITES FUNCTIONS
  // =========================

  function addToFavorites(beat) {
    setFavorites((prev) => {
      const exists = prev.some(
        (item) =>
          item.id === beat.id
      );

      if (exists) return prev;

      return [...prev, beat];
    });
  }

  function removeFromFavorites(
    id
  ) {
    setFavorites((prev) =>
      prev.filter(
        (item) =>
          item.id !== id
      )
    );
  }

  function toggleFavorite(beat) {

    if (!requireLogin())
    return;

    const exists =
      favorites.some(
        (item) =>
          item.id === beat.id
      );

    if (exists) {
      removeFromFavorites(
        beat.id
      );
    } else {
      addToFavorites(beat);
    }
  }

  function clearFavorites() {
    setFavorites([]);
  }

  // =========================
  // PROVIDER
  // =========================

  return (
    <CartContext.Provider
      value={{
        // CART

        cart,
        setCart,
        addToCart,
        removeFromCart,
        clearCart,

        // FAVORITES

        favorites,
        setFavorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        clearFavorites,

        // LOAD

        loadUserCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(
    CartContext
  );
}