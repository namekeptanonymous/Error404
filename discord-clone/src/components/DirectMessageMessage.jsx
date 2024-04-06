import React, {useContext, useEffect, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { ChatContext } from "../context/ChatContext";


const DirectMessageMessage = ({message}) => {
  const [currentUser] = useAuthState(auth);
  const { data } = useContext(ChatContext);

  console.log(message);
  return (
    <div className = 'message owner'>
      <div className = 'messageInfo'>
          <img src ={currentUser?.photoURL} alt =""/>
          <span>just now</span>
      </div>
      <div className = 'messageContent'>
        <p>hello</p>
        {/* <img src ={user?.photoURL} alt =""/> */}
      </div>
    </div>
  )
}

export default DirectMessageMessage
