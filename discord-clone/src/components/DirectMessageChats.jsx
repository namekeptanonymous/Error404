import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import chatterboxImage from '../images/chatterbox.png';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom'; //
import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";

const DirectMessageChats = () => {
  
  const [chats, setChats] = useState([]);
  const [currentUser] = useAuthState(auth);
  const {dispatch} = useContext(ChatContext);

  useEffect(() => {
    if (currentUser?.uid) { // Make sure currentUser is not null before accessing uid
      const getChats = () => {
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
          setChats(doc.data() ?? {}); // Use nullish coalescing to default to an empty object if doc.data() is null
        });

        return () => {
          unsub();
        };
      };

      getChats();
    }
  }, [currentUser?.uid]); // Use optional chaining to guard against null values

  const handleSelect = (u) => {
    if (u.uid !== currentUser.uid) { // Check that u is not null before dispatching
      dispatch({ type: "CHANGE_USER", payload: u });
    }
  };

  {/* return statement different */}
  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map(([chatId, chatData]) => {
        // Check if userInfo exists before trying to access its properties
        const userInfo = chatData.userInfo;
        if (!userInfo || userInfo.uid === currentUser.uid) {
          // Skip rendering this chat entry if userInfo is undefined or if the chat belongs to the current user
          return null;
        }
  
        // You can also implement additional logic to prevent selecting the chat if it belongs to the current user
        const handleSelectUser = () => {
          if (userInfo.uid !== currentUser.uid) {
            handleSelect(userInfo);
          }
        };

        return (
          <div className="userChat" key={chatId} onClick={handleSelectUser}>
            {/* Now we are sure userInfo is defined */}
            <img src={userInfo.photoURL || chatterboxImage} alt="User Logo" />

            <div className="userChatInfo">
              <span>{userInfo.name}</span>
              <p>{chatData.lastMessage?.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DirectMessageChats;
