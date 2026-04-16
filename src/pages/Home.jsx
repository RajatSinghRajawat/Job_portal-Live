import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import usePortalData from '../hooks/usePortalData';

const Home = () => {
  const { home } = usePortalData();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden flex items-center justify-center min-h-[80vh]">
        {/* Background Gradients */}
        <div className="absolute inset-0 -z-10 bg-slate-50">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 left-[-100px] w-[500px] h-[500px] bg-indigo-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-20 w-[500px] h-[500px] bg-sky-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center z-10 relative">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 tracking-tight mb-8">{home.heroTitle}</h1>
          <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            {home.heroDescription}
          </p>

          {/* Search Glass Card */}
          <div className="glass p-3 md:p-4 rounded-3xl max-w-3xl mx-auto shadow-2xl flex flex-col md:flex-row gap-3 relative transform transition-all hover:scale-[1.01]">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input type="text" className="block w-full pl-11 pr-4 py-4 rounded-2xl border-none bg-white/80 focus:bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary-500 transition-colors" placeholder="Job title, keywords, or company" />
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <input type="text" className="block w-full pl-11 pr-4 py-4 rounded-2xl border-none bg-white/80 focus:bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary-500 transition-colors" placeholder="City, state, or remote" />
            </div>
            <Link to="/jobs">
              <Button size="lg" className="h-full w-full md:w-auto px-8 py-4 rounded-2xl">
                Search Jobs
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-500">
            <span>Popular:</span>
            {home.popularSearches.map((item) => (
              <Link key={item} to="/jobs" className="hover:text-primary-600 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-800">Explore by Category</h2>
            <p className="mt-4 text-slate-600">Find the role that best suits your skills</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {home.categories.map((category, idx) => (
              <Card hover key={idx} className="text-center p-8 group">
                <div className="w-14 h-14 mx-auto bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{category}</h3>
                <p className="text-slate-500 text-sm">{120 + idx * 24} open positions</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-primary-500 opacity-20 blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Are you hiring?</h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Connect with millions of job seekers. Post your job and find the perfect candidate today. With AI assisted tools, find the right match faster.
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 shadow-xl">
              Post a Job Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
