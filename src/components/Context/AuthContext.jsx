import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);

      // cargar carrito del usuario
      const savedCart = localStorage.getItem(
        `cart_${parsedUser.email}`
      );

      setCart(savedCart ? JSON.parse(savedCart) : []);
    }
  }, []);

  function login(userData, token) {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);

    setUser(userData);

    // cargar carrito del usuario al loguear
    const savedCart = localStorage.getItem(
      `cart_${userData.email}`
    );

    setCart(savedCart ? JSON.parse(savedCart) : []);
  }

  function logout() {
    if (user) {
      localStorage.removeItem(`cart_${user.email}`);
    }

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setCart([]);
  }

  function addToCart(beat) {
    setCart((prev) => {
      const exists = prev.some((b) => b.id === beat.id);
      if (exists) return prev;

      const updated = [...prev, beat];

      if (user) {
        localStorage.setItem(
          `cart_${user.email}`,
          JSON.stringify(updated)
        );
      }

      return updated;
    });
  }

  function removeFromCart(id) {
    setCart((prev) => {
      const updated = prev.filter((b) => b.id !== id);

      if (user) {
        localStorage.setItem(
          `cart_${user.email}`,
          JSON.stringify(updated)
        );
      }

      return updated;
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        cart,
        login,
        logout,
        addToCart,
        removeFromCart
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}