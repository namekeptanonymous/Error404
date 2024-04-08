import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const FriendRequests = ({ userId }) => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const requestsRef = collection(db, "users", userId, "friendRequests");

        const unsubscribe = onSnapshot(requestsRef, (snapshot) => {
            const requestData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRequests(requestData);
        });

        return () => unsubscribe();
    }, [userId]);

    // Here you would implement methods to accept or decline requests

    return (
        <div>
            {requests.map(request => (
                <div key={request.id}>
                    <span>{request.name}</span>
                    {/* Add buttons for accepting or declining the request */}
                </div>
            ))}
        </div>
    );
};

export default FriendRequests;
