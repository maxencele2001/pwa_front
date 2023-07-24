// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Login = ({onLogin}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoyer les données de connexion à l'API Symfony avec Fetch
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (!response.ok) {
        // Gérer les erreurs en cas d'identifiants invalides ou autres problèmes de connexion
        throw new Error('Identifiants invalides');
      }

      // Récupérer le token JWT depuis la réponse
      const data = await response.json();
      const token = data.token;
      const role = data.role;

      // Stocker le token dans le local storage ou les cookies
      // pour une utilisation ultérieure dans les requêtes
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      navigate('/');
      onLogin()

      // Rediriger l'utilisateur vers une autre page (par exemple, la page d'accueil)
      // ou effectuer d'autres actions en cas de connexion réussie
    } catch (error) {
      // Gérer les erreurs ici
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email :</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
