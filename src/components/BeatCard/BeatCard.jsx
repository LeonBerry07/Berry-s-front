// src/components/BeatCard.jsx
import "./BeatCard.css"

export default function BeatCard({ beat }) {
  return (
    <div className="beat-card">
      <div className="beat-info">
        <h3>{beat.title}</h3>
        <p>Prod. {beat.producer}</p>
      </div>
      <div className="beat-footer">
        <span>${beat.price}</span>
        <button className="btn-preview">Preview ▶</button>
      </div>
    </div>
  )
}