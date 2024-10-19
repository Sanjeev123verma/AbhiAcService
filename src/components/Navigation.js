"use client"
import { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons for menu toggle

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 font-headerfont">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center rounded-full">
            {/* Logo */}
            <img
              src="../Images/logo.jpeg"
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />
          </div>
          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/contact">Contact Us</NavLink>
            <NavLink href="/users"></NavLink>
          </div>
          {/* Mobile Menu Toggle Button */}
          <div className="sm:hidden flex items-center">
            <button onClick={toggleMenu} className="text-2xl focus:outline-none">
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white shadow-lg">
          <div className="flex flex-col items-center py-4 space-y-4">
            <NavLink href="/" onClick={toggleMenu}>Home</NavLink>
            <NavLink href="/services" onClick={toggleMenu}>Services</NavLink>
            <NavLink href="/about" onClick={toggleMenu}>About Us</NavLink>
            <NavLink href="/contact" onClick={toggleMenu}>Contact Us</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

// NavLink Component for Reusability
const NavLink = ({ href, children, onClick }) => (
  <Link href={href}
      onClick={onClick}
      className="text-lg font-medium text-gray-700 hover:text-blue-700 hover:underline transition-colors duration-200">
      {children}
  </Link>
);

export default Navigation;
