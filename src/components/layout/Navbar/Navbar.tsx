import { Code2 } from 'lucide-react';
import { NavLink } from '../../../components/common/NavLink/NavLink';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-2">
            <Code2 className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-900">TIT Dev Community</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#mvp">MVP</NavLink>
            <NavLink href="#gallery">Gallery</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <NavLink href="/events">Events</NavLink>
            <NavLink href="/hall-of-fame">Hall of Fame</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}