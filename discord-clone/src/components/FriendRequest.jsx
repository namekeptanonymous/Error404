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
