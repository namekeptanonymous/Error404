import React, {useContext, useEffect, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { ChatContext } from "../context/ChatContext";


const DirectMessageMessage = ({message}) => {
  const [currentUser] = useAuthState(auth);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  //console.log(message);
  return (
    <div ref={ref} className = {`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className = 'messageInfo'>
          <img src ={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          } alt =""/>
          <span>just now</span>
      </div>
      <div className = 'messageContent'>
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}

export default DirectMessageMessage;
