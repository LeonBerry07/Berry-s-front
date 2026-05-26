import "./BeatDetails.css";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import { useCart } from "../CartContext/CartContext";

export default function BeatDetails() {
  const { id } = useParams();

  const [beat, setBeat] =
    useState(null);

  const [relatedBeats, setRelatedBeats] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const audioRef = useRef(null);

  const {
    cart,
    addToCart,
    removeFromCart,
  } = useCart();

  // =========================
  // FETCH BEAT
  // =========================

  useEffect(() => {
    async function fetchBeat() {
      try {
        setLoading(true);

        // =========================
        // CURRENT BEAT
        // =========================

        const response =
          await fetch(
            `http://localhost:3001/api/beats/${id}`
          );

        const data =
          await response.json();

        setBeat(data);

        // =========================
        // RELATED
        // =========================

        const relatedResponse =
          await fetch(
            `http://localhost:3001/api/beats?category=${data.category}`
          );

        const relatedData =
          await relatedResponse.json();

        const filtered =
          relatedData.filter(
            (b) => b.id !== data.id
          );

        setRelatedBeats(
          filtered.slice(0, 4)
        );
      } catch (error) {
        console.error(
          "Error loading beat:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    fetchBeat();
  }, [id]);

  // =========================
  // CART
  // =========================

  const isInCart =
    cart.some(
      (item) =>
        item.id === beat?.id
    );

  function handleCart() {
    if (!beat) return;

    if (isInCart) {
      removeFromCart(
        beat.id
      );
    } else {
      addToCart(beat);
    }
  }

  // =========================
  // AUDIO
  // =========================

  function handlePreview() {
    const audio =
      audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();

      audio.currentTime = 0;
    }
  }

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="beat-details-loading">
        Loading beat...
      </div>
    );
  }

  if (!beat) {
    return (
      <div className="beat-details-loading">
        Beat not found.
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="beat-details">
      {/* HERO */}

      <div className="beat-hero">
        {/* IMAGE */}

        <div className="beat-details-image-container">
          <img
            src={`http://localhost:3001${beat.image}`}
            alt={beat.title}
            className="beat-details-image"
          />
        </div>

        {/* INFO */}

        <div className="beat-details-info">
          <span className="beat-tag">
            {beat.category}
          </span>

          <h1>
            {beat.title}
          </h1>

          <p className="beat-producer">
            Prod.{" "}
            {beat.producer}
          </p>

          {/* PRICE */}

          <h2 className="beat-details-price">
            $
            {Number(
              beat.price || 0
            ).toFixed(2)}
          </h2>

          {/* DESCRIPTION */}

          <p className="beat-description">
            Premium instrumental
            production available
            exclusively on
            Berry's Music.
          </p>

          {/* ACTIONS */}

          <div className="beat-actions">
            <button
              className="preview-btn-large"
              onClick={
                handlePreview
              }
            >
              ▶ Preview
            </button>

            <button
              className={`cart-btn-large ${
                isInCart
                  ? "added"
                  : ""
              }`}
              onClick={
                handleCart
              }
            >
              {isInCart
                ? "Added ✓"
                : "Add to Cart 🛒"}
            </button>
          </div>

          {/* AUDIO */}

          <audio
            ref={audioRef}
            src={`http://localhost:3001${beat.preview}`}
          />
        </div>
      </div>

      {/* RELATED */}

      <div className="related-section">
        <h2>
          Related Beats
        </h2>

        <div className="related-grid">
          {relatedBeats.length ===
          0 ? (
            <p>
              No related beats
              found.
            </p>
          ) : (
            relatedBeats.map(
              (relatedBeat) => (
                <Link
                  key={
                    relatedBeat.id
                  }
                  to={`/beat/${relatedBeat.id}`}
                  className="related-card"
                >
                  <img
                    src={`http://localhost:3001${relatedBeat.image}`}
                    alt={
                      relatedBeat.title
                    }
                  />

                  <div>
                    <h3>
                      {
                        relatedBeat.title
                      }
                    </h3>

                    <p>
                      Prod.{" "}
                      {
                        relatedBeat.producer
                      }
                    </p>
                  </div>
                </Link>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}