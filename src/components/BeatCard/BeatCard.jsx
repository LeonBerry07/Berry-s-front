import "./BeatCard.css";

import { useRef } from "react";

import { Link } from "react-router-dom";

import { useCart } from "../CartContext/CartContext";

export default function BeatCard({
  beat,
}) {
  const audioRef = useRef(null);

  const {
    cart,
    addToCart,
    removeFromCart,

    favorites,
    toggleFavorite,
  } = useCart();

  // =========================
  // STATES
  // =========================

  const isInCart =
    cart.some(
      (item) =>
        item.id === beat.id
    );

  const isFavorite =
    favorites.some(
      (item) =>
        item.id === beat.id
    );

  // =========================
  // PREVIEW
  // =========================

  function handlePreview(e) {
    e.preventDefault();

    const audio =
      audioRef.current;

    if (
      !audio ||
      !beat.preview
    )
      return;

    // STOP OTHER AUDIOS

    document
      .querySelectorAll(
        "audio"
      )
      .forEach((a) => {
        if (a !== audio) {
          a.pause();

          a.currentTime = 0;
        }
      });

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();

      audio.currentTime = 0;
    }
  }

  // =========================
  // CART
  // =========================

  function handleCartClick(e) {
    e.preventDefault();

    if (isInCart) {
      removeFromCart(
        beat.id
      );
    } else {
      addToCart(beat);
    }
  }

  // =========================
  // FAVORITE
  // =========================

  function handleFavorite(e) {
    e.preventDefault();

    toggleFavorite(beat);
  }

  return (
    <Link
      to={`/beat/${beat.id}`}
      className="beat-card-link"
    >
      <div className="beat-card">
        {/* ========================= */}
        {/* IMAGE */}
        {/* ========================= */}

        <div className="beat-image-container">
          <img
            src={`http://localhost:3001${beat.image}`}
            alt={beat.title}
            className="beat-image"
          />

          {/* FAVORITE */}

          <button
            className={`favorite-btn ${
              isFavorite
                ? "active"
                : ""
            }`}
            onClick={
              handleFavorite
            }
          >
            ♥
          </button>

          {/* OVERLAY */}

          <div className="beat-overlay">
            <button
              className="btn-preview"
              onClick={
                handlePreview
              }
            >
              ▶ Preview
            </button>
          </div>
        </div>

        {/* ========================= */}
        {/* INFO */}
        {/* ========================= */}

        <div className="beat-info">
          <h3>
            {beat.title}
          </h3>

          <p>
            Prod.{" "}
            {
              beat.producer
            }
          </p>

          <span className="beat-category">
            {
              beat.category
            }
          </span>
        </div>

        {/* ========================= */}
        {/* FOOTER */}
        {/* ========================= */}

        <div className="beat-footer">
          <span className="beat-price">
            $
            {Number(
              beat.price || 0
            ).toFixed(2)}
          </span>

          <button
            className={`btn-cart ${
              isInCart
                ? "added"
                : ""
            }`}
            onClick={
              handleCartClick
            }
          >
            {isInCart
              ? "Added ✓"
              : "Add to Cart 🛒"}
          </button>
        </div>

        {/* ========================= */}
        {/* AUDIO */}
        {/* ========================= */}

        <audio
          ref={audioRef}
          src={`http://localhost:3001${beat.preview}`}
        />
      </div>
    </Link>
  );
}