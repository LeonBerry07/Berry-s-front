import { useEffect, useState } from "react";
import BeatCard from "../BeatCard/BeatCard";
import "./Catalogue.css";

export default function Catalogue() {
  const [beats, setBeats] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  // Estado del carrito
  const [cart, setCart] = useState([]);

  // Función para agregar beats al carrito (SIN DUPLICADOS)
  function addToCart(beat) {
    console.log("Added to cart:", beat.title);

    setCart((prevCart) => {
      const alreadyInCart = prevCart.some(
        (item) => item.id === beat.id
      );

      if (alreadyInCart) {
        return prevCart; // no lo agrega otra vez
      }

      return [...prevCart, beat];
    });
  }

  // Cargar beats desde el backend
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
      {/* Navegación de categorías */}
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

        {/* Contador del carrito */}
        <p style={{ marginTop: "20px", fontWeight: "bold" }}>
          Cart ({cart.length})
        </p>
      </section>

      {/* Catálogo */}
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
              />
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