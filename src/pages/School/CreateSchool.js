import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateSchool = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Envoyez les données de l'école au backend pour la création
    // Remplacez http://localhost:8000 par votre URL backend appropriée
    fetch("http://localhost:8000/schools", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, city, country }),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/schools"); // Redirigez l'utilisateur vers la liste des écoles après la création
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "10px" }}>Créer une école</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Nom de l'école :</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Ville :</label>
          <input
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Pays :</label>
          <input
            type="text"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <button
          type="submit"
          style={{
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "#fff",
            padding: "10px",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          Créer
        </button>
      </form>
    </div>
  );
};

export default CreateSchool;
