import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectChannelId } from "../features/channelSlice";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import moment from 'moment';
import emojiRegex from 'emoji-regex';
import { TrashIcon } from '@heroicons/react/24/solid';

function Message({ id, message, timestamp, name, email, photoURL }) {
  const channelId = useSelector(selectChannelId);
  const [user] = useAuthState(auth);

  const [admins] = useCollection(collection(db, "channels", channelId, "admins"));
  const [adminEmailExists, setAdminEmailExists] = useState(false); // State to hold whether the admin email exists

  // Function to check if a certain email exists in the admins collection
  const checkAdminEmail = async (emailToFind) => {
    const q = query(
      collection(db, "channels",  channelId || 'default', "admins"),
      where("email", "==", emailToFind)
    );

    const querySnapshot = await getDocs(q);

    setAdminEmailExists(!querySnapshot.empty);
  };

  useEffect(() => {
    if (user) {
      checkAdminEmail(user?.email);
    }
  }, []);

  // Function to delete a message
  const deleteMessage = async () => {
    // Only allow message deletion if channelId and message ID are present
    if (channelId && id) {
      const messageRef = doc(db, 'channels', channelId, 'messages', id);
      await deleteDoc(messageRef);
    }
  };

  const isEmoji = str => {
    const matches = str.match(emojiRegex());
    return matches && matches.length === 1 && matches[0] === str;
  };

  const textSize = isEmoji(message) ? 'text-3xl pt-1' : 'text-sm';

  return (
    <div className="flex items-center p-1 pl-5 my-5 mr-2 hover:bg-discord_messageBg group">
      <img src={photoURL} alt="" className="h-10 rounded-full cursor-pointer mr-3 hover:shadow-2xl" referrerPolicy="no-referrer"/>
      <div className="flex flex-col">
        <h4 className="flex items-center space-x-2 font-medium">
          <span className="hover:underline text-white text-sm cursor-pointer">{name}</span>
          <span className="text-discord_messageTimestamp text-xs">
            {moment(timestamp?.toDate().getTime()).format("lll")}
          </span>
        </h4>
        <p className={`${textSize} text-discord_message`}>{message}</p>
      </div>
      {(user?.email === email || adminEmailExists) && (
        <div className="ml-auto p-1 rounded-sm cursor-pointer group-hover:bg-discord_deleteIcon hover:bg-discord_deleteIconBg hover:text-white" onClick={deleteMessage}>
          <TrashIcon className="h-5 opacity-0 group-hover:opacity-100" />
        </div>
      )}
    </div>
  );
}

export default Message;