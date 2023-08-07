import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming you are using React Router for navigation

const Navbar = () => {
  const location = useLocation();

  // Check if the current location is the home page
  const isHomePage = location.pathname === '/';
  const login = location.pathname === '/login';
  const register = location.pathname === '/register';

  // If it's the home page, don't render the navbar
  if (isHomePage || login|| register) {
    return null;
  }

  return (
    <nav className="bg-blue-300 p-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  flex justify-between items-center">
        {/* Home link */}
        <Link to="/" className="text-white font-semibold text-xl">
          My Website
        </Link>

        {/* Search field */}
        <div className="w-64 flex items-center bg-white rounded-md shadow-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 rounded-l-md focus:outline-none"
          />
          <button className="bg-blue-700 text-white py-2 px-4 rounded-r-md hover:bg-blue-600 focus:outline-none">
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
