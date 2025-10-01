import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { HiMiniBuildingLibrary } from "react-icons/hi2";


const Navbar = ({ searchQuery, onSearchChange }) => {
  return (
    <header className="bg-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center space-x-2">
           <HiMiniBuildingLibrary className="h-8 w-8" />
          <span className="text-2xl font-bold">DigiPustaka</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/daftar-buku" className="font-medium">Daftar Buku</Link>
          <Link to="/forum" className="font-medium">Forum</Link>
          <Link to="/ulasan" className="font-medium">Ulasan</Link>
        </nav>

        {/* Search Bar */}
        <div className="relative w-80">
          <input
            type="text"
            placeholder="Cari Buku"
            className="w-full px-4 py-2 rounded-lg bg-slate-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-slate-200"
            value={searchQuery}
            onChange={onSearchChange}
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Profile Icon */}
        <div className="flex items-center">
          <Link 
            to="/profile" 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired
};

export default Navbar;
