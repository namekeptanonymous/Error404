import React from 'react';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  query,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

const mockFriends = [
  { id: '1', name: 'John Doe', avatar: 'path/to/avatar1.png', isOnline: true },
  { id: '2', name: 'Jane Smith', avatar: 'path/to/avatar2.png', isOnline: false }
];

const mockFriendRequests = [
  { id: '3', name: 'Emily Johnson', avatar: 'path/to/avatar3.png' }
];

const FriendsList = () => {
  const [currentUser] = useAuthState(auth);

  const removeFriend = (friendId) => {
    console.log(`Remove friend with ID: ${friendId}`);
    deleteDoc(doc(db,"friends",currentUser?.uid+friendId));
  };

  const addFriend = () => {
    const userid = prompt("Enter A UserID");
    const q = query(doc(db,"users",userid));
    if(!getDoc(q).empty){ //Checks if inputted username exists in DB
      const q2 = query(doc(db,"friends",currentUser?.uid+userid));
      if(getDoc(q2).empty){ //Checking if friend request is already sent.
          setDoc(doc(db,"friends",currentUser?.uid+userid),{
            user1: currentUser?.uid,
            user2: userid,
            status: "pending",
          });

      }else{
        console.log("Friend Request already sent")
      };
    }else{
      console.log("User does not exist")
    };
  }
  
  return (
    <div className="space-y-2 text-white">
      <div>
        <span className="text-discord_channel uppercase text-sm font-bold">Online</span>
        {mockFriends.filter(friend => friend.isOnline).map(friend => (
          <div key={friend.id} className="flex items-center justify-between font-medium hover:bg-discord_channelHoverBg rounded-md p-1 group">
            <span className="flex items-center">
              <img src={friend.avatar} className="h-10 w-10 rounded-full cursor-pointer mr-3 hover:shadow-2xl" referrerPolicy="no-referrer"/>
              {friend.name}
            </span>
            <button onClick={() => removeFriend(friend.id)} className="ml-auto p-1 rounded-sm cursor-pointer group-hover:bg-discord_deleteIcon group-hover:text-white opacity-0 group-hover:opacity-100">Remove</button>
          </div>
        ))}
      </div>
      <div>
        <span className="text-discord_channel uppercase text-sm font-bold">Offline</span>
        {mockFriends.filter(friend => !friend.isOnline).map(friend => (
          <div key={friend.id} className="flex items-center justify-between font-medium hover:bg-discord_channelHoverBg rounded-md p-1 group">
            <span className="flex items-center">
              <img src={friend.avatar} className="h-10 rounded-full cursor-pointer mr-3 hover:shadow-2xl" referrerPolicy="no-referrer"/>
              {friend.name}
            </span>
            <button onClick={() => removeFriend(friend.id)} className="ml-auto p-1 rounded-sm cursor-pointer group-hover:bg-discord_deleteIcon group-hover:text-white opacity-0 group-hover:opacity-100">Remove</button>
          </div>
        ))}
      </div>
      <button onClick={addFriend} className="ml-auto p-1 rounded-sm cursor-pointer bg-discord_green text-white opacity-100">Add Friend</button>
    </div>
  );
};

export default FriendsList;