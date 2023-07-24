import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Students = () => {
  const [students, setStudents] = useState([]);

  const role = localStorage.getItem('role');
  const isAdmin = role === 'ROLE_ADMIN' ? true : false; 
  useEffect(() => {
    fetch("http://localhost:8000/students")
      .then((response) => response.json())
      .then((data) => setStudents(data));
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Liste des étudiants</h1>
      {
        isAdmin &&
        <>
        <Link
          to="/students/create"
          style={{
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
          }}
        >
          Créer un étudiant
        </Link>
        </>
      }
      
      <ul style={{ listStyle: "none", padding: 0 }}>
        {students.map((student) => (
          <li
            key={student.id}
            style={{
              backgroundColor: "#f0f0f0",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            <Link
              to={`/students/${student.id}`}
              style={{
                textDecoration: "none",
                color: "#333",
                fontWeight: "bold",
              }}
            >
              {student.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Students;
