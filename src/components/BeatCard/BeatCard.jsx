import { useRef } from "react";
import "./BeatCard.css";

export default function BeatCard({ beat }) {
  const audioRef = useRef(null);

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
      </div>

      {/* Audio oculto para reproducir el preview */}
      <audio
        ref={audioRef}
        src={beat.preview}
      />
    </div>
  );
}