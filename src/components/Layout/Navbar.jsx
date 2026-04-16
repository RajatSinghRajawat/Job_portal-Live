import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <span className={`text-2xl font-bold ${isScrolled ? 'text-slate-800' : 'text-slate-800'}`}>
              JobPortal
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/jobs" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Find Jobs</Link>
            <Link to="#" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Companies</Link>
            <Link to="/candidate/dashboard" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Dashboard</Link>
            <div className="h-6 w-px bg-slate-300"></div>
            <Link to="/login" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Login</Link>
            <Link to="/login">
              <Button variant="primary">Post a Job</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600 hover:text-primary-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 py-4 px-4 flex flex-col gap-4">
          <Link to="/jobs" className="text-slate-600 font-medium px-4 py-2 hover:bg-slate-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Find Jobs</Link>
          <Link to="#" className="text-slate-600 font-medium px-4 py-2 hover:bg-slate-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Companies</Link>
          <Link to="/candidate/dashboard" className="text-slate-600 font-medium px-4 py-2 hover:bg-slate-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
          <div className="h-px w-full bg-slate-100 my-2"></div>
          <Link to="/login" className="text-slate-600 font-medium px-4 py-2 hover:bg-slate-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Login</Link>
          <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
            <Button variant="primary" className="w-full">Post a Job</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
