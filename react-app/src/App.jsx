import React, { useState } from 'react';
import './App.css';
import ChannelMembers from './ChannelMembers';
import FriendsList from './Friendslist'; 
import Chat from './Chat'
//import Footer from './Footer'; 

function App() {
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
}

export default App;
