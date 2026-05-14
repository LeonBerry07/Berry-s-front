import { useRef } from "react";
import "./BeatCard.css";

export default function BeatCard({ beat, addToCart, cart = [], setCart }) {
  const audioRef = useRef(null);

  const isInCart = (cart || []).some(
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
          onClick={() => {
            if (isInCart) {
              const updatedCart = cart.filter(
                (item) => item.id !== beat.id
              );
              setCart(updatedCart);
            } else {
              addToCart(beat);
            }
          }}
        >
          {isInCart ? "Added ✓" : "Add to Cart 🛒"}
        </button>
      </div>

      <audio
        ref={audioRef}
        src={beat.preview}
      />
    </div>
  );
}