import { useEffect, useState } from "react";
import BeatCard from "../BeatCard/BeatCard";
import "./Catalogue.css";

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
    <div className="home">
      <section className="featured">
        <div className="catalog-nav">
          <button onClick={() => setSelectedCategory("new")}>New Beats</button>
          <button onClick={() => setSelectedCategory("top")}>Top Beats</button>
          <button onClick={() => setSelectedCategory("lofi")}>LoFi</button>
          <button onClick={() => setSelectedCategory("ambient")}>Ambient</button>
          <button onClick={() => setSelectedCategory("all")}>All</button>
        </div>
      </section>

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
    </div>
  );
}