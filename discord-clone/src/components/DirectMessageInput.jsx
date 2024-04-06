import React, { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from "../firebase";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { auth } from '../firebase';

const DirectMessageInput = () => {
  const [text, setText] = useState("");

  const [currentUser] = useAuthState(auth);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (text.trim() === "" || !data.chatId) {
      // If there's no text or if chatId is null, do not proceed.
      console.error("No text or the chatId is null.");
      return;
    }

    try {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      setText(""); // Reset text state after sending message
      // setImg(null); // Reset img state after sending message if you are using image state
    } catch (error) {
      console.error("Error sending message: ", error);
      // Handle the error state appropriately
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");

  }

  

  //setText("");
  
  return (
    <div className = 'input'>
      <input type="text" placeholder = "Type something..." onChange={(e) => setText(e.target.value)} value={text}/>
      <div className = "send">
          <img src ="" alt =""/>
          <button onClick={handleSend}> Send </button>
      </div>
    </div>
  )
}

export default DirectMessageInput;
