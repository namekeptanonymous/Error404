import React from 'react';
import ServerIcon from './ServerIcon';
import DirectMessageMessages from './DirectMessageMessages';
import DirectMessageInput from './DirectMessageInput';

const DirectMessageChat = () => {
  return (
    <div className = "chat">
      <div className = "chatInfo">
        <span>Ariq</span>
        
      </div>
      <DirectMessageMessages/>
      <DirectMessageInput/>
    </div>
  )
}

export default DirectMessageChat;
