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
      <button onClick={addFriend} className="ml-auto p-1 rounded-sm cursor-pointer group-hover:bg-discord_deleteIcon group-hover:text-white opacity-0 group-hover:opacity-100">Add Friend</button>
    </div>
  );
};

export default FriendsList;