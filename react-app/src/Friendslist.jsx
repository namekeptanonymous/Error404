import React from 'react';
import styles from './Friendslist.module.css'; // Adjust the import path as needed

// Dummy data for demonstration
const friends = [
  { name: "John Doe", status: "online", profilePic: "../assets/placeholder_profile_picture.png" },
  { name: "Jane Smith", status: "offline", profilePic: "../assets/placeholder_profile_picture.png" },
];

const pendingRequests = [
  { name: "Alice Johnson", profilePic: "../assets/placeholder_profile_picture.png" },
  { name: "Bob Brown", profilePic: "../assets/placeholder_profile_picture.png" },
];

const activeNow = [
  { name: "Charlie Davis", profilePic: "../assets/placeholder_profile_picture.png" },
];

const FriendsList = () => {
  return (
    <div className={styles['sidebar-friends']}>
      {/* Pending Requests Section */}
      <div className={styles['pending-requests']}>
        <div className={styles['friends-section-header']}>PENDING — {pendingRequests.length}</div>
        {pendingRequests.map((request, index) => (
          <div key={index} className={styles['friend-item']}>
            <img src={request.profilePic} alt={`${request.name} profile`} className={styles['friend-profile-pic']} />
            <span className={styles['friend-name']}>{request.name}</span>
          </div>
        ))}
      </div>
      
      {/* Friends List Section */}
      <div className={styles['friends-list']}>
        <div className={styles['friends-section-header']}>DIRECT MESSAGES</div>
        {friends.map((friend, index) => (
          <div key={index} className={styles['friend-item']}>
            <img src={friend.profilePic} alt={`${friend.name} profile`} className={styles['friend-profile-pic']} />
            <span className={styles['friend-name']}>{friend.name}</span>
            <span className={`${styles['friend-status']} ${styles[`status-${friend.status}`]}`}></span>
          </div>
        ))}
      </div>
      
      {/* Active Now Section */}
      <div className={styles['active-now']}>
        <div className={styles['friends-section-header']}>ACTIVE NOW</div>
        {activeNow.map((active, index) => (
          <div key={index} className={styles['friend-item']}>
            <img src={active.profilePic} alt={`${active.name} profile`} className={styles['friend-profile-pic']} />
            <span className={styles['friend-name']}>{active.name}</span>
            {/* Assuming active now means online status */}
            <span className={`${styles['friend-status']} ${styles['status-online']}`}></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
