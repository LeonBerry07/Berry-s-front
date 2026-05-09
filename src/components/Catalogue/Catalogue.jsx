import { useEffect, useState } from "react";
import BeatCard from "../BeatCard/BeatCard";
import "./Catalogue.css";

export default function Catalogue() {
  const [beats, setBeats] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  // Cargar beats desde el backend
  useEffect(() => {
    async function fetchBeats() {
      try {
        let url = "http://localhost:3001/api/beats";

        if (selectedCategory !== "all") {
          url += `?category=${selectedCategory}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        setBeats(data);
      } catch (error) {
        console.error("Error loading beats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBeats();
  }, [selectedCategory]);

  return (
    <div className="home">
      {/* Navegación de categorías */}
      <section className="featured">
        <div className="catalog-nav">
          <button className="category-btn new" onClick={() => setSelectedCategory("new")}>
            New Beats
          </button>

          <button className="category-btn top" onClick={() => setSelectedCategory("top")}>
            Top Beats
          </button>

          <button className="category-btn lofi" onClick={() => setSelectedCategory("lofi")}>
            LoFi
          </button>

          <button className="category-btn ambient" onClick={() => setSelectedCategory("ambient")}>
            Ambient
          </button>

          <button className="category-btn all" onClick={() => setSelectedCategory("all")}>
            All
          </button>
        </div>
      </section>

      {/* Catálogo */}
      <section className="featured">
        {loading ? (
          <p>Cargando beats...</p>
        ) : (
          <div className="beat-grid">
            {beats.map((beat) => (
              <BeatCard key={beat.id} beat={beat} />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>¿Listo para crear tu próximo hit?</h2>
        <p>Regístrate y empieza a comprar o vender beats ahora mismo.</p>
        <a href="/login" className="btn-secondary">
          Crear Cuenta
        </a>
      </section>
    </div>
  );
}