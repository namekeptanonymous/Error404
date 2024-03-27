import React from 'react'

function Message({id, message, timestamp, name, email, photoURL}) {
  return (
    <div>
      {message}
    </div>
  )
}

export default Message
