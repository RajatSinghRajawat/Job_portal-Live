import { useState } from 'react';

const profileTabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'resume', label: 'Resume' },
  { key: 'preferences', label: 'Job preferences' },
  { key: 'security', label: 'Settings' },
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [profile, setProfile] = useState({
    fullName: 'MAYANT KHANNA',
    email: 'mayant.tipsgalwar@gmail.com',
    phone: '084400 31328',
    location: 'Alwar, Rajasthan, 301001, IN',
    headline: 'Full-Stack Web Developer',
  });
  const [resumeFile, setResumeFile] = useState('mayant resume.pdf');
  const [experience, setExperience] = useState('2 years');
  const [jobType, setJobType] = useState('Full-time');
  const [readyToWork, setReadyToWork] = useState(true);

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  let tabContent;
  if (activeTab === 'resume') {
    tabContent = (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Resume manager</h2>
        <p className="text-slate-600">Upload and manage your latest resume to improve matching.</p>
        <div className="border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-slate-900">{resumeFile}</p>
            <p className="text-sm text-slate-500">Added Mar 9, 2026</p>
          </div>
          <label className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer">
            Upload new
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file?.name) {
                  setResumeFile(file.name);
                }
              }}
            />
          </label>
        </div>
        <div className="h-56 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-500">
          Resume preview panel
        </div>
      </div>
    );
  } else if (activeTab === 'preferences') {
    tabContent = (
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900">Improve your job matches</h2>
        <div className="border border-slate-200 rounded-xl p-4">
          <label className="text-sm font-medium text-slate-700">Experience</label>
          <input
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="border border-slate-200 rounded-xl p-4">
          <label className="text-sm font-medium text-slate-700">Preferred job type</label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:border-blue-500 focus:outline-none"
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
            <option>Contract</option>
          </select>
        </div>
        <label className="border border-slate-200 rounded-xl p-4 flex items-center justify-between cursor-pointer">
          <div>
            <p className="font-medium text-slate-800">Ready to work immediately</p>
            <p className="text-sm text-slate-500">Employers will know you are available now.</p>
          </div>
          <input
            type="checkbox"
            checked={readyToWork}
            onChange={(e) => setReadyToWork(e.target.checked)}
            className="h-5 w-5 accent-blue-700"
          />
        </label>
      </div>
    );
  } else if (activeTab === 'security') {
    tabContent = (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Account settings</h2>
        {['Profile', 'My reviews', 'Settings', 'Help', 'Privacy Centre'].map((item) => (
          <div key={item} className="border border-slate-200 rounded-xl px-4 py-3 text-slate-800">
            {item}
          </div>
        ))}
        <button className="w-full py-2.5 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800">
          Sign out
        </button>
      </div>
    );
  } else {
    tabContent = (
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">Profile details</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Full name</span>
            <input
              value={profile.fullName}
              onChange={(e) => handleProfileChange('fullName', e.target.value)}
              className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:border-blue-500 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              value={profile.email}
              onChange={(e) => handleProfileChange('email', e.target.value)}
              className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:border-blue-500 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Phone</span>
            <input
              value={profile.phone}
              onChange={(e) => handleProfileChange('phone', e.target.value)}
              className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:border-blue-500 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Location</span>
            <input
              value={profile.location}
              onChange={(e) => handleProfileChange('location', e.target.value)}
              className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:border-blue-500 focus:outline-none"
            />
          </label>
        </div>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Professional headline</span>
          <input
            value={profile.headline}
            onChange={(e) => handleProfileChange('headline', e.target.value)}
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:border-blue-500 focus:outline-none"
          />
        </label>
        <div className="space-y-2 text-slate-700 border border-slate-200 rounded-xl p-4 bg-slate-50">
          <p className="font-semibold">{profile.fullName}</p>
          <p>{profile.email}</p>
          <p>{profile.phone}</p>
          <p>{profile.location}</p>
          <p className="text-slate-600">{profile.headline}</p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800 font-semibold">
          Employers can find you
        </div>
        <button className="px-6 py-2.5 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800">
          Save profile changes
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="border-b border-slate-200 px-4 sm:px-6 py-4">
            <div className="flex gap-2 overflow-x-auto">
              {profileTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'bg-blue-700 text-white font-medium'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="p-5 sm:p-6">{tabContent}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
