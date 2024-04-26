import React, { useEffect, useState }  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateForm from './components/CreateForm';
import HomeFeed from './page/HomeFeed';
import Navigation from './components/Navigation';
import { createClient } from '@supabase/supabase-js';


const App = () => (
  <div>
  <Router>
    <div>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<HomeFeed />} />
        <Route exact path="/create" element={<CreateForm />} />
      </Routes>
    </div>
  </Router>
  </div>
);

export default App;
