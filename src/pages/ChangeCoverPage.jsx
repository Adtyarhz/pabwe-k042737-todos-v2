import React, { useState } from "react";

const ChangeCover = () => {
  const [cover, setCover] = useState(null); // Simpan URL atau file cover
  const [preview, setPreview] = useState(null); // Preview untuk cover baru

  // Fungsi untuk menangani perubahan file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCover(file);
      setPreview(URL.createObjectURL(file)); // Preview gambar sebelum upload
    }
  };

  // Fungsi untuk menyimpan perubahan cover
  const handleSubmit = (e) => {
    e.preventDefault();
    if (cover) {
      // Lakukan proses upload di sini, misalnya menggunakan API atau Redux
      console.log("Cover updated:", cover);

      // Setelah upload berhasil, reset preview dan cover
      setCover(null);
      setPreview(null);
    } else {
      console.error("No cover selected");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Change Cover
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label
            htmlFor="cover"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Select New Cover:
          </label>
          <input
            type="file"
            id="cover"
            name="cover"
            accept="image/*"
            onChange={handleFileChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Preview gambar jika ada */}
        {preview && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <p style={{ marginBottom: "10px" }}>Cover Preview:</p>
            <img
              src={preview}
              alt="Cover Preview"
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "cover",
                borderRadius: "10px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        )}

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Update Cover
        </button>
      </form>
    </div>
  );
};

export default ChangeCoverPage;
