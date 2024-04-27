import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import the CSS file for Navigation styling

const Navigation = ({ setSearchQuery }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  const handleHomeLinkClick = () => {
    // Clear the search query
    setSearchQuery('');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src='/whale_logo.png' alt="whale_logo" style={{ height: '100px', width: '80px', marginRight: '5px' }} />
        <h1>Whale Hub-a-Dub</h1>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={handleHomeLinkClick}>Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/create" className="nav-link">Create Post</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
