import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { Redirect } from 'react-router-dom'; // Import Redirect from react-router-dom
import ServerIcon from './ServerIcon'; // Import ServerIcon component

function Home() {
  const [user] = useAuthState(auth);

  // Check if user is not authenticated and redirect to the root ("/") if needed
  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <>
    <div className="flex h-screen">
      <div className="flex flex-col space-y-3 bg-discord-serversBg">
        <div className="server-default hover:bg-discord-purple">
          <img src="chatterbox.png" alt="" className="h-5" />
        
      </div>
      <hr className="border-gray-700 border w-8 mx-auto" />
      {/* Placeholder for ServerIcon components */}
      <ServerIcon image="chatterbox.png" />
      <ServerIcon image="chatterbox.png" />
      <ServerIcon image="chatterbox.png" />
      <ServerIcon image="chatterbox.png" />
      <div>
<PlusIcon className="text-discord_green h-7 
group-hover:text-white"/>
      </div>
    </div>
    </div>
    </>
  );
}

export default Home;
