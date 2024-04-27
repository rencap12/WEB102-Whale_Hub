import React, { useEffect, useState }  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateForm from './components/CreateForm';
import HomeFeed from './page/HomeFeed';
import Navigation from './components/Navigation';
import SpecificPost from './page/SpecificPost';
import './App.css';

const App = () => (
  <div>
  <Router>
    <div>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<HomeFeed />} />
        <Route exact path="/create" element={<CreateForm />} />
        <Route exact path="/posts/:postId" element={<SpecificPost />} />
      </Routes>
    </div>
  </Router>
  </div>
);

export default App;
