import React, { useState } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import JobCard from '../components/common/JobCard';
import usePortalData from '../hooks/usePortalData';
import useJobSearch from '../hooks/useJobSearch';

const JobSearch = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { jobs } = usePortalData();
  const {
    query,
    setQuery,
    location,
    setLocation,
    selectedTypes,
    selectedModes,
    toggleType,
    toggleMode,
    clearFilters,
    filteredJobs,
  } = useJobSearch(jobs.list);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Search Header */}
      <div className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">Find Your Next Job</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input placeholder="Job title, keywords..." className="shadow-sm" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className="flex-1">
              <Input placeholder="Location or Remote" className="shadow-sm" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <Button size="lg" className="w-full md:w-auto px-8 shadow-sm">Search</Button>
            <Button variant="outline" className="md:hidden" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className={`w-full lg:w-64 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-28">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800">Filters</h2>
              <button className="text-sm text-primary-600 font-medium hover:underline" onClick={clearFilters}>Clear all</button>
            </div>
            
            <div className="space-y-6">
              {/* Job Type Filter */}
              <div>
                <h3 className="font-semibold text-slate-700 mb-3">Job Type</h3>
                <div className="space-y-2">
                  {jobs.jobTypes.map((type) => (
                    <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleType(type)}
                        className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-slate-600 group-hover:text-slate-900">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Work Mode Filter */}
              <div className="pt-6 border-t border-slate-100">
                <h3 className="font-semibold text-slate-700 mb-3">Work Mode</h3>
                <div className="space-y-2">
                  {jobs.workModes.map((mode) => (
                    <label key={mode} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedModes.includes(mode)}
                        onChange={() => toggleMode(mode)}
                        className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-slate-600 group-hover:text-slate-900">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary Range Filter */}
              <div className="pt-6 border-t border-slate-100">
                <h3 className="font-semibold text-slate-700 mb-3">Salary Range</h3>
                <input type="range" className="w-full accent-primary-600" min="0" max="200000" step="10000" />
                <div className="flex justify-between text-sm text-slate-500 mt-2">
                  <span>$0</span>
                  <span>$200k+</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Job Listings */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-slate-600 font-medium">Showing <span className="text-slate-900 font-bold">{filteredJobs.length}</span> jobs</h2>
            <select className="bg-white border border-slate-200 text-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm cursor-pointer">
              <option>Most Relevant</option>
              <option>Most Recent</option>
              <option>Highest Salary</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button className="w-10 h-10 rounded-lg bg-primary-600 text-white font-medium">1</button>
              <button className="w-10 h-10 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium">2</button>
              <button className="w-10 h-10 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium">3</button>
              <span className="px-2 text-slate-500">...</span>
              <button className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </nav>
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobSearch;
