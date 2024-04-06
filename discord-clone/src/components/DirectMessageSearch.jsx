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
  const [currUser] = useAuthState(auth);

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

  return (
    <div className="search">
      <div className="searchForm">
          <input type="text" placeholder="Find a user" onKeyDown ={handleKey} onChange={e => setUsername(e.target.value)} value={username}/>
      </div>
      
      {err && <span> User not found! </span>}
      {user && <div className = "userChat">
          <img src={user?.photoURL} alt="User Logo" />

          <div className = "userChatInfo">
            <span>{user?.name}</span>
          </div>

      </div> }

    </div>
      
          
       
  );
}

export default DirectMessageSearch;
