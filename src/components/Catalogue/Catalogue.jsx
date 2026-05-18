import "./Catalogue.css";
import { useEffect, useState } from "react";
import BeatCard from "../BeatCard/BeatCard";

export default function Catalogue() {
  const [beats, setBeats] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBeats() {
      try {
        setLoading(true);

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
    <div className="catalogue">
      {/* FILTROS */}
      <section className="featured">
        <div className="catalog-nav">
          <button
            onClick={() => setSelectedCategory("new")}
            className={`category-btn new ${
              selectedCategory === "new" ? "active" : ""
            }`}
          >
            <span>New Beats</span>
          </button>

          <button
            onClick={() => setSelectedCategory("top")}
            className={`category-btn top ${
              selectedCategory === "top" ? "active" : ""
            }`}
          >
            <span>Top Beats</span>
          </button>

          <button
            onClick={() => setSelectedCategory("lofi")}
            className={`category-btn lofi ${
              selectedCategory === "lofi" ? "active" : ""
            }`}
          >
            <span>Lo-Fi</span>
          </button>

          <button
            onClick={() => setSelectedCategory("ambient")}
            className={`category-btn ambient ${
              selectedCategory === "ambient" ? "active" : ""
            }`}
          >
            <span>Ambient</span>
          </button>

          <button
            onClick={() => setSelectedCategory("all")}
            className={`category-btn all ${
              selectedCategory === "all" ? "active" : ""
            }`}
          >
            <span>All</span>
          </button>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section className="featured">
        {loading ? (
          <p>Cargando beats...</p>
        ) : (
          <div className="beat-grid">
            {beats.map((beat) => (
              <BeatCard
                key={beat.id}
                beat={beat}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}