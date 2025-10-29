import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from '../NavLink';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <nav className={`fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800 transition-all duration-300 ${
        scrolled ? 'shadow-lg' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2">
              <img
                src="vid/untitled folder/WhatsApp Image 2025-03-31 at 11.40.22.jpeg"
                alt="TIT Dev Community Logo"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                TIT Developer Community
              </span>
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
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-all duration-200"
                aria-expanded={isOpen}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="block h-6 w-6 transition-transform duration-200" />
                ) : (
                  <Menu className="block h-6 w-6 transition-transform duration-200" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Slide in from right */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 z-[60] transform transition-transform duration-300 ease-in-out shadow-2xl md:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Close button */}
          <div className="flex justify-end p-4 border-b border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation links */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="space-y-2 px-4">
              <NavLink
                href="/"
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                🏠 Home
              </NavLink>
              <NavLink
                href="#about"
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                ℹ️ About
              </NavLink>
              <NavLink
                href="#mvp"
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                🎯 MVP
              </NavLink>
              <NavLink
                href="/gallery"
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                🖼️ Gallery
              </NavLink>
              <NavLink
                href="#contact"
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                📧 Contact
              </NavLink>
              <NavLink
                href="/events"
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                🎉 Events
              </NavLink>
              <NavLink
                href="/hall-of-fame"
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                🏆 Hall of Fame
              </NavLink>
            </div>
          </div>

          {/* Footer in mobile menu */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              © 2025 TIT Dev Community
            </p>
          </div>
        </div>
      </div>

      {/* Overlay when mobile menu is open */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
    </>
  );
}