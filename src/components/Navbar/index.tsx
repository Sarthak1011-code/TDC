import { useState } from 'react';
import { Code2, Menu, X } from 'lucide-react';
import { NavLink } from '../NavLink';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2">
              <img
                src="vid/untitled folder/WhatsApp Image 2025-03-31 at 11.40.22.jpeg"
                alt="TIT Dev Community Logo"
                className="w-8 h-8"
              />
              <span className="text-2xl font-bold text-gray-900">TIT Developer Community</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <NavLink href="/">Home</NavLink>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#mvp">MVP</NavLink>
              <NavLink href="/gallery">Gallery</NavLink>
              <NavLink href="#contact">Contact</NavLink>
              <NavLink href="/events">Events</NavLink>
              <NavLink href="/hall-of-fame">Hall of Fame</NavLink>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors duration-200"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6 transition-transform duration-200" />
                ) : (
                  <Menu className="block h-6 w-6 transition-transform duration-200" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <NavLink
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              href="#about"
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              href="#mvp"
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              MVP
            </NavLink>
            <NavLink
              href="/gallery"
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Gallery
            </NavLink>
            <NavLink
              href="#contact"
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </NavLink>
            <NavLink
              href="/events"
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Events
            </NavLink>
            <NavLink
              href="/hall-of-fame"
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Hall of Fame
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Overlay when mobile menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ease-in-out"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}