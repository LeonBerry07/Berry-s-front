import "./Admin.css";
import {
  useEffect,
  useState,
} from "react";

export default function Admin() {
  const [beats, setBeats] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [producer, setProducer] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [audioFile, setAudioFile] =
    useState(null);

  const [imageFile, setImageFile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // EDIT MODE
  // =========================

  const [editingBeatId, setEditingBeatId] =
    useState(null);

  // =========================
  // FETCH BEATS
  // =========================

  async function fetchBeats() {
    try {
      const response = await fetch(
        "http://localhost:3001/api/beats"
      );

      const data =
        await response.json();

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
  // RESET FORM
  // =========================

  function resetForm() {
    setTitle("");
    setProducer("");
    setPrice("");
    setCategory("");

    setAudioFile(null);
    setImageFile(null);

    setEditingBeatId(null);
  }

  // =========================
  // CREATE OR UPDATE
  // =========================

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !title ||
      !producer ||
      !price ||
      !category
    ) {
      alert(
        "Complete all fields."
      );

      return;
    }

    try {
      let previewPath = "";
      let imagePath = "";

      // =========================
      // AUDIO UPLOAD
      // =========================

      if (audioFile) {
        const formData =
          new FormData();

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

        if (
          !uploadResponse.ok
        ) {
          alert(
            uploadData.message ||
              "Upload error"
          );

          return;
        }

        previewPath =
          uploadData.path;
      }

      // =========================
      // IMAGE UPLOAD
      // =========================

      if (imageFile) {
        const imageFormData =
          new FormData();

        imageFormData.append(
          "image",
          imageFile
        );

        const imageUploadResponse =
          await fetch(
            "http://localhost:3001/api/upload-image",
            {
              method: "POST",
              body: imageFormData,
            }
          );

        const imageUploadData =
          await imageUploadResponse.json();

        if (
          !imageUploadResponse.ok
        ) {
          alert(
            imageUploadData.message ||
              "Image upload error"
          );

          return;
        }

        imagePath =
          imageUploadData.path;
      }

      // =========================
      // CREATE
      // =========================

      if (!editingBeatId) {
        const response =
          await fetch(
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

                preview:
                  previewPath,

                image:
                  imagePath,
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

        alert(
          "Beat uploaded 🎵"
        );
      }

      // =========================
      // UPDATE
      // =========================

      else {
        const currentBeat =
          beats.find(
            (beat) =>
              beat.id ===
              editingBeatId
          );

        const response =
          await fetch(
            `http://localhost:3001/api/beats/${editingBeatId}`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                title,
                producer,
                price,
                category,

                preview:
                  previewPath ||
                  currentBeat.preview,

                image:
                  imagePath ||
                  currentBeat.image,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          alert(
            data.message ||
              "Error updating beat"
          );

          return;
        }

        alert(
          "Beat updated ✨"
        );
      }

      resetForm();

      fetchBeats();
    } catch (error) {
      console.error(
        "Submit beat error:",
        error
      );
    }
  }

  // =========================
  // EDIT
  // =========================

  function handleEdit(beat) {
    setEditingBeatId(
      beat.id
    );

    setTitle(beat.title);

    setProducer(
      beat.producer
    );

    setPrice(beat.price);

    setCategory(
      beat.category
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // =========================
  // DELETE
  // =========================

  async function handleDelete(id) {
    const confirmDelete =
      window.confirm(
        "Delete this beat?"
      );

    if (!confirmDelete) return;

    try {
      const response =
        await fetch(
          `http://localhost:3001/api/beats/${id}`,
          {
            method: "DELETE",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Error deleting beat"
        );

        return;
      }

      setBeats((prev) =>
        prev.filter(
          (beat) =>
            beat.id !== id
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
      <h1>
        🎛️ Admin Panel
      </h1>

      {/* ========================= */}
      {/* FORM */}
      {/* ========================= */}

      <form
        className="admin-form"
        onSubmit={
          handleSubmit
        }
      >
        <input
          type="text"
          placeholder="Beat title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="Producer"
          value={producer}
          onChange={(e) =>
            setProducer(
              e.target.value
            )
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        />

        {/* AUDIO */}

        <input
          type="file"
          accept=".mp3,audio/*"
          onChange={(e) =>
            setAudioFile(
              e.target.files[0]
            )
          }
        />

        {/* IMAGE */}

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImageFile(
              e.target.files[0]
            )
          }
        />

        {/* BUTTONS */}

        <button type="submit">
          {editingBeatId
            ? "Update Beat ✨"
            : "Add Beat 🎵"}
        </button>

        {editingBeatId && (
          <button
            type="button"
            onClick={
              resetForm
            }
            className="cancel-btn"
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* ========================= */}
      {/* LIST */}
      {/* ========================= */}

      <div className="admin-list">
        {loading ? (
          <p>
            Loading beats...
          </p>
        ) : beats.length === 0 ? (
          <p>
            No beats found.
          </p>
        ) : (
          beats.map((beat) => (
            <div
              key={beat.id}
              className="admin-beat-card"
            >
              <div>
                {/* IMAGE */}

                {beat.image && (
                  <img
                    src={`http://localhost:3001${beat.image}`}
                    alt={
                      beat.title
                    }
                    style={{
                      width: "140px",

                      height:
                        "140px",

                      objectFit:
                        "cover",

                      borderRadius:
                        "14px",

                      marginBottom:
                        "15px",
                    }}
                  />
                )}

                <h3>
                  {beat.title}
                </h3>

                <p>
                  Producer:{" "}
                  {
                    beat.producer
                  }
                </p>

                <p>
                  Category:{" "}
                  {
                    beat.category
                  }
                </p>

                <p>
                  Price: $
                  {Number(
                    beat.price ||
                      0
                  ).toFixed(2)}
                </p>
              </div>

              {/* ACTIONS */}

              <div
                style={{
                  display:
                    "flex",

                  flexDirection:
                    "column",

                  gap: "12px",
                }}
              >
                <button
                  onClick={() =>
                    handleEdit(
                      beat
                    )
                  }
                  className="edit-btn"
                >
                  Edit ✏️
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      beat.id
                    )
                  }
                  className="delete-btn"
                >
                  Delete ❌
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}