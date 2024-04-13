import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react'; 
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom'; 


function DirectMessageNavbar () {
  const navigate = useNavigate(); //
  const [user] = useAuthState(auth);


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


  function goBackChannels() {
    navigate('/channels');
  }
  
  return (
    <div className="navbar">
      <span className="logo" onClick={goBackChannels}>ChatterBox</span>
      <div className="user">
        <img src={user?.photoURL} className="w-12 h-12 object-contain" alt="User Logo" />
        <span> {user?.displayName} </span>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}

export default DirectMessageNavbar;