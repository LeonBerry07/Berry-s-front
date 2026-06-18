import {
  useEffect,
  useState,
} from "react";

import BeatCard from "../BeatCard/BeatCard";

import "./Home.css";


export default function Home() {

  const [
    featuredBeats,
    setFeaturedBeats,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);


  // =========================
  // FETCH FEATURED BEATS
  // =========================

  useEffect(() => {

    async function fetchBeats() {

      try {

        const response =
          await fetch(
            "http://localhost:3001/api/beats"
          );


        const data =
          await response.json();


        const formattedBeats =
          data
            .map((beat) => ({
              ...beat,

              image:
                beat.image ||
                "/beats/images/default.jpg",
            }))
            .sort(
              (a, b) =>
                Number(b.id) -
                Number(a.id)
            )
            .slice(0, 3);


        setFeaturedBeats(
          formattedBeats
        );


      } catch(error) {

        console.error(
          "Error loading featured beats:",
          error
        );

      } finally {

        setLoading(false);

      }
    }


    fetchBeats();

  }, []);


  return (
    <div className="home">

      {/* HERO */}

      <section className="hero">

        <h1>
          Berry’s Music Store 🎧
        </h1>

        <p>
          Descubre, escucha y compra beats exclusivos de productores de todo el mundo.
        </p>

        <a
          href="/catalogue"
          className="btn-primary"
        >
          Explorar Catálogo
        </a>

      </section>



      {/* DESTACADOS */}

      <section className="featured">

        <h2>
          Beats Destacados
        </h2>


        {
          loading ? (

            <p>
              Loading beats...
            </p>

          ) : featuredBeats.length === 0 ? (

            <p>
              No featured beats available.
            </p>

          ) : (

            <div className="beat-grid">

              {
                featuredBeats.map(
                  (beat) => (

                    <BeatCard
                      key={beat.id}
                      beat={beat}
                    />

                  )
                )
              }

            </div>

          )
        }


      </section>



      {/* CTA FINAL */}

      <section className="cta">

        <h2>
          ¿Listo para crear tu próximo hit?
        </h2>

        <p>
          Regístrate y empieza a comprar o vender beats ahora mismo.
        </p>

        <a
          href="/login"
          className="btn-secondary"
        >
          Crear Cuenta
        </a>

      </section>


    </div>
  );
}