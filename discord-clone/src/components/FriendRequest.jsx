import React from 'react';
import { auth, db } from '../firebase';
import { v4 as uuid } from "uuid";
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
// Static list for UI mockup
const mockPendingRequests = [
  { id: '3', name: 'Emily Johnson', avatar: 'path/to/avatar3.png' },
  // Add more mock requests data if needed
];

const mockSuggestedFriends = [
  { id: '4', name: 'Michael Brown', avatar: 'path/to/avatar4.png' },
  // Add more mock suggested friends data if needed
];

const buttonStyle = {
    color: 'white',
    backgroundColor: 'transparent',
    border: '1px solid white',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
    margin: '5px',
  };

const FriendRequests = () => {
  const [currentUser] = useAuthState(auth);

  const acceptFriendRequest = (requestId) => {
    console.log(`Accepting friend request with ID: ${requestId}`);
    // Accept friend request implementation
    updateDoc(doc(db,"friends",requestId),{
      status: "friend",
    });
  };

  const declineFriendRequest = (requestId) => {
    console.log(`Declining friend request with ID: ${requestId}`);
    // Decline friend request implementation
    deleteDoc(doc(db,"friends",'requestId'));
  };

  const sendFriendRequest = (friendId) => {
    // Send friend request implementation
      console.log(`Sending friend request to ID: ${friendId}`);

      setDoc(doc(db,"friends",currentUser?.uid),{
        requestid:uuid(),
        user1: currentUser?.uid,
        user2: friendId,
        status: "pending",
      });

  };

  return (
    <div>
      <div>
        <h2>Pending Friend Requests</h2>
        {mockPendingRequests.map(request => (
          <div key={request.id} className="request-item">
            <img src={request.avatar} alt={`${request.name}'s avatar`} style={{ marginRight: '10px' }} />
            <span>{request.name}</span>
            <button style={buttonStyle} onClick={() => acceptFriendRequest(request.id)}>Accept</button>
            <button style={buttonStyle} onClick={() => declineFriendRequest(request.id)}>Decline</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Add Friend</h2>
        {mockSuggestedFriends.map(friend => (
          <div key={friend.id} className="suggested-friend-item">
            <span>{friend.name}</span>
            <button style={buttonStyle} onClick={() => sendFriendRequest(friend.id)}>Add Friend</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRequests;
