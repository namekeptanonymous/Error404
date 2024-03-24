import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom'; // Import Navigate instead of Redirect
import ServerIcon from './ServerIcon';

function Home() {
  const [user] = useAuthState(auth);

  // Check if user is not authenticated and navigate to the root ("/") if needed
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className="flex h-screen">
        <div className="flex flex-col space-y-3 bg-discord-serversBg">
          <div className="server-default hover:bg-discord-purple">
            <img src="../src/images/chatterbox.png" alt="" className="h-5" />
          </div>
          <hr className="border-gray-700 border w-8 mx-auto" />
          {/* Placeholder for ServerIcon components */}
          <ServerIcon image="../src/images/chatterbox.png" />
          <ServerIcon image="../src/images/chatterbox.png" />
          <ServerIcon image="../src/images/chatterbox.png" />
          <ServerIcon image="../src/images/chatterbox.png" />
          <div>
            {/* PlusIcon or any other component */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
