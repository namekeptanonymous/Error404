import React from 'react';
import { useEffect } from 'react'; //
import chatterboxImage from '../images/chatterbox.png';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
//import { Navigate } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom'; //
import ServerIcon from './ServerIcon';
import {ChevronDownIcon,PlusIcon, MicrophoneIcon, PhoneIcon, CogIcon} from "@heroicons/react/24/solid";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc, setDoc } from 'firebase/firestore';
import Channel from './Channel.jsx'
import Chat from './Chat.jsx'

function Home() {
  const navigate = useNavigate(); //
  const [user] = useAuthState(auth);

  //
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  //

  // Check if user is not authenticated and navigate to the root ("/") if needed
  //if (!user) { //
    //return <Navigate to="/" replace />; //
  //} //

  //
  const handleLogout = () => {
    auth.signOut()
      .then(() => navigate("/")) // Redirect after sign out
      .catch((error) => console.error("Logout error:", error)); // Handle errors
  };
  //

  const[channels]=useCollection(collection(db, "channels"));

  const handleAddChannel = () => {
    const channelName = prompt("Enter a new channel name");
    if (channelName) {
      // Use Firestore's doc() and setDoc() methods
      const channelRef = doc(db, "channels", channelName);
      setDoc(channelRef, { channelName });
    }
  };

  function handleClick() {
    navigate('/direct-message'); // Use the path to your DirectMessage component as defined in your Routes setup
  }

  return (
    <>
      <div className="flex h-screen">
        <div className="flex flex-col space-y-3 bg-discord_serversBg p-3 min-w-max">
          <div className="server-default hover:bg-discord_purple" onClick={handleClick} >
            <img src="../src/images/chatterbox.png" alt="" className="h-5"/>
          </div>
          <hr className="border-gray-700 border w-8 mx-auto" />
          <ServerIcon image="../src/images/chatterbox.png" />
          {/* <div className="server-default hover:bg-discord_green group">
            <PlusIcon className="text-discord_green h-7 group-hover:text-white"/>
          </div> */}
        </div>
          <div className="bg-discord_channelsBg flex flex-col min-w-max"> {/* Assuming you wanted to use a background class here */}
            <h2 className= "flex text-white font-bold text-sm items-center justify-between border-b  border-gray-800 p-4 hover:bg-discord_serverNameHoverBg cursor-pointer">Official Server...<ChevronDownIcon className=" h-5 ml-2"/>
            </h2>
            <div className= "text-discord_channel flex-grow overflow-y-scroll scrollbar-hide">
              <div className="flex items-center p-2 mb-2">
                <ChevronDownIcon className = "h-3 mr-2"/>
                <h4 className="font-semibold">Channels</h4>
                <PlusIcon className="h-6 ml-auto cursor-pointer hover:text-white" onClick={handleAddChannel}/>
              </div>
              <div className ="flex flex-col space-y-2 px-2 mb-4">
                {channels?.docs.map((doc)=>(
                  <Channel
                    key={doc.id}
                    id={doc.id}
                    channelName={doc.data().channelName} />
                ))}
                
              </div>
            </div>
            
            <div className = "bg-discord_userSectionBg p-2 flex justify-between items-center space-x-8">
              <div className = "flex items-center space-x-1"> 
              <img src={user?.photoURL} alt="" className="h-10 rounded-full" onClick={handleLogout} referrerPolicy="no-referrer"/> 
              <h4 className = "text-white text-xs font-medium">
                {user?.displayName}
                <span className="text-discord_userSectionText block">#{user?.uid.substring(0,4)}</span>
              </h4>
              </div>
            
            <div className = "text-gray-400 flex items-center"> 
            
              <div className = "hover:bg-discord_iconHoverBg p-2 rounded-md">
                <CogIcon className = "h-5 icon"/>
              </div>

            </div>
          </div>
        </div>
          
        <div className="bg-discord_chatBg flex-grow">
          <Chat />
        </div>
                   
      </div>
    </>
  );
}

export default Home;