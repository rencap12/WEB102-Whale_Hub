import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateForm from './components/CreateForm';
import HomeFeed from './page/HomeFeed'; // Import HomeFeed
import Navigation from './components/Navigation';
import SpecificPost from './page/SpecificPost';
import EditPost from './page/EditPost';
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <Router>
        <div>
          <Navigation setSearchQuery={setSearchQuery} />
          <Routes>
            {/* Define routes for each component */}
            <Route exact path="/" 
              element={ <HomeFeed searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> }
              />
            <Route exact path="/create" element={<CreateForm />} />
            <Route exact path="/posts/:postId" element={<SpecificPost />} />
            <Route exact path="/posts/:postId/edit" element={<EditPost />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
