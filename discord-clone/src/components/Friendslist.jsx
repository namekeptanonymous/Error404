import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // Ensure this import points to your firebase configuration file
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const FriendsList = ({ userId }) => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const friendsRef = collection(db, "users", userId, "friends");
        const q = query(friendsRef, where("isFriend", "==", true));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const friendsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setFriends(friendsData);
        });

        return () => unsubscribe();
    }, [userId]);

    return (
        <div>
            {friends.map(friend => (
                <div key={friend.id}>
                    <img src={friend.avatar} alt={`${friend.name}'s avatar`} />
                    <span>{friend.name}</span>
                    <span>{friend.isOnline ? 'Online' : 'Offline'}</span>
                </div>
            ))}
        </div>
    );
};

export default FriendsList;
