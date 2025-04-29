import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
    window.location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex items-center gap-8">
      {/* Logo */}
      <div className="text-2xl w-1/8 font-bold text-indigo-600 cursor-pointer" onClick={() => navigate('/')}>
        <img src="/logo.png" alt="Logo" className="h-16" />
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex w-6/8 items-center justify-between space-x-2">
        <input
          type="text"
          placeholder="Search for Turfs and Tournaments"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 w-[36rem] focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <select className="border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm text-gray-700 focus:outline-none">
          <option value="">Choose Location</option>
          <option value="perambra">Perambra</option>
          <option value="vadakara">Vadakara</option>
          <option value="quilandy">Quilandy</option>
          <option value="kozhikode">Kozhikode</option>
        </select>
      </form>

      {/* Auth Section */}
      <div className="w-1/8 relative" ref={dropdownRef}>
        {!isLoggedIn ? (
          <button
            onClick={() => navigate('/login')}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
          >
            Sign In
          </button>
        ) : (
          <>
            <button onClick={toggleDropdown} className="text-3xl text-gray-700">
              <FaUserCircle />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                <button
                  onClick={() => {
                    navigate('/profile');
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </button>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
