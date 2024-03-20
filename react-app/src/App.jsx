import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React, { useState } from 'react';
import './App.css';
import Hero from "./components/Hero"; // Ensure this path is correct

import ChannelMembers from './ChannelMembers';
import FriendsList from './Friendslist'; 
import Chat from './Chat';

//import Footer from './Footer'; 

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Hero />}
        ></Route>
      
      </Routes>
    </Router>
  );

  /*
  return (
    <Hero />
  );
  */


  /*
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          
          <Hero />
        </Route>
        
      </Switch>
    </Router>
  );
  */
  

  /*
  // Dummy data for demonstration purposes
  const admins = useState([
    {
      name: 'Admin1',
      status: 'online',
      profilePic: '/path/to/admin1.jpg', // Ensure the path is correct
    },
  ])[0];

  const members = useState([
    {
      name: 'Member1',
      status: 'offline',
      profilePic: '/path/to/member1.jpg', // Ensure the path is correct
    },
  ])[0];

  return (
    <div className="App">
      <FriendsList />

      
      <div className="sidebar">
        <ChannelMembers admins={admins} members={members} />
      </div>
    
      <Chat />
      


    </div>
  );
  */
  
  
}

//export default App;