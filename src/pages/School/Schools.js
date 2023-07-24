import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Schools = () => {
  const [schools, setSchools] = useState([]);

  const role = localStorage.getItem('role');
  const isAdmin = role === 'ROLE_ADMIN' ? true : false; 

  useEffect(() => {
    // Fetch data from the API endpoint /schools
    fetch("http://localhost:8000/schools")
      .then((response) => response.json())
      .then((data) => setSchools(data));
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Liste des écoles</h1>
      {
        isAdmin && 
        <>
          <Link to="/schools/create" style={{
            textDecoration: "none",
            display: "block",
            width: "100%",
            backgroundColor: "#4CAF50",
            color: "#fff",
            padding: "10px",
            textAlign: "center",
            marginBottom: "20px",
            borderRadius: "5px",
            fontWeight: "bold",
          }}>
          Créer une école
          </Link>
        </>
      }
      
      <ul style={{ listStyle: "none", padding: 0 }}>
        {schools.map((school) => (
          <li key={school.id} style={{
            backgroundColor: "#f0f0f0",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}>
            <Link to={`/schools/${school.id}`} style={{
                textDecoration: "none",
                color: "#333",
                fontWeight: "bold",
              }}>{school.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schools;
