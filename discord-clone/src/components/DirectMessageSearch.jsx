import React, {useState} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react'; //
import chatterboxImage from '../images/chatterbox.png';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom'; //
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
} from "firebase/firestore";

const DirectMessageSearch = () => {
  const [currentUser] = useAuthState(auth);

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("name", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }

  };

  const handleKey = e => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const chatRef = doc(db, "chats", combinedId);
    const userChatRef = doc(db, "userChats", currentUser.uid);
    const recipientChatRef = doc(db, "userChats", user.uid);

    // Create a chat if it doesn't exist
    await setDoc(chatRef, { messages: [] }, { merge: true });

    // Update current user's chat list
    await updateDoc(userChatRef, {
      [`${combinedId}.userInfo`]: {
        uid: user.uid,
        name: user.name, // ensure this is the correct field name
        photoURL: user.photoURL,
      },
      [`${combinedId}.date`]: serverTimestamp(),
    }, { merge: true });

    // Update the other user's chat list
    await updateDoc(recipientChatRef, {
      [`${combinedId}.userInfo`]: {
        uid: currentUser.uid,
        name: currentUser.name, // ensure this is the correct field name
        photoURL: currentUser.photoURL,
      },
      [`${combinedId}.date`]: serverTimestamp(),
    }, { merge: true });
    } catch (err) {
    setErr(true);};

    setUser(null);
    setUsername("");
    

  }

  return (
    <div className="search">
      <div className="searchForm">
          <input type="text" placeholder="Find a user" onKeyDown ={handleKey} onChange={e => setUsername(e.target.value)} value={username}/>
      </div>
      
      {err && <span></span>} {/* user not found*/}
      {user && <div className = "userChat" onClick={handleSelect}>
          <img src={user?.photoURL} alt="User Logo" />

          <div className = "userChatInfo">
            <span>{user?.name}</span>
          </div>

      </div> }

    </div>
      
          
       
  );
}

export default DirectMessageSearch;
