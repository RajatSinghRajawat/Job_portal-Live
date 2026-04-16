import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const EmployerDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-indigo-700 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold mb-2">Welcome back, TechCorp!</h1>
            <p className="text-primary-100 text-lg max-w-xl">You have 12 new applications across your 3 active job postings. Let's find your next great hire.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Link to="/employer/jobs">
              <Button variant="secondary" className="bg-white/10 border-none text-white hover:bg-white/20">View Reports</Button>
            </Link>
            <Link to="/employer/post-job">
              <Button className="bg-white text-primary-700 hover:bg-slate-50">Post a New Job</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Active Jobs', value: '3', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'text-blue-600', bg: 'bg-blue-50' },
          { title: 'Total Applicants', value: '148', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { title: 'Shortlisted', value: '24', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z', color: 'text-green-600', bg: 'bg-green-50' },
          { title: 'Interviews Scheduled', value: '8', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, idx) => (
          <Card hover key={idx} className="flex items-center p-6 gap-4 border-0 shadow-sm">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.title}</p>
              <h3 className="text-3xl font-extrabold text-slate-800">{stat.value}</h3>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">Recent Applications</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 text-sm border-b border-slate-100">
                  <th className="font-medium pb-3 pr-4">Candidate Name</th>
                  <th className="font-medium pb-3 px-4">Applied Job</th>
                  <th className="font-medium pb-3 px-4">Date</th>
                  <th className="font-medium pb-3 px-4">Status</th>
                  <th className="font-medium pb-3 pl-4">Action</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 text-sm">
                {[
                  { name: 'Sarah Jenkins', job: 'Senior Frontend Engineer', date: 'Oct 24, 2026', status: 'Pending review', statusColor: 'bg-yellow-100 text-yellow-800' },
                  { name: 'Michael Chen', job: 'Product Designer', date: 'Oct 23, 2026', status: 'Shortlisted', statusColor: 'bg-green-100 text-green-800' },
                  { name: 'David Smith', job: 'Backend Developer', date: 'Oct 22, 2026', status: 'Interview', statusColor: 'bg-purple-100 text-purple-800' },
                  { name: 'Emily White', job: 'Senior Frontend Engineer', date: 'Oct 21, 2026', status: 'Pending review', statusColor: 'bg-yellow-100 text-yellow-800' },
                ].map((app, idx) => (
                  <tr key={idx} className="border-b last:border-0 border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="py-4 pr-4 font-medium">{app.name}</td>
                    <td className="py-4 px-4">{app.job}</td>
                    <td className="py-4 px-4 text-slate-500">{app.date}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${app.statusColor}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-4 pl-4">
                      <Link to="/employer/applicants" className="text-primary-600 hover:text-primary-800 font-medium">Review</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Action Panel */}
        <div className="space-y-6">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-indigo-50 to-white">
            <h3 className="font-bold text-slate-800 mb-2">Boost Your Reach</h3>
            <p className="text-sm text-slate-600 mb-4">Promote your urgent openings to appear at the top of candidate feeds.</p>
            <Link to="/employer/post-job">
              <Button variant="primary" className="w-full">Promote a Job</Button>
            </Link>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Upcoming Interviews</h3>
            <div className="space-y-4">
              {[
                { name: 'Michael Chen', role: 'Product Designer', time: 'Today, 2:00 PM' },
                { name: 'David Smith', role: 'Backend Developer', time: 'Tomorrow, 10:30 AM' },
              ].map((interview, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold shrink-0">
                    {interview.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-slate-800">{interview.name}</h4>
                    <p className="text-xs text-slate-500">{interview.role} • {interview.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
