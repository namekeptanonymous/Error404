import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react'; //
import chatterboxImage from '../images/chatterbox.png';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom'; //

const DirectMessageSearch = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="search">
      <div className="searchForm">
          <input type="text" placeholder="Find a user" />
      </div>

      <div className = "userChat">
          <img src={user?.photoURL} alt="User Logo" />

          <div className = "userChatInfo">
            <span>{user.displayName}</span>
          </div>

      </div>

    </div>
      
          
       
  );
}

export default DirectMessageSearch;
