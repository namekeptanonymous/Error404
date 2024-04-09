import React from 'react';
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import DirectMessageMessages from './DirectMessageMessages';
import DirectMessageInput from './DirectMessageInput';

const DirectMessageChat = () => {
  const {data} = useContext(ChatContext);

  if (!data.user) {
    // If no user is selected, you can return null or a placeholder div
    return null;
    // Or for a placeholder, you could return something like this:
    // return <div className="chat">Please select a user to start chatting.</div>;
  }

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user.name}</span>
      </div>
      <DirectMessageMessages />
      <DirectMessageInput />
    </div>
  );
}

export default DirectMessageChat;