import React from 'react'
import { ChatHeader } from './ChatHeader'
import { Message } from './Message' 
import './Chat.css'


export const Chat = () => {
  return (
    <div className="chat">
        <ChatHeader />

        <div className="chatmessages">
        <Message />

        </div>
    
    
        <div className="chatinput">
            <img src="../../Project Files/images/files.svg" alt="Files" />
            <form>
                <input placeholder={'Message #TestChannel'} />
                <button className='chatinputbutton' type='submit'> Send Message</button>
            </form>

            <div className="chatinputicons">
                <img src="../../Project Files/images/emoji.svg" alt="Emoji" />
            </div>
        </div>
    </div>
    
  )
}
