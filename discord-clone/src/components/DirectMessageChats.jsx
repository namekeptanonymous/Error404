import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react'; //
import chatterboxImage from '../images/chatterbox.png';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom'; //

const DirectMessageChats = () => {
  const [user] = useAuthState(auth);

  return (
    <div className = "chats">
      <div className = "userChat">
          <img src={user?.photoURL} alt="User Logo" />

          <div className = "userChatInfo">
            <span>{user.displayName}</span>
            <p> Hello World! </p>
          </div>

      </div>

      <div className = "userChat">
          <img src={user?.photoURL} alt="User Logo" />

          <div className = "userChatInfo">
            <span>{user.displayName}</span>
            <p> Hello World! </p>
          </div>

      </div>

      <div className = "userChat">
          <img src={user?.photoURL} alt="User Logo" />

          <div className = "userChatInfo">
            <span>{user.displayName}</span>
            <p> Hello World! </p>
          </div>

      </div>

    </div>
  )
}

export default DirectMessageChats
