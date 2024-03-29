import { TrashIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

function Message({id, message, timestamp, name, email, photoURL}){
  const[user]=useAuthState(auth);


  return (
    <div className="flex items-center p-1 p1-5 my-5 mr-2 
    hover:bg-discord_messageBg group">
      <img src ={photoURL} alt="" className="h-10 rounded-full
      cursor-pointer mr-3 hover:shadow-2x1"/>
      <div className="flex flex-col">
        <h4 className="flex items-center space-x-2 font-medium">
          <span className="hover:underline text-white text-sm
          cursor-pointer">{name}</span>
            <span className="text-discord_messageTimestamp text-xs">
              {moment(timestamp?.toDate()).format("111")}</span>
        </h4><p className="text-sm text-discord_message">
          {message}
        </p>
      </div>
      {user?.email=== email &&(
        <div className="hover:bg-discord_deleteIcon p-1 m1-auto rounded-sm 
        text-discord_deleteIcon hover:text-white cursor-pointer">
          <TrashIcon className="h-5 group-hover:inline"/>
        </div>
      )}

    </div>
  )
}

export default Message
