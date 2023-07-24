import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Schools from './pages/School/Schools';
import Students from './pages/Student/Students';
import School from './pages/School/School';
import Student from './pages/Student/Student';
import UpdateSchool from './pages/School/UpdateSchool';
import UpdateStudent from './pages/Student/UpdateStudent';
import CreateSchool from "./pages/School/CreateSchool";
import CreateStudent from "./pages/Student/CreateStudent";
import { Navigate } from 'react-router-dom';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('role') === 'ROLE_ADMIN' ? true : false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const logout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    window.location.href = '/login';
    setIsAdmin(false);
    setIsAuthenticated(false);
  }

  const handleLogin = () => {
    setIsAuthenticated(true);
    setIsAdmin(localStorage.getItem('role') === 'ROLE_ADMIN' ? true : false);
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <nav style={{ marginBottom: '20px', backgroundColor: '#f0f0f0', padding: '10px' }}>
          <ul style={{ listStyle: 'none', display: 'flex', alignItems: 'center', padding: 0 }}>
            <li style={{ marginRight: '10px' }}>
              <Link to="/schools" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Écoles</Link>
            </li>
            <li style={{ marginRight: '10px' }}>
              <Link to="/students" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Étudiants</Link>
            </li>
            {isAuthenticated &&
              <li>
                <button onClick={logout} style={{ textDecoration: 'none', color: '#fff', backgroundColor: '#f44336', padding: '8px 16px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Déconnexion</button>
              </li>
            }
          </ul>
        </nav>

        <Routes>
          <Route path="/login" exact element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />

          <Route path="/schools" exact element={isAuthenticated ? <Schools /> : <Navigate to="/login" />} />

          <Route path="/students" exact element={isAuthenticated ? <Students /> : <Navigate to="/login" />} />

          <Route path="/schools/:id" exact element={isAuthenticated ? <School /> : <Navigate to="/login" />} />

          <Route path="/students/:id" exact element={isAuthenticated ? <Student /> : <Navigate to="/login" />} />

          <Route path="/schools/:id/update" exact element={isAuthenticated && isAdmin ? <UpdateSchool /> : <Navigate to="/login" />} />

          <Route path="/students/:id/update" exact element={isAuthenticated && isAdmin ? <UpdateStudent /> : <Navigate to="/login" />} />

          <Route path="/students/create" exact element={isAuthenticated && isAdmin ? <CreateStudent /> : <Navigate to="/login" />} />

          <Route path="/schools/create" exact element={isAuthenticated && isAdmin ? <CreateSchool /> : <Navigate to="/login" />} />

          <Route render={() => <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
