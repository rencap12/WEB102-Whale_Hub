import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateForm from './components/CreateForm';
import HomeFeed from './page/HomeFeed';
import Navigation from './components/Navigation';

const App = () => (
  <Router>
    <div>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<HomeFeed />} />
        <Route exact path="/create" element={<CreateForm />} />
      </Routes>
    </div>
  </Router>
);

export default App;
