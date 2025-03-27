import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/Avatar.jpg';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ setSearchTerm }) => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleProfileMenu = () => setProfileMenuOpen(!isProfileMenuOpen);
  const toggleNav = () => setIsNavOpen(!isNavOpen);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSearchTerm(e.target.value);
  };

  return (
    <nav className="bg-white shadow-md w-full fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div
          className="text-xl font-semibold text-blue-600 cursor-pointer"
          onClick={() => navigate('/')}
        >
          ChatHub
        </div>

        {/* Search Input (Hidden on Small Screens) */}
        <div className="hidden sm:flex items-center w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-48"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Mobile Menu Toggle */}
        <button className="sm:hidden text-gray-800" onClick={toggleNav}>
          {isNavOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Right Side Buttons */}
        <div className="hidden sm:flex items-center space-x-6">
          {/* Notification Icon */}
          <button className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.403-1.403A3.986 3.986 0 0019 13V7a4 4 0 00-8 0v6a3.986 3.986 0 00-.597 2.597L9 17h5M12 22h0"
              />
            </svg>
            <span className="absolute top-0 right-0 rounded-full bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center animate-pulse">
              3
            </span>
          </button>

          {/* Profile Button */}
          <button
            className="flex items-center space-x-2 p-2 rounded-full border-2 border-gray-300 hover:bg-gray-200"
            onClick={toggleProfileMenu}
          >
            <div className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
              <img src={avatar} alt="avatar" className="object-cover" />
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${isOnline ? 'bg-green-500' : 'bg-gray-500'
                  }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Profile Dropdown Menu */}
      {isProfileMenuOpen && (
        <div className="absolute top-16 right-6 w-48 bg-white border border-gray-200 rounded-lg shadow-md">
          <button className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100">
            Settings
          </button>
          <button className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100">
            Logout
          </button>
        </div>
      )}

      {/* Mobile Menu */}
      {isNavOpen && (
        <div className="sm:hidden absolute top-16 left-0 w-full bg-white border-t border-gray-200 shadow-lg flex flex-col items-center space-y-4 py-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-10/12"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="block text-gray-800 hover:bg-gray-100 w-full py-2">
            Notifications (3)
          </button>
          <button className=" w-full flex justify-center text-gray-800 hover:bg-gray-100 py-2"
            onClick={toggleProfileMenu}>
            <div className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-gray-300 shadow-md ">
              <img src={avatar} alt="avatar" className="object-cover" />
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${isOnline ? 'bg-green-500' : 'bg-gray-500'
                  }`}
              />
            </div>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
