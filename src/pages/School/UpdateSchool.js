import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateSchool = () => {
  const { id } = useParams();
  const [school, setSchool] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/schools/${id}`)
      .then((response) => response.json())
      .then((data) => setSchool(data));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8000/schools/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(school),
    })
      .then((response) => {
        navigate(`/schools/${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSchool((prevSchool) => ({
      ...prevSchool,
      [name]: value,
    }));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "10px" }}>Modifier l'école : {school.name}</h2>
      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Nom :
          <input
            type="text"
            name="name"
            value={school.name || ""}
            onChange={handleChange}
            style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Pays :
          <input
            type="text"
            name="country"
            value={school.country || ""}
            onChange={handleChange}
            style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Ville :
          <input
            type="text"
            name="city"
            value={school.city || ""}
            onChange={handleChange}
            style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </label>
        <button type="submit" style={{ cursor: "pointer", backgroundColor: "#4CAF50", color: "#fff", padding: "10px", borderRadius: "5px", fontWeight: "bold" }}>Enregistrer</button>
      </form>
    </div>
  );
};

export default UpdateSchool;
