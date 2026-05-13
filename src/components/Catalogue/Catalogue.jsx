import { useEffect, useState } from "react";
import BeatCard from "../BeatCard/BeatCard";
import "./Catalogue.css";

export default function Catalogue({ cart, setCart }) {
  const [beats, setBeats] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  // Agregar al carrito (sin duplicados)
  function addToCart(beat) {
    setCart((prevCart) => {
      const exists = prevCart.some(item => item.id === beat.id);
      if (exists) return prevCart;
      return [...prevCart, beat];
    });
  }

  // Cargar beats
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

      {/* Categorías */}
      <section className="featured">
        <div className="catalog-nav">

          <button onClick={() => setSelectedCategory("new")} className="category-btn new">
            New Beats
          </button>

          <button onClick={() => setSelectedCategory("top")} className="category-btn top">
            Top Beats
          </button>

          <button onClick={() => setSelectedCategory("lofi")} className="category-btn lofi">
            LoFi
          </button>

          <button onClick={() => setSelectedCategory("ambient")} className="category-btn ambient">
            Ambient
          </button>

          <button onClick={() => setSelectedCategory("all")} className="category-btn all">
            All
          </button>

        </div>

        {/* contador */}
        <p style={{ marginTop: "20px", fontWeight: "bold" }}>
          Cart ({cart.length})
        </p>

      </section>

      {/* catálogo */}
      <section className="featured">
        {loading ? (
          <p>Cargando beats...</p>
        ) : (
          <div className="beat-grid">
            {beats.map((beat) => (
              <BeatCard
                key={beat.id}
                beat={beat}
                addToCart={addToCart}
                cart={cart}
                setCart={setCart}
              />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}