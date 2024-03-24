// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Home from './Home'; // Adjust import path based on project structure

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/">
            <Header />
            <Hero />
          </Route>

          <Route exact path="/channels">
            <Home />
          </Route>

          <Route path="/channels/:id"> {/* Use "path" instead of "exact path" for dynamic parameter */}
            <Home />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
