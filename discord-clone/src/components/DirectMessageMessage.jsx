import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';

const DirectMessageMessage = () => {
  const [user] = useAuthState(auth);

  return (
    <div className = 'message owner'>
      <div className = 'messageInfo'>
          <img src ={user?.photoURL} alt =""/>
          <span>just now</span>
      </div>
      <div className = 'messageContent'>
        <p>hello</p>
      </div>
    </div>
  )
}

export default DirectMessageMessage
