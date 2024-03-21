import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import Header from "./components/Header";
import Hero from "./components/Hero";

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

      {/*<Route path = "/channels" element = {<Home />}>
      </Route> */}
    
      </Routes>
    </Router>

    </div>
  )
 
}

export default App
