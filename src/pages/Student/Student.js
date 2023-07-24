import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const Student = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const [note, setNote] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const role = localStorage.getItem('role');
  const isAdmin = role === 'ROLE_ADMIN' ? true : false; 
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch data from the API endpoint /students/{id}
    fetch(`http://localhost:8000/students/${id}`)
      .then((response) => response.json())
      .then((data) => setStudent(data));

    fetchComments();
  }, [id]);


  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:8000/students/${id}/comment_notes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } 
    } catch (error) {
      console.error(error);
    }
  };


  const handleUpdate = () => {
    navigate(`/students/${id}/update`);
  };

  const handleDelete = () => {
    fetch(`http://localhost:8000/students/${id}`, { method: "DELETE" })
      .then((response) => {
        navigate("/students");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteComment = (id_comment) => {
    fetch(`http://localhost:8000/comment_notes/${id_comment}`, { method: "DELETE" })
      .then(() => {
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== id_comment));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    const data = {
      note: parseInt(note),
      comment,
      id: id,
    };

    try {
      const response = await fetch(`http://localhost:8000/commentnotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      if (response) {
        const resp = await response.json();
        setComments([...comments, resp]);
        setNote(0);
        setComment('');
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "10px" }}>{student.name}</h2>
      <p style={{ marginBottom: "10px" }}>École : {student.school && student.school.name}</p>
      <h3 style={{ marginBottom: "10px" }}>Commentaires:</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {comments.map((comment) => (
          <li
            key={comment.id}
            style={{
              backgroundColor: "#f0f0f0",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            {comment.comment} notes : {comment.note}/10 de {comment.author.email}
            {isAdmin && <button onClick={() => handleDeleteComment(comment.id)} style={{ cursor: "pointer", backgroundColor: "#f44336", color: "#fff", padding: "10px", borderRadius: "5px", fontWeight: "bold" }}>Supprimer</button>}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Note:</label>
          <input type="number" max="10" value={note} onChange={handleNoteChange} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Commentaire:</label>
          <textarea value={comment} onChange={handleCommentChange} />
        </div>
        <button type="submit" style={{ cursor: "pointer", backgroundColor: "#4CAF50", color: "#fff", padding: "10px", borderRadius: "5px", fontWeight: "bold" }}>
          Ajouter
        </button>
      </form>

      {isAdmin &&
        <>
          <Link to={`/students/${id}/update`} style={{ cursor: "pointer", textDecoration: "none", backgroundColor: "#4CAF50", color: "#fff", padding: "10px", borderRadius: "5px", fontWeight: "bold", marginRight: "10px" }}>
            Modifier
          </Link>
          <button onClick={handleDelete} style={{ cursor: "pointer", backgroundColor: "#f44336", color: "#fff", padding: "10px", borderRadius: "5px", fontWeight: "bold" }}>
            Supprimer
          </button>
        </>
      }

      <Link to="/students" style={{ cursor: "pointer", textDecoration: "none", backgroundColor: "#333", color: "#fff", padding: "10px", borderRadius: "5px", fontWeight: "bold", display: "block", textAlign: "center", marginTop: "20px" }}>
        Retour à la liste des étudiants
      </Link>
    </div>
  );
};

export default Student;
