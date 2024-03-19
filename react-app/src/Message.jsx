import React from 'react'
import './message.css'

export const Message = () => {
  return (
    <div className="message">
        <img src="" alt="Avatar" />
        <div className="messageinfo">
            <h4> Chase8255
                <span className="timestamp">Timestamp</span>
            </h4>
            
            <p>This is a message</p>
        </div>
    </div>
  )
}
