// Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import UserWidget from "../widgets/UserWidgets";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isHamburgerClicked, setHamburgerClicked] = useState(false);
  const isHomePage = location.pathname === "/";
  const login = location.pathname === "/login";
  const register = location.pathname === "/register";

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const toggleHamburger = () => {
    setHamburgerClicked(!isHamburgerClicked);
  };
  const navigate = useNavigate();
  const handleAddProperty = () => {
    navigate("property/addproperty"); 
  };
  if (isHomePage || login || register) {
    return null;
  }

  return (
    <nav className="bg-blue-300 p-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto sm:px-6 flex  sm:flex-row justify-between items-center">
        <div className="flex flex-col">
          <div className="flex w-full md:w-[22%]">
            <UserWidget />
          </div>

          <div>
            <button
              className=" text-white   py-2 px-4 "
              onClick={handleAddProperty}
            >
              Add New Property
            </button>
          </div>
        </div>
        <div className="text-center mr-9">
          <Link
            to="/"
            className="text-white font-semibold text-xl mb-4 sm:mb-0 "
          >
            DreamHome Realty!
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row mb-3">
          <div className={`mt-5 ${isHamburgerClicked ? "flex" : "hidden"}`}>
            <form onSubmit={handleSearchSubmit} className="flex">
              <input
                type="text"
                placeholder="Search..."
                className="w-full sm:w-64 py-2 px-4 rounded-md mb-2 sm:mb-0 sm:mr-2 focus:outline-none"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button
                type="submit"
                className="bg-blue-700 text-white py-2 px-4 h-10 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Search
              </button>
            </form>
          </div>

          <button
            className="text-white cursor-pointer ml-2"
            onClick={toggleHamburger}
          >
            {isHamburgerClicked ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
