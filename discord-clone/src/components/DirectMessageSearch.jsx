import React, { useState, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
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
import { ChatContext } from "../context/ChatContext";

const DirectMessageSearch = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const [currentUser] = useAuthState(auth);

  const { dispatch } = useContext(ChatContext);

  const handleSearch = async () => {
    setErr(false);
    if (username.trim() === "") {
      setErr(true);
      return;
    }

    setUser(null);

    const q = query(collection(db, "users"), where("name", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((docSnapshot) => {
          if (docSnapshot.data().uid === currentUser.uid) {
            setErr(true);
          } else {
            setUser(docSnapshot.data());
          }
        });
      } else {
        setErr(true);
      }
    } catch (error) {
      console.error("Search error: ", error);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    if (!user || currentUser.uid === user.uid) {
      setErr(true);
      return;
    }

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const chatDocRef = doc(db, "chats", combinedId);
      const chatDoc = await getDoc(chatDocRef);

      if (!chatDoc.exists()) {
        await setDoc(chatDocRef, { messages: [] });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId]: {
            userInfo: {
              uid: user.uid,
              name: user.name,
              photoURL: user.photoURL,
            },
            date: serverTimestamp(),
          },
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId]: {
            userInfo: {
              uid: currentUser.uid,
              name: currentUser.name,
              photoURL: currentUser.photoURL,
            },
            date: serverTimestamp(),
          },
        });
      }

      dispatch({
        type: "CHANGE_USER",
        payload: {
          uid: user.uid,
          name: user.name,
          photoURL: user.photoURL,
        },
      });

      // Reset state after selecting the user
      setUser(null);
      setUsername("");
    } catch (error) {
      console.error("Error creating or selecting chat: ", error);
      setErr(true);
    }
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span></span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user?.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user?.name}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default DirectMessageSearch;