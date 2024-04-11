import React from 'react';

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
  const acceptFriendRequest = (requestId) => {
    console.log(`Accepting friend request with ID: ${requestId}`);
    // Accept friend request implementation
  };

  const declineFriendRequest = (requestId) => {
    console.log(`Declining friend request with ID: ${requestId}`);
    // Decline friend request implementation
  };

  const sendFriendRequest = (friendId) => {
    console.log(`Sending friend request to ID: ${friendId}`);
    // Send friend request implementation
  };

  return (
    <div className="space-y-2 text-white">
      <div>
        <span className="text-discord_channel uppercase text-sm font-bold">Pending Friend Requests</span>
        {mockPendingRequests.map(request => (
          <div key={request.id} className="flex items-center justify-between font-medium hover:bg-discord_channelHoverBg rounded-md p-1 group">
            <span className="flex items-center">
              <img src={request.avatar} className="h-10 w-10 rounded-full cursor-pointer mr-3 hover:shadow-2xl" referrerPolicy="no-referrer"/>
              {request.name}
            </span>
            <div className="ml-auto p-1 rounded-sm cursor-pointer group-hover:bg-discord_deleteIcon group-hover:text-white opacity-0 group-hover:opacity-100">
              <button onClick={() => acceptFriendRequest(request.id)}>Accept</button>
              <button onClick={() => declineFriendRequest(request.id)}>Decline</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <span className="text-discord_channel uppercase text-sm font-bold">Add Friend</span>
        {mockSuggestedFriends.map(friend => (
          <div key={friend.id} className="flex items-center justify-between font-medium hover:bg-discord_channelHoverBg rounded-md p-1 group">
            <span className="flex items-center">
              <img src={friend.avatar} className="h-10 rounded-full cursor-pointer mr-3 hover:shadow-2xl" referrerPolicy="no-referrer"/>
              {friend.name}
            </span>
            <button onClick={() => sendFriendRequest(friend.id)} className="ml-auto p-1 rounded-sm cursor-pointer group-hover:bg-discord_deleteIcon group-hover:text-white opacity-0 group-hover:opacity-100">Add Friend</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRequests;
