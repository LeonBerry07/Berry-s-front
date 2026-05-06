// src/pages/Home.jsx
import BeatCard from "../BeatCard/BeatCard"
import "./Home.css"

export default function Home() {
  const featuredBeats = [
    { id: 1, title: "Lo-Fi Dreams", producer: "BerryBeats", price: 25 },
    { id: 2, title: "Trap Energy", producer: "OM53", price: 40 },
    { id: 3, title: "Jazz Chill", producer: "Bruno M", price: 30 },
  ]

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <h1>Berry’s Music Store 🎧</h1>
        <p>
          Descubre, escucha y compra beats exclusivos de productores de todo el
          mundo.
        </p>
        <a href="/catalogue" className="btn-primary">
          Explorar Catálogo
        </a>
      </section>

      {/* Destacados */}
      <section className="featured">
        <h2>Beats Destacados</h2>
        <div className="beat-grid">
          {featuredBeats.map((beat) => (
            <BeatCard key={beat.id} beat={beat} />
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="cta">
        <h2>¿Listo para crear tu próximo hit?</h2>
        <p>Regístrate y empieza a comprar o vender beats ahora mismo.</p>
        <a href="/login" className="btn-secondary">
          Crear Cuenta
        </a>
      </section>
    </div>
  )
}