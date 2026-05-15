import { useRef, useContext } from "react";
import "./BeatCard.css";
import { AuthContext } from "../Context/AuthContext";

export default function BeatCard({ beat, addToCart, cart = [], setCart }) {
  const audioRef = useRef(null);

  const { cart: globalCart, addToCart: ctxAdd, removeFromCart } =
    useContext(AuthContext);

  // usa context si existe, si no fallback a props (compatibilidad)
  const activeCart = globalCart || cart;

  const isInCart = (activeCart || []).some(
    (item) => item.id === beat.id
  );

  function handlePreview() {
    const audio = audioRef.current;

    if (!audio || !beat.preview) return;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  function handleCartClick() {
    // PRIORIDAD: Context
    if (globalCart) {
      if (isInCart) {
        removeFromCart(beat.id);
      } else {
        ctxAdd(beat);
      }
      return;
    }

    // fallback a props (no rompe tu sistema viejo)
    if (isInCart) {
      const updatedCart = cart.filter(
        (item) => item.id !== beat.id
      );
      setCart(updatedCart);
    } else {
      addToCart(beat);
    }
  }

  return (
    <div className="beat-card">
      <div className="beat-info">
        <h3>{beat.title}</h3>
        <p>Prod. {beat.producer}</p>
      </div>

      <div className="beat-footer">
        <span>${beat.price}</span>

        <button
          className="btn-preview"
          onClick={handlePreview}
        >
          Preview ▶
        </button>

        <button
          className="btn-cart"
          onClick={handleCartClick}
        >
          {isInCart ? "Added ✓" : "Add to Cart 🛒"}
        </button>
      </div>

      <audio ref={audioRef} src={beat.preview} />
    </div>
  );
}