import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-white text-xl font-bold">
              MyPaste
            </NavLink>
          </div>
          <div className="hidden sm:flex gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white hover:text-gray-300 ${
                  isActive ? 'border-b-2 border-teal-500' : ''
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/pastes"
              className={({ isActive }) =>
                `text-white hover:text-gray-300 ${
                  isActive ? 'border-b-2 border-teal-500' : ''
                }`
              }
            >
              Pastes
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="sm:hidden">
          <NavLink
            to="/"
            className="block px-4 py-2 text-white hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className="block px-4 py-2 text-white hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Pastes
          </NavLink>
        </div>
      )}
    </nav>
  );
}

