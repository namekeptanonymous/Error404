import React from 'react';

// Static list of friends for UI mockup
const mockFriends = [
  { id: '1', name: 'John Doe', avatar: 'path/to/avatar1.png', isOnline: true },
  { id: '2', name: 'Jane Smith', avatar: 'path/to/avatar2.png', isOnline: false },
  // Add more mock friends data if needed
];

// Static list of pending friend requests for UI mockup
const mockFriendRequests = [
  { id: '3', name: 'Emily Johnson', avatar: 'path/to/avatar3.png' },
  // Add more mock friend requests data if needed
];

const FriendsList = () => {
  const removeFriend = (friendId) => {
    console.log(`Remove friend with ID: ${friendId}`);
    // Remove friend implementation
  };

  const addFriend = () => {
    console.log("Add friend logic here");
    // Add friend implementation
  };

  return (
    <div>
      <div>
        <h2>Online</h2>
        {mockFriends.filter(friend => friend.isOnline).map(friend => (
          <div key={friend.id}>
            <img src={friend.avatar} alt={`${friend.name}'s avatar`} />
            <span>{friend.name}</span>
            <button onClick={() => removeFriend(friend.id)}>Remove</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Offline</h2>
        {mockFriends.filter(friend => !friend.isOnline).map(friend => (
          <div key={friend.id}>
            <img src={friend.avatar} alt={`${friend.name}'s avatar`} />
            <span>{friend.name}</span>
            <button onClick={() => removeFriend(friend.id)}>Remove</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Pending</h2>
        {mockFriendRequests.map(request => (
          <div key={request.id}>
            <img src={request.avatar} alt={`${request.name}'s avatar`} />
            <span>{request.name}</span>
            {/* Add buttons for accepting or declining the friend request */}
          </div>
        ))}
      </div>
      <button onClick={addFriend}>Add Friend</button>
    </div>
  );
};

export default FriendsList;
