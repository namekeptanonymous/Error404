import React, { useState, createContext,
  useContext, } from 'react';
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

    // Start by clearing the previous user search result
    setUser(null);

    const q = query(collection(db, "users"), where("name", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((docSnapshot) => {
          if (docSnapshot.data().uid === currentUser.uid) {
            // If the found user is the current user, set an error
            setErr(true);
          } else {
            // Otherwise, set the user state to the found user data
            setUser(docSnapshot.data());
          }
        });
      } else {
        // If no user found, set an error
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
        // If chat doesn't exist, create a new one
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

      // Dispatch action to select this user and chat
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

  /*
  const [currentUser] = useAuthState(auth);

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    setErr(false);
    if (username.trim() === "") {
      setErr(true);
      return;
    }

    const q = query(collection(db, "users"), where("name", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      let foundUser = false;
      querySnapshot.forEach((doc) => {
        if (doc.data().uid !== currentUser.uid) { // Checks if the found user is not the current user
          setUser(doc.data());
          foundUser = true;
        }
      });
      if (!foundUser) {
        setUser(null);
        setErr(true);
      }
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = e => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  const handleSelect = async () => {
    if (user && currentUser.uid === user.uid) {
      setErr(true);
      setUser(null);
      setUsername("");
      return; // Exit the function if trying to chat with oneself
    }

    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }

      // After creating the chat, you might want to dispatch an action to your context to set this chat as the current chat
      // dispatch({ type: "CHANGE_USER", payload: user });
      
      // Clear the selected user
      setUser(null);
      setUsername("");
    } catch (err) {
      console.error("Error creating chat: ", err);
    }
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
      </div>
      
      {err && <span>User not found or invalid operation</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user?.photoURL} alt="User Logo" />
          <div className="userChatInfo">
            <span>{user?.name}</span>
          </div>
        </div>
      )}
    </div>
  );

  */


export default DirectMessageSearch;