// components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-900 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold">
          <Link to="/" className="text-xl">ChatterBox</Link>
        </div>
        <ul className="flex">
          <li className="ml-4"><Link to="/login" className="text-white hover:text-gray-300">Login</Link></li>
          <li className="ml-4"><Link to="/register" className="text-white hover:text-gray-300">Register</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
