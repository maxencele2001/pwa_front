import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const School = () => {
  const { id } = useParams();
  const [school, setSchool] = useState({});
  const navigate = useNavigate();

  const role = localStorage.getItem('role');
  const isAdmin = role === 'ROLE_ADMIN' ? true : false; 

  useEffect(() => {
    // Fetch data from the API endpoint /schools/{id}
    fetch(`http://localhost:8000/schools/${id}`)
      .then((response) => response.json())
      .then((data) => setSchool(data));
  }, [id]);

  const handleUpdate = () => {
    navigate(`/schools/${id}/update`);
  };

  const handleDelete = () => {
    fetch(`http://localhost:8000/schools/${id}`, { method: "DELETE" })
      .then((response) => {
        navigate("/schools");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "10px" }}>{school.name}</h2>
      <p style={{ marginBottom: "5px" }}>Pays : {school.country}</p>
      <p style={{ marginBottom: "10px" }}>Ville : {school.city}</p>

      {isAdmin &&
        <>
          <button onClick={handleUpdate} style={{ cursor: "pointer", backgroundColor: "#4CAF50", color: "#fff", padding: "10px", borderRadius: "5px", fontWeight: "bold" }}>Modifier</button>
          <button onClick={handleDelete} style={{ cursor: "pointer", backgroundColor: "#f44336", color: "#fff", padding: "10px", borderRadius: "5px", fontWeight: "bold" }}>Supprimer</button>
        </>
      }
      <Link to="/schools" style={{ cursor: "pointer", textDecoration: "none", backgroundColor: "#333", color: "#fff", padding: "10px", borderRadius: "5px", fontWeight: "bold", display: "block", textAlign: "center", marginTop: "20px" }}>
        Retour à la liste des ecoles
      </Link>
    </div>
  );
};

export default School;
