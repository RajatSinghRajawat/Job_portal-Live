import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 min-w-0">
          <Link to="/" className="text-3xl font-bold text-blue-700 leading-none">
            indeed
          </Link>
          <div className="hidden md:flex items-center gap-5 text-sm text-slate-600">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-blue-700 ${isActive ? 'text-blue-700 border-b-2 border-blue-700 pb-1' : ''}`
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/company-reviews"
              className={({ isActive }) =>
                `hover:text-blue-700 ${isActive ? 'text-blue-700 border-b-2 border-blue-700 pb-1' : ''}`
              }
            >
              Company reviews
            </NavLink>
            <NavLink
              to="/salary-guide"
              className={({ isActive }) =>
                `hover:text-blue-700 ${isActive ? 'text-blue-700 border-b-2 border-blue-700 pb-1' : ''}`
              }
            >
              Salary guide
            </NavLink>
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-600 relative" ref={userMenuRef}>
          <button type="button" className="p-2 rounded-full hover:bg-slate-100" aria-label="Saved jobs">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
            </svg>
          </button>
          <button type="button" className="p-2 rounded-full hover:bg-slate-100" aria-label="Messages">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8l-5 4V5a1 1 0 0 1 1-1z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            className="p-2 rounded-full hover:bg-slate-100"
            aria-label="Account"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4.33 0-8 2.17-8 5v1h16v-1c0-2.83-3.67-5-8-5z" />
            </svg>
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50">
              <div className="px-5 py-5">
                <p className="text-3xl font-semibold text-slate-800 leading-tight break-words">
                  mayant.tipsgalwar@gmail.com
                </p>
                <div className="mt-5 space-y-2">
                  <Link
                    to="/profile"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50"
                  >
                    <span className="text-xl">Profile</span>
                  </Link>
                  {['My reviews', 'Settings', 'Help', 'Privacy Centre'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-slate-700 hover:bg-slate-50"
                    >
                      <span className="text-xl">{item}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="border-t border-slate-200 p-4">
                <button type="button" className="w-full text-center text-blue-700 text-4xl font-semibold py-2">
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
