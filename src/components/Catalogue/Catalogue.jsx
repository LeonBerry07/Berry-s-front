import BeatCard from "../BeatCard/BeatCard"
import "./Catalogue.css"

export default function Catalogue() {
  const featuredBeats = [
    { 
      id: 1, 
      title: "Lo-Fi Dreams", 
      producer: "BerryBeats", 
      price: 25,
      category: "lofi"
    },
    { 
      id: 2, 
      title: "Trap Energy", 
      producer: "OM53", 
      price: 40,
      category: "top"
    },
    { id: 3, title: "Jazz Chill", producer: "Bruno M", price: 30, category: "ambient" },
  ]

  return (
    <div className="home">
      <section className="featured">
        <div class="catalog-nav">
        <button class="category-btn new" data-category="new">New Beats</button>
        <button class="category-btn top" data-category="top">Top Beats</button>

        <button class="category-btn lofi">
          LoFi
          </button>

        <button class="category-btn ambient">
          Ambient
          </button>

        <button class="category-btn all" data-category="all">All</button>
      </div>

<div id="catalog" class="catalog"></div>
      </section>

      {/* Destacados */}
      <section className="featured">
        <div className="beat-grid">
          {featuredBeats.map((beat) => (
            <BeatCard key={beat.id} beat={beat} />
          ))}
        </div>
      </section>

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