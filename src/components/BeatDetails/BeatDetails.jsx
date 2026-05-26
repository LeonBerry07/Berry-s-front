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

  // =========================
  // PLAYER STATES
  // =========================

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [currentTime, setCurrentTime] =
    useState(0);

  const [duration, setDuration] =
    useState(0);

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

        // CURRENT BEAT

        const response =
          await fetch(
            `http://localhost:3001/api/beats/${id}`
          );

        const data =
          await response.json();

        setBeat(data);

        // RELATED

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
  // AUDIO EVENTS
  // =========================

  useEffect(() => {
    const audio =
      audioRef.current;

    if (!audio) return;

    let animationFrame;

    const whilePlaying = () => {
      setCurrentTime(
        audio.currentTime
      );

      animationFrame =
        requestAnimationFrame(
          whilePlaying
        );
    };

    const loadedMetadata = () => {
      setDuration(
        audio.duration || 0
      );
    };

    const handlePlay = () => {
      animationFrame =
        requestAnimationFrame(
          whilePlaying
        );
    };

    const handlePause = () => {
      cancelAnimationFrame(
        animationFrame
      );
    };

    const handleEnded = () => {
      setIsPlaying(false);

      setCurrentTime(0);

      cancelAnimationFrame(
        animationFrame
      );
    };

    audio.addEventListener(
      "loadedmetadata",
      loadedMetadata
    );

    audio.addEventListener(
      "play",
      handlePlay
    );

    audio.addEventListener(
      "pause",
      handlePause
    );

    audio.addEventListener(
      "ended",
      handleEnded
    );

    return () => {
      audio.removeEventListener(
        "loadedmetadata",
        loadedMetadata
      );

      audio.removeEventListener(
        "play",
        handlePlay
      );

      audio.removeEventListener(
        "pause",
        handlePause
      );

      audio.removeEventListener(
        "ended",
        handleEnded
      );

      cancelAnimationFrame(
        animationFrame
      );
    };
  }, [beat?.preview]);

  // =========================
  // FORMAT TIME
  // =========================

  function formatTime(time) {
    if (!time) return "0:00";

    const minutes =
      Math.floor(time / 60);

    const seconds = Math.floor(
      time % 60
    );

    return `${minutes}:${
      seconds < 10
        ? "0" + seconds
        : seconds
    }`;
  }

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
  // PLAY / PAUSE
  // =========================

  async function handlePreview() {
    const audio =
      audioRef.current;

    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();

        setIsPlaying(true);
      } else {
        audio.pause();

        setIsPlaying(false);
      }
    } catch (error) {
      console.error(
        "Audio play error:",
        error
      );
    }
  }

  // =========================
  // SEEK
  // =========================

  function handleSeek(e) {
    const audio =
      audioRef.current;

    if (!audio) return;

    const newTime =
      Number(e.target.value);

    audio.currentTime =
      newTime;

    setCurrentTime(newTime);
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

          {/* ========================= */}
          {/* PLAYER */}
          {/* ========================= */}

          <div className="player-container">
            {/* WAVEFORM */}

            <div className="waveform">
              {Array.from({
                length: 60,
              }).map((_, index) => {
                const heights = [
                  14, 20, 26, 18, 34,
                  24, 40, 16, 30, 22,
                ];

                return (
                  <span
                    key={index}
                    className={`wave-bar ${
                      isPlaying
                        ? "playing"
                        : ""
                    }`}
                    style={{
                      height: `${
                        heights[
                          index %
                            heights.length
                        ]
                      }px`,
                      animationDelay: `${index * 0.03}s`,
                    }}
                  />
                );
              })}
            </div>

            {/* CONTROLS */}

            <div className="player-controls">
              <button
                className="play-btn"
                onClick={
                  handlePreview
                }
              >
                {isPlaying
                  ? "❚❚"
                  : "▶"}
              </button>

              <div className="progress-container">
                <span>
                  {formatTime(
                    currentTime
                  )}
                </span>

                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  step="0.01"
                  value={
                    currentTime
                  }
                  onChange={
                    handleSeek
                  }
                  className="progress-bar"
                />

                <span>
                  {formatTime(
                    duration
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* ACTIONS */}

          <div className="beat-actions">
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
            preload="metadata"
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
              (
                relatedBeat
              ) => (
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