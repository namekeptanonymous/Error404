import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Home from './components/Home';
import AdminPage from './components/AdminPage';
import DirectMessageHome from './components/DirectMessageHome';
import "./styles.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

        <Route exact path = "/" element = {
            <>
            <Header/> 
            <Hero/> 
            </>
          }>
        </Route>

        <Route exact path="/channels" element= {
            <>
            <Home />
            </>
          }>
        </Route>

        <Route exact path="/channels/:id" element= {
            <>
            <Home />
            </>
          }>
        </Route>

        <Route exact path="/direct-message" element= {
            <>
            <DirectMessageHome />
            </>
          }>
        </Route>

        <Route exact path="/admin-page" element= {
            <>
            <AdminPage />
            </>
          }>
        </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;