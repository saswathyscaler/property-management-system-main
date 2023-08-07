import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; 

const Navbar = ({ onSearch }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const isHomePage = location.pathname === '/';
  const login = location.pathname === '/login';
  const register = location.pathname === '/register';

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  if (isHomePage || login || register) {
    return null;
  }

  return (
    <nav className="bg-blue-300 p-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  flex justify-between items-center">
        <Link to="/" className="text-white font-semibold text-xl">
          My Website
        </Link>

        <form onSubmit={handleSearchSubmit}>
          <div className="w-64 flex items-center bg-white rounded-md shadow-md">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 px-4 rounded-l-md focus:outline-none"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit" className="bg-blue-700 text-white py-2 px-4 rounded-r-md hover:bg-blue-600 focus:outline-none">
              Search
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
