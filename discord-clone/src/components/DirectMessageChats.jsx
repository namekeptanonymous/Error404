import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";

const DirectMessageChats = () => {
  
  const [chats, setChats] = useState([]);
  const [currentUser] = useAuthState(auth);
  const {dispatch} = useContext(ChatContext);

  useEffect(() => {
    if (currentUser?.uid) {
      const getChats = () => {
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
          setChats(doc.data() ?? {});
        });

        return () => {
          unsub();
        };
      };

      currentUser.uid && getChats(); 
    }
  }, [currentUser?.uid]); 

  const handleSelect = (u) => {
    if (u.uid !== currentUser.uid) {
      dispatch({ type: "CHANGE_USER", payload: u });
    }
  };

  return (
    <div className="chats">
    {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => {
      const userInfo = chat[1].userInfo;
      if (!userInfo || userInfo.uid === currentUser.uid) {
        return null;
      }

      return (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(userInfo)}
        >
          <img src={userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{userInfo.name}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      );
    })}
  </div>
  );
};

export default DirectMessageChats;