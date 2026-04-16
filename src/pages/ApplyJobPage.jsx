import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import usePortalData from '../hooks/usePortalData';

const steps = [
  { key: 'resume', label: 'Resume' },
  { key: 'experience', label: 'Experience' },
  { key: 'review', label: 'Review' },
];

const ApplyJobPage = () => {
  const { jobId } = useParams();
  const { jobs } = usePortalData();
  const [activeStep, setActiveStep] = useState('resume');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');

  const selectedJob = useMemo(
    () => jobs.list.find((job) => String(job.id) === String(jobId)) || jobs.list[0],
    [jobs.list, jobId]
  );

  return (
    <div className="min-h-screen bg-slate-100 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <section className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="border-b border-slate-200 p-5">
            <p className="text-sm text-slate-500">Applying for</p>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">{selectedJob.title}</h1>
            <p className="text-slate-600 mt-1">{selectedJob.company}</p>
          </div>

          <div className="p-5 border-b border-slate-200 flex gap-2 overflow-x-auto">
            {steps.map((step, index) => (
              <button
                key={step.key}
                type="button"
                onClick={() => setActiveStep(step.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeStep === step.key ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {index + 1}. {step.label}
              </button>
            ))}
          </div>

          <div className="p-5">
            {activeStep === 'resume' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">Add your CV for the employer</h2>
                <div className="border border-blue-500 rounded-xl p-4 bg-blue-50">
                  <p className="font-semibold text-slate-900">mayant resume.pdf</p>
                  <p className="text-sm text-slate-600 mt-1">Uploaded Mar 9, 2026</p>
                  <div className="mt-4 h-40 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 text-sm">
                    Resume preview
                  </div>
                </div>
              </div>
            )}

            {activeStep === 'experience' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">Enter relevant experience</h2>
                <p className="text-slate-600">
                  Share one job title with the employer to introduce yourself as a candidate.
                </p>
                <div className="space-y-3">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Job title</span>
                    <input
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:border-blue-500 focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Company</span>
                    <input
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:border-blue-500 focus:outline-none"
                    />
                  </label>
                </div>
              </div>
            )}

            {activeStep === 'review' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">Review your application</h2>
                <div className="border border-slate-200 rounded-xl p-4 space-y-2">
                  <p className="text-sm text-slate-500">Contact info</p>
                  <p className="font-semibold text-slate-900">mayant.tipsgalwar@gmail.com</p>
                  <p className="text-slate-700">+91 84400 31328</p>
                </div>
                <div className="border border-slate-200 rounded-xl p-4">
                  <p className="text-sm text-slate-500">Relevant experience</p>
                  <p className="font-medium text-slate-900 mt-1">{jobTitle || 'S. Developer'}</p>
                  <p className="text-slate-700">{company || 'Novixpert Private limited'}</p>
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              {activeStep !== 'resume' && (
                <button
                  type="button"
                  onClick={() =>
                    setActiveStep(
                      steps[Math.max(0, steps.findIndex((step) => step.key === activeStep) - 1)].key
                    )
                  }
                  className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700"
                >
                  Back
                </button>
              )}
              {activeStep !== 'review' ? (
                <button
                  type="button"
                  onClick={() =>
                    setActiveStep(
                      steps[Math.min(steps.length - 1, steps.findIndex((step) => step.key === activeStep) + 1)].key
                    )
                  }
                  className="px-5 py-2.5 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800"
                >
                  Submit application
                </button>
              )}
            </div>
          </div>
        </section>

        <aside className="bg-white border border-slate-200 rounded-2xl p-5 lg:sticky lg:top-24 h-fit">
          <h3 className="text-lg font-semibold text-slate-900">{selectedJob.title}</h3>
          <p className="text-slate-600 mt-1">{selectedJob.company}</p>
          <p className="text-slate-500 mt-1">{selectedJob.location}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded">{selectedJob.salary}</span>
            <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded">{selectedJob.type}</span>
          </div>
          <p className="text-sm text-slate-700 mt-4">{selectedJob.description}</p>
          <Link
            to="/jobs"
            className="mt-5 block text-center border border-slate-300 rounded-lg px-4 py-2.5 text-slate-700 hover:bg-slate-50"
          >
            Back to jobs
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default ApplyJobPage;
