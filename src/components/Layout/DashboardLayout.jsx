import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import usePortalData from '../../hooks/usePortalData';

const DashboardLayout = ({ role }) => {
  const isEmployer = role === 'employer';
  const location = useLocation();
  const { brand } = usePortalData();
  const roleLinks = isEmployer
    ? [
        { label: 'Dashboard', to: '/employer/dashboard' },
        { label: 'My Jobs', to: '/employer/jobs' },
        { label: 'Applicants', to: '/employer/applicants' },
        { label: 'Post Job', to: '/employer/post-job' },
      ]
    : [
        { label: 'Dashboard', to: '/candidate/dashboard' },
        { label: 'Find Jobs', to: '/jobs' },
        { label: 'Saved Jobs', to: '/candidate/saved-jobs' },
        { label: 'My Profile', to: '/candidate/profile' },
      ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600">
            {brand.name} {isEmployer ? 'Pro' : ''}
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {roleLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                location.pathname === item.to
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center space-x-4">
            <button className="md:hidden p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <h2 className="text-xl font-semibold text-slate-800">Dashboard</h2>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-slate-400 hover:text-primary-600 transition-colors relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-500 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                {isEmployer ? 'EMP' : 'CA'}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">{isEmployer ? 'Tech Corp Inc.' : 'Candidate Name'}</p>
                <p className="text-xs text-slate-500">{isEmployer ? 'Employer Profile' : 'UI/UX Designer'}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
