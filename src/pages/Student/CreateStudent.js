import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateStudent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [school_id, setSchoolId] = useState("");
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    // Charger la liste des écoles à partir de l'API
    fetch("http://localhost:8000/schools")
      .then((response) => response.json())
      .then((data) => {
        setSchools(data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des écoles : ", error);
      });
  }, []);

  const handleCreate = () => {
    // Créer un nouvel étudiant en utilisant l'API
    fetch("http://localhost:8000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, school_id: school_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Étudiant créé avec succès : ", data);
        navigate("/students"); // Rediriger l'utilisateur vers la liste des étudiants après la création
      })
      .catch((error) => {
        console.error("Erreur lors de la création de l'étudiant : ", error);
      });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "20px" }}>Créer un nouvel étudiant</h2>
      <div style={{ marginBottom: "20px" }}>
        <label>Nom :</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ marginLeft: "10px" }} />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>École :</label>
        <select value={school_id} onChange={(e) => setSchoolId(e.target.value)} style={{ marginLeft: "10px" }}>
          <option value="">Sélectionner une école</option>
          {schools.map((school) => (
            <option key={school.id} value={school.id}>
              {school.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleCreate} style={{ cursor: "pointer", backgroundColor: "#4CAF50", color: "#fff", padding: "10px", borderRadius: "5px", fontWeight: "bold" }}>
        Créer
      </button>
    </div>
  );
};

export default CreateStudent;
