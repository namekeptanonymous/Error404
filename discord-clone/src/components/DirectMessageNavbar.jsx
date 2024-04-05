import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react'; //
import chatterboxImage from '../images/chatterbox.png';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom'; //


function DirectMessageNavbar () {
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
  
  return (
    <div className="navbar">
      <span className="logo">ChatterBox</span>
      <div className="user">
        <img src={user?.photoURL} className="w-12 h-12 object-contain" alt="User Logo" />
        <span> {user?.displayName} </span>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}

export default DirectMessageNavbar;
