import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import Button from './Button';

const JobCard = ({ job }) => {
  return (
    <Card hover className="flex flex-col h-full group relative overflow-hidden">
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-50 to-indigo-100 rounded-bl-full -z-10 transition-transform group-hover:scale-125 duration-500" />
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2">
            {job.logo ? (
              <img src={job.logo} alt={job.company} className="w-full h-full object-contain mix-blend-multiply" />
            ) : (
              <span className="text-xl font-bold text-primary-600">{job.company.charAt(0)}</span>
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-800 group-hover:text-primary-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-slate-500 text-sm font-medium">{job.company}</p>
          </div>
        </div>
        {job.urgent && (
          <span className="px-2.5 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full animate-pulse">
            Urgent
          </span>
        )}
      </div>

      <div className="mt-2 flex flex-wrap gap-2 mb-6">
        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          {job.location}
        </span>
        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          {job.type}
        </span>
        <span className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-lg flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {job.salary}
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
        <span className="text-xs text-slate-400 font-medium">Posted {job.postedAt}</span>
        <Link to="/login">
          <Button variant="primary" size="sm" className="px-4 py-1.5">Apply Now</Button>
        </Link>
      </div>
    </Card>
  );
};

export default JobCard;
