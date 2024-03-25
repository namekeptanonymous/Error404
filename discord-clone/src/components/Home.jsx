import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { Navigate } from 'react-router-dom';
import ServerIcon from './ServerIcon';
import {ChevronDownIcon,PlusIcon} from "@heroicons/react/24/outline";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc, setDoc } from 'firebase/firestore';
import Channel from './Channel.jsx'

function Home() {
  const [user] = useAuthState(auth);

  // Check if user is not authenticated and navigate to the root ("/") if needed
  if (!user) {
    return <Navigate to="/" replace />;
  }

  const[channels]=useCollection(collection(db, "channels"));

  const handleAddChannel = () => {
    const channelName = prompt("Enter a new channel name");
    if (channelName) {
      // Use Firestore's doc() and setDoc() methods
      const channelRef = doc(db, "channels", channelName);
      setDoc(channelRef, { channelName });
    }
  };
  return (
    <>
      <div className="flex h-screen">
        <div className="flex flex-col space-y-3 bg-discord_serversBg p-3 min-w-max">
          <div className="server-default hover:bg-discord_purple">
            <img src="../src/images/chatterbox.png" alt="" className="h-5" />
          </div>
          <hr className="border-gray-700 border w-8 mx-auto" />
          {/* Placeholder for ServerIcon components */}
          <ServerIcon image="../src/images/chatterbox.png" />
          <ServerIcon image="../src/images/chatterbox.png" />
          <ServerIcon image="../src/images/chatterbox.png" />
          <ServerIcon image="../src/images/chatterbox.png" />
          <div className="server-default hover:bg-discord_green group">
            <PlusIcon className="text-discord_green h-7 group-hover:text-white"/>
          </div>
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
          </div>
      </div>
    </>
  );
}

export default Home;
