import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import ServerIcon from './ServerIcon';
import { ChevronDownIcon, PlusIcon, CogIcon, ShieldExclamationIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import Channel from './Channel.jsx';
import Chat from './Chat.jsx';
import Modal from './Modal.jsx';
import FriendsList from './Friendslist.jsx';
import FriendRequests from './FriendRequest.jsx';

function Home() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [showFriendsModal, setShowFriendsModal] = useState(false);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const handleLogout = () => {
    auth.signOut().then(() => navigate("/")).catch((error) => console.error("Logout error:", error));
  };

  const [users] = useCollection(collection(db, "users"));
  const [channels] = useCollection(collection(db, "channels"));
  const [admins] = useCollection(collection(db, "admins"));
  const [adminEmailExists, setAdminEmailExists] = useState(false);

  const handleAddChannel = () => {
    const channelName = prompt("Enter a new channel name");
    if (channelName) setDoc(doc(db, "channels", channelName), { channelName });
  };

  const handleClick = () => navigate('/direct-message');

  const checkAdminEmail = async (emailToFind) => {
    const q = query(collection(db, "admins"), where("email", "==", emailToFind));
    setAdminEmailExists(!(await getDocs(q)).empty);
  };

  useEffect(() => {
    if (user) checkAdminEmail(user.email);
  }, [user]);

  return (
    <div className="flex h-screen">
      <div className="flex flex-col space-y-3 bg-discord_serversBg p-3 min-w-max">
        <div className="server-default hover:bg-discord_purple" onClick={handleClick}>
          <img src="../src/images/chatterbox.png" alt="" className="h-5"/>
        </div>
        <hr className="border-gray-700 border w-8 mx-auto" />
        {users?.docs.map((doc) => (
          <div key={doc.id} id={doc.id} onClick={handleClick}>
            <ServerIcon image={doc.data().photoURL} />
          </div>
        ))}
      </div>
      <div className="bg-discord_channelsBg flex flex-col min-w-max">
        <h2 className="flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4 hover:bg-discord_serverNameHoverBg cursor-pointer">
          Main Server<ChevronDownIcon className="h-5 ml-2"/>
        </h2>
        <div className="text-discord_channel flex-grow overflow-y-scroll scrollbar-hide">
          <div className="flex items-center p-2 mb-2">
            <ChevronDownIcon className="h-3 mr-2"/>
            <h4 className="font-semibold">Channels</h4>
            <PlusIcon className="h-6 ml-auto cursor-pointer hover:text-white" onClick={handleAddChannel}/>
          </div>
          <div className="flex flex-col space-y-2 px-2 mb-4">
            {channels?.docs.map((doc) => (
              <Channel key={doc.id} id={doc.id} channelName={doc.data().channelName} />
            ))}
          </div>
        </div>
        <div className="bg-discord_userSectionBg p-2 flex justify-between items-center space-x-8">
  <div className="flex items-center space-x-1">
    <img src={user?.photoURL} alt="" className="h-10 rounded-full" onClick={handleLogout} referrerPolicy="no-referrer"/>
    <h4 className="text-white text-xs font-medium">
      {user?.displayName}
      <span className="text-discord_userSectionText block">#{user?.uid.substring(0,4)}</span>
    </h4>
  </div>
  <div className="text-gray-400 flex items-center">
    {adminEmailExists &&
      <div className="hover:bg-discord_iconHoverBg p-2 rounded-md" onClick={() => navigate('/admin-page')}>
        <ShieldExclamationIcon className="icon"/>
      </div>
    }
    <div className="hover:bg-discord_iconHoverBg p-2 rounded-md" onClick={() => {
      console.log("Opening friends modal"); // This will log to the console when the icon is clicked
      setShowFriendsModal(true);
    }}>
      <UserGroupIcon className="h-5 icon" />
    </div>
    <div className="hover:bg-discord_iconHoverBg p-2 rounded-md" onClick={handleLogout}>
      <CogIcon className="h-5 icon"/>
    </div>
  </div>
</div>

      </div>
      <div className="bg-discord_chatBg flex-grow">
        <Chat />
      </div>
      <Modal isOpen={showFriendsModal} close={() => setShowFriendsModal(false)}>
        <FriendsList userId={user?.uid} />
        <FriendRequests userId={user?.uid} />
      </Modal>
    </div>
  );
}

export default Home;
