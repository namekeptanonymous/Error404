import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function AdminPage() {
  const [user] = useAuthState(auth);
  const [users] = useCollection(collection(db, "users"));
  const [admins] = useCollection(collection(db, "admins"));

  const addUserToAdmins = async (userDoc) => {
    const adminRef = doc(db, "admins", userDoc.id);
    await setDoc(adminRef, userDoc.data());
  };

  const removeUserFromAdmins = async (adminEmail, adminID) => {
    if (adminEmail !== user?.email) { // Prevent the logged in user from removing themselves
      const adminRef = doc(db, "admins", adminID);
      await deleteDoc(adminRef);
    }
  };

  return (
    <div className="bg-discord_channelsBg h-screen text-white">
      <h1 className="text-2xl font-bold p-4">Admin Page</h1>
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold">Users</h2>
        {users?.docs.map((doc) => (
          <div key={doc.id} className="flex items-center space-x-2">
            <p>{doc.data().name}</p>
            <button className="bg-green-500 px-2 py-1 rounded" onClick={() => addUserToAdmins(doc)}>Add to Admins</button>
          </div>
        ))}
      </div>
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold">Admins</h2>
        {admins?.docs.map((doc) => {
            const {email, name, photoURL, uid} = doc.data();
            return (
                <div key={doc.id} id={doc.id} className="flex items-center space-x-2">
                <p>{name}</p>
                {(email !== user?.email) &&
                  <button className="bg-red-500 px-2 py-1 rounded" onClick={() => removeUserFromAdmins(email,uid)}>Remove from Admins</button>
                }
            </div>
            );
        })}
      </div>
    </div>
  );
}

export default AdminPage;
