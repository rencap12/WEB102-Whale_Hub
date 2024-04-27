import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import the CSS file for Navigation styling

const Navigation = () => (
  <nav className="navbar">
    <h1>Whale Hub-a-Dub</h1>
    <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
    <ul className="nav-list">
      <li className="nav-item">
        <Link to="/" className="nav-link">Home</Link>
      </li>
      <li className="nav-item">
        <Link to="/create" className="nav-link">Create Post</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;