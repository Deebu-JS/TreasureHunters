import React from 'react';
import "./Navbar.css"; // Optional: Add custom styles for the navbar
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className="header card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 24px' }}>
      <h2 style={{ margin: 0, borderBottom: 'none' }}>Academy Portal</h2>
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link to="/entry" className="secondary-btn" style={{ textDecoration: 'none', padding: '10px 15px' }}>Enter Marks</Link>
        <Link to="/results" className="secondary-btn" style={{ textDecoration: 'none', padding: '10px 15px' }}>View Results</Link>
        <button onClick={handleLogout} className="secondary-btn" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;