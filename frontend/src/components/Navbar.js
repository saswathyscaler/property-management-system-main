// Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import UserWidget from "../widgets/UserWidgets";
import { FaBars, FaTimes } from "react-icons/fa";
import { BiSolidUserCircle } from "react-icons/bi";

const Navbar = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isHamburgerClicked, setHamburgerClicked] = useState(false);
  const isHomePage = location.pathname === "/";
  const login = location.pathname === "/login";
  const register = location.pathname === "/register";



  const [isUserIconClicked, setUserIconClicked] = useState(false);
  const navigate = useNavigate();

  const toggleUserIcon = () => {
    setUserIconClicked(!isUserIconClicked);
  };


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const toggleHamburger = () => {
    setHamburgerClicked(!isHamburgerClicked);
  };
  const handleAddProperty = () => {
    navigate("property/addproperty"); 
  };
  if (isHomePage || login || register) {
    return null;
  }

   return (
    <nav className="bg-blue-300 p-4 sticky top-0 z-10 flex flex-col sm:flex-row items-center">
  <BiSolidUserCircle
    className={`text-white cursor-pointer w-8 h-8`}
    onClick={toggleUserIcon}
  />

  <div className="max-w-7xl mx-auto sm:px-6 flex  sm:flex-row justify-between items-center w-full">
    <div className={`flex ${isUserIconClicked ? '' : 'hidden'} sm:w-1/4 sm:mr-4`}>
      <UserWidget />
    </div>

    <div className={`mt-2 ${isUserIconClicked ? 'hidden' : 'flex'} sm:w-1/4 sm:mt-0`}>
      <button
        className="text-white py-2 px-4"
        onClick={handleAddProperty}
      >
        Add New Property
      </button>
    </div>

    <div className="text-center sm:w-1/4 sm:text-left">
      <Link
        to="/"
        className="text-white font-semibold text-xl mb-4 sm:mb-0"
      >
        DreamHome Realty!
      </Link>
    </div>

  
  </div>
</nav>

  );
};

export default Navbar;
