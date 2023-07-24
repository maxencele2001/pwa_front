import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");

  useEffect(() => {
    // Charger les détails de l'étudiant à partir de l'API
    fetch(`http://localhost:8000/students/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setStudent(data);
        setSelectedSchool(data.school.id); // Sélectionnez l'ID de l'école actuelle de l'étudiant
      })
      .catch((error) => {
        console.error("Erreur lors du chargement de l'étudiant : ", error);
      });

    // Charger la liste des écoles à partir de l'API
    fetch("http://localhost:8000/schools")
      .then((response) => response.json())
      .then((data) => {
        setSchools(data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des écoles : ", error);
      });
  }, [id]);

  const handleSchoolChange = (event) => {
    setSelectedSchool(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:8000/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...student, school_id: selectedSchool }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Étudiant mis à jour avec succès : ", data);
        navigate(`/students/${id}`);
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'étudiant : ", error);
      });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "20px" }}>Modifier l'étudiant</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label>Nom de l'étudiant :</label>
          <input
            type="text"
            value={student.name || ""}
            onChange={(event) => setStudent({ ...student, name: event.target.value })}
            style={{ marginLeft: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>École :</label>
          <select value={selectedSchool} onChange={handleSchoolChange} style={{ marginLeft: "10px" }}>
            {schools.map((school) => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" style={{ backgroundColor: "#4CAF50", color: "#fff", padding: "10px", borderRadius: "5px", fontWeight: "bold" }}>
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default UpdateStudent;
