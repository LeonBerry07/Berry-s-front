import "./BeatCard.css";
import { useRef } from "react";
import { useCart } from "../CartContext/CartContext";

export default function BeatCard({ beat }) {
  const audioRef = useRef(null);

  const { cart, addToCart, removeFromCart } = useCart();

  const isInCart = cart.some((item) => item.id === beat.id);

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
    if (isInCart) {
      removeFromCart(beat.id);
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

        <button className="btn-preview" onClick={handlePreview}>
          Preview ▶
        </button>

        <button className="btn-cart" onClick={handleCartClick}>
          {isInCart ? "Added ✓" : "Add to Cart 🛒"}
        </button>
      </div>

      <audio ref={audioRef} src={beat.preview} />
    </div>
  );
}