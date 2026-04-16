import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const CandidateDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome & Profile Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full border-0 shadow-sm bg-gradient-to-r from-slate-900 to-indigo-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white/30 backdrop-blur-sm flex items-center justify-center shrink-0 shadow-xl text-3xl font-bold">
                JD
              </div>
              <div>
                <h1 className="text-3xl font-extrabold mb-1">John Doe</h1>
                <p className="text-indigo-200 text-lg mb-3">UI/UX Designer | 5+ Yrs Exp.</p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-bold border border-green-500/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Open to work
                  </span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium border border-white/20">
                    Profile 85% Complete
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Quick Actions & Premium */}
        <Card className="border-0 shadow-sm flex flex-col justify-center">
          <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link to="/candidate/profile">
              <Button variant="outline" className="w-full flex justify-between items-center pr-4">
                <span>Update Resume (CV)</span>
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
              </Button>
            </Link>
            <Link to="/jobs">
              <Button className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 border-none text-white shadow-md">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/></svg>
                  Upgrade to Premium
                </span>
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Applied Jobs', value: '14', color: 'text-indigo-600' },
          { title: 'Profile Views', value: '42', color: 'text-blue-600' },
          { title: 'Saved Jobs', value: '8', color: 'text-slate-600' },
        ].map((stat, idx) => (
          <Card key={idx} className="border-0 shadow-sm text-center py-8">
            <h4 className="text-4xl font-extrabold mb-2">{stat.value}</h4>
            <p className={`text-sm font-semibold uppercase tracking-wider ${stat.color}`}>{stat.title}</p>
          </Card>
        ))}
      </div>

      {/* Recent Applications Track */}
      <Card className="border-0 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Application Status</h2>
          <Button variant="ghost" size="sm">View History</Button>
        </div>
        
        <div className="space-y-6">
          {[
            { job: 'Senior UI Designer', company: 'Creative Solutions', date: 'Applied 2 days ago', status: 'In Review', progress: 50 },
            { job: 'Product Designer', company: 'TechCorp Plus', date: 'Applied 1 week ago', status: 'Interview', progress: 75 },
            { job: 'UX Researcher', company: 'Global Reach', date: 'Applied 2 weeks ago', status: 'Rejected', progress: 100, reject: true },
          ].map((app, idx) => (
            <div key={idx} className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-lg text-primary-600 shrink-0 shadow-sm">
                {app.company.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800">{app.job}</h3>
                <p className="text-sm text-slate-500">{app.company} • {app.date}</p>
              </div>
              <div className="w-full md:w-64">
                <div className="flex justify-between text-xs font-semibold mb-1 cursor-pointer">
                  <span className={app.reject ? 'text-red-600' : 'text-primary-600'}>{app.status}</span>
                  <span className="text-slate-400">{app.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${app.reject ? 'bg-red-500' : 'bg-primary-500'}`} 
                    style={{ width: `${app.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CandidateDashboard;
