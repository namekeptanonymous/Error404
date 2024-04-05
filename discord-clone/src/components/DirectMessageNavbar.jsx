import React from 'react'
import chatterboxImage from '../images/chatterbox.png';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';

const DirectMessageNavbar = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="navbar">
      <span className="logo">ChatterBox</span>
      <div className="user">
        <img src={chatterboxImage} className="w-12 h-12 object-contain" alt="ChatterBox Logo" />
        <span> {user?.displayName} </span>
        
      </div>
    </div>
  )
}

export default DirectMessageNavbar
