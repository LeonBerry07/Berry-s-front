import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Cargar el carrito del usuario actual
  function loadUserCart() {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    // Si no hay usuario logueado, carrito vacío
    if (!user) {
      setCart([]);
      return;
    }

    // Cada usuario tiene su propio carrito
    const savedCart = localStorage.getItem(
      `cart_${user.email}`
    );

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      setCart([]);
    }
  }

  // Cargar carrito al iniciar la aplicación
  useEffect(() => {
    loadUserCart();
  }, []);

  // Guardar carrito automáticamente cuando cambia
  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    // Si no hay usuario, no guardar nada
    if (!user) return;

    localStorage.setItem(
      `cart_${user.email}`,
      JSON.stringify(cart)
    );
  }, [cart]);

  // Agregar beat al carrito
  function addToCart(beat) {
    setCart((prev) => {
      const exists = prev.some(
        (item) => item.id === beat.id
      );

      if (exists) return prev;

      return [...prev, beat];
    });
  }

  // Eliminar beat del carrito
  function removeFromCart(id) {
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  // Vaciar carrito
  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        clearCart,
        loadUserCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}