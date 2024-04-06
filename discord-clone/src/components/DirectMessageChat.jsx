import React from 'react';
import ServerIcon from './ServerIcon';
import DirectMessageMessages from './DirectMessageMessages';
import DirectMessageInput from './DirectMessageInput';
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";

const DirectMessageChat = () => {
  const {data} = useContext(ChatContext);

  return (
    <div className = "chat">
      <div className = "chatInfo">
        <span>{data.user?.name}</span>
        
      </div>
      <DirectMessageMessages/>
      <DirectMessageInput/>
    </div>
  )
}

export default DirectMessageChat;
