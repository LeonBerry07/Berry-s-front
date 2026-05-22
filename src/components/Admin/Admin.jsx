import "./Admin.css";
import { useEffect, useState } from "react";

export default function Admin() {
  const [beats, setBeats] = useState([]);

  const [title, setTitle] = useState("");
  const [producer, setProducer] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [audioFile, setAudioFile] = useState(null);

  const [loading, setLoading] = useState(true);

  // =========================
  // CARGAR BEATS
  // =========================
  async function fetchBeats() {
    try {
      const response = await fetch(
        "http://localhost:3001/api/beats"
      );

      const data = await response.json();

      setBeats(data);
    } catch (error) {
      console.error(
        "Error loading beats:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBeats();
  }, []);

  // =========================
  // CREAR BEAT
  // =========================
  async function handleCreateBeat(e) {
  e.preventDefault();

  if (
    !title ||
    !producer ||
    !price ||
    !category ||
    !audioFile
  ) {
    alert("Complete all fields.");
    return;
  }

  try {
    // =========================
    // 1. SUBIR MP3
    // =========================

    const formData = new FormData();

    formData.append(
      "audio",
      audioFile
    );

    const uploadResponse =
      await fetch(
        "http://localhost:3001/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );

    const uploadData =
      await uploadResponse.json();

    if (!uploadResponse.ok) {
      alert(
        uploadData.message ||
          "Upload error"
      );

      return;
    }

    // =========================
    // 2. CREAR BEAT
    // =========================

    const response = await fetch(
      "http://localhost:3001/api/beats",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          title,
          producer,
          price,
          category,
          preview: uploadData.path || "",
        }),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      alert(
        data.message ||
          "Error creating beat"
      );

      return;
    }

    alert("Beat uploaded 🎵");

    // limpiar form
    setTitle("");
    setProducer("");
    setPrice("");
    setCategory("");
    setAudioFile(null);

    // refrescar
    fetchBeats();
  } catch (error) {
    console.error(
      "Create beat error:",
      error
    );
  }
}

  // =========================
  // DELETE
  // =========================
  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Delete this beat?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3001/api/beats/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Error deleting beat"
        );

        return;
      }

      setBeats((prev) =>
        prev.filter(
          (beat) => beat.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Delete beat error:",
        error
      );
    }
  }

  return (
    <div className="admin-container">
      <h1>🎛️ Admin Panel</h1>

      {/* ========================= */}
      {/* CREATE FORM */}
      {/* ========================= */}

      <form
        className="admin-form"
        onSubmit={handleCreateBeat}
      >
        <input
          type="text"
          placeholder="Beat title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Producer"
          value={producer}
          onChange={(e) =>
            setProducer(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        <input
          type="file"
          accept=".mp3,audio/*"
          onChange={(e) =>
            setAudioFile(e.target.files[0])
          }
        />

        <button type="submit">
          Add Beat 🎵
        </button>
      </form>

      {/* ========================= */}
      {/* LIST */}
      {/* ========================= */}

      <div className="admin-list">
        {loading ? (
          <p>Loading beats...</p>
        ) : beats.length === 0 ? (
          <p>No beats found.</p>
        ) : (
          beats.map((beat) => (
            <div
              key={beat.id}
              className="admin-beat-card"
            >
              <div>
                <h3>{beat.title}</h3>

                <p>
                  Producer:{" "}
                  {beat.producer}
                </p>

                <p>
                  Category:{" "}
                  {beat.category}
                </p>

                <p>
                  Price: $
                  {Number(
                    beat.price || 0
                  ).toFixed(2)}
                </p>
              </div>

              <button
                onClick={() =>
                  handleDelete(beat.id)
                }
                className="delete-btn"
              >
                Delete ❌
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}