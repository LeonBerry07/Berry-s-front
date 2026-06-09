import "./Catalogue.css";
import {
  useEffect,
  useState,
} from "react";

import BeatCard from "../BeatCard/BeatCard";

export default function Catalogue() {
  const [beats, setBeats] =
    useState([]);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("all");

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  // =========================
  // FETCH BEATS
  // =========================

  useEffect(() => {
    async function fetchBeats() {
      try {
        setLoading(true);

        let url =
          "http://localhost:3001/api/beats";

        if (
          selectedCategory !==
          "all"
        ) {
          url += `?category=${selectedCategory}`;
        }

        const response =
          await fetch(url);

        const data =
          await response.json();

        const formattedBeats =
          data.map((beat) => ({
            ...beat,

            image:
              beat.image ||
              "/beats/images/default.jpg",
          }));

        setBeats(formattedBeats);
      } catch (error) {
        console.error(
          "Error loading beats:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    fetchBeats();
  }, [selectedCategory]);

  // =========================
  // SEARCH FILTER
  // =========================

  const filteredBeats =
    beats.filter((beat) => {
      const term =
        search.toLowerCase();

      return (
        beat.title
          ?.toLowerCase()
          .includes(term) ||
        beat.producer
          ?.toLowerCase()
          .includes(term) ||
        beat.category
          ?.toLowerCase()
          .includes(term)
      );
    });

  return (
    <div className="catalogue">
      {/* ========================= */}
      {/* SEARCH */}
      {/* ========================= */}

      <div className="catalog-search">
        <input
          type="text"
          placeholder="Search beats, producers or categories..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />
      </div>

      {/* ========================= */}
      {/* FILTERS */}
      {/* ========================= */}

      <section className="featured">
        <div className="catalog-nav">
          <button
            onClick={() =>
              setSelectedCategory(
                "new"
              )
            }
            className={`category-btn new ${
              selectedCategory ===
              "new"
                ? "active"
                : ""
            }`}
          >
            <span>
              New Beats
            </span>
          </button>

          <button
            onClick={() =>
              setSelectedCategory(
                "top"
              )
            }
            className={`category-btn top ${
              selectedCategory ===
              "top"
                ? "active"
                : ""
            }`}
          >
            <span>
              Top Beats
            </span>
          </button>

          <button
            onClick={() =>
              setSelectedCategory(
                "lofi"
              )
            }
            className={`category-btn lofi ${
              selectedCategory ===
              "lofi"
                ? "active"
                : ""
            }`}
          >
            <span>
              Lo-Fi
            </span>
          </button>

          <button
            onClick={() =>
              setSelectedCategory(
                "ambient"
              )
            }
            className={`category-btn ambient ${
              selectedCategory ===
              "ambient"
                ? "active"
                : ""
            }`}
          >
            <span>
              Ambient
            </span>
          </button>

          <button
            onClick={() =>
              setSelectedCategory(
                "all"
              )
            }
            className={`category-btn all ${
              selectedCategory ===
              "all"
                ? "active"
                : ""
            }`}
          >
            <span>All</span>
          </button>
        </div>
      </section>

      {/* ========================= */}
      {/* CATALOGUE */}
      {/* ========================= */}

      <section className="featured">
        {loading ? (
          <p>
            Loading beats...
          </p>
        ) : filteredBeats.length ===
          0 ? (
          <p className="no-results">
            No beats found.
          </p>
        ) : (
          <div className="beat-grid">
            {filteredBeats.map(
              (beat) => (
                <BeatCard
                  key={beat.id}
                  beat={beat}
                />
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
}