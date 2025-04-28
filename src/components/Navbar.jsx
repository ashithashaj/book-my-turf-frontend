import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/');
      window.location.reload(); // Refresh to update UI instantly
    } else {
      navigate('/login');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // You can trigger your search API here
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex items-center gap-8">
      {/* Logo */}
        <div className="text-2xl w-1/8 font-bold text-indigo-600 cursor-pointer" onClick={() => navigate('/')}>
        <img src="/logo.png" alt="Logo" className="h-16" />
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex w-6/8 items-center justify-between space-x-2">
        

        <input
          type="text"
          placeholder="Search for Turfs and Tournaments"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 w-[36rem] focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        

        <div className="relative">
          <select className=" border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm text-gray-700 focus:outline-none">
            <option value="">Choose Location</option>
            <option value="location1">Perambra</option>
            <option value="location2">Vadakara</option>
            <option value="location3">Quilandy</option>
            <option value="location3">Kozhikode</option>
            
          </select>
          
        </div>
      </form>

      {/* Auth Button */}
      <div className='w-1/8'>
        <button
            onClick={handleAuthClick}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
        >
            {isLoggedIn ? 'Sign Out' : 'Sign In'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
