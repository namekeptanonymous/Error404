import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import ServerIcon from './ServerIcon';
import {
  ChevronDownIcon,
  PlusIcon,
  CogIcon,
  ShieldExclamationIcon,
  UserGroupIcon
} from "@heroicons/react/24/solid";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import Channel from './Channel.jsx'
import Chat from './Chat.jsx'
import Modal from './Modal.jsx';
import FriendsList from './Friendslist.jsx';
import FriendRequests from './FriendRequest.jsx';

function Home() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [showFriendsModal, setShowFriendsModal] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    auth.signOut()
      .then(() => navigate("/"))
      .catch((error) => console.error("Logout error:", error));
  };

  const [users] = useCollection(collection(db, "users"));
  const [channels] = useCollection(collection(db, "channels"));
  const [admins] = useCollection(collection(db, "admins"));
  const [adminEmailExists, setAdminEmailExists] = useState(false);

  const handleAddChannel = () => {
    const channelName = prompt("Enter a new channel name");
    if (channelName) {
      const channelRef = doc(db, "channels", channelName);
      setDoc(channelRef, { channelName });
    }
  };

  const handleClick = () => navigate('/direct-message');

  const checkAdminEmail = async (emailToFind) => {
    const q = query(collection(db, "admins"), where("email", "==", emailToFind));
    const querySnapshot = await getDocs(q);
    setAdminEmailExists(!querySnapshot.empty);
  };

  useEffect(() => {
    if (user) {
      checkAdminEmail(user?.email);
    }
  }, [user]);

  return (
    <>
      <div className="flex h-screen">
        {/* ... rest of the sidebar code */}
        
        {/* Right section of the screen */}
        <div className="bg-discord_channelsBg flex flex-col min-w-max">
          {/* ... channels and other content */}
          
          {/* User section at the bottom */}
          <div className = "bg-discord_userSectionBg p-2 flex justify-between items-center space-x-8">
            <div className = "flex items-center space-x-1"> 
              <img src={user?.photoURL} alt="" className="h-10 rounded-full" onClick={handleLogout} referrerPolicy="no-referrer"/> 
              <h4 className = "text-white text-xs font-medium">
                {user?.displayName}
                <span className="text-discord_userSectionText block">#{user?.uid.substring(0,4)}</span>
              </h4>
            </div>
        
            <div className = "text-gray-400 flex items-center">
              {adminEmailExists &&
                <div className = "hover:bg-discord_iconHoverBg p-2 rounded-md" onClick={() => navigate('/admin-page')}>
                  <ShieldExclamationIcon className="icon"/>
                </div>
              }
              <div className="hover:bg-discord_iconHoverBg p-2 rounded-md" onClick={() => setShowFriendsModal(true)}>
                <UserGroupIcon className="h-5 icon" />
              </div>
              <div className = "hover:bg-discord_iconHoverBg p-2 rounded-md" onClick={handleLogout}>
                <CogIcon className = "h-5 icon"/>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chat component */}
        <div className="bg-discord_chatBg flex-grow">
          <Chat />
        </div>
      </div>
      
      {/* Modal for Friends List and Friend Requests */}
      <Modal isOpen={showFriendsModal} close={() => setShowFriendsModal(false)}>
        <FriendsList userId={user?.uid} />
        <FriendRequests userId={user?.uid} />
      </Modal>
    </>
  );
}

export default Home;
