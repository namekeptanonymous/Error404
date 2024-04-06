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
    <div className = "chats">

    {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
      <div className = "userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
          <img src={chat[1].userInfo.photoURL} alt="User Logo" />

          <div className = "userChatInfo">
            <span>{chat[1].userInfo.name}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>

      </div>
    ))}
    </div>
  );
};

export default DirectMessageChats
