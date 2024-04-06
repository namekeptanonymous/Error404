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
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid])

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map(([chatId, chatData]) => {
        // Check if userInfo exists before trying to access its properties
        const userInfo = chatData.userInfo;
        if (!userInfo) {
          // Skip rendering this chat entry if userInfo is undefined
          return null;
        }

        return (
          <div className="userChat" key={chatId} onClick={() => handleSelect(userInfo)}>
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

export default DirectMessageChats
