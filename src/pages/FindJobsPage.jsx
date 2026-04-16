import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import usePortalData from '../hooks/usePortalData';

const getExperienceText = (job) => {
  if (typeof job.experienceMin !== 'number' || typeof job.experienceMax !== 'number') {
    return 'Not specified';
  }

  return `${job.experienceMin}-${job.experienceMax} yrs`;
};

const getSalaryText = (job) => {
  if (typeof job.salaryMinLpa !== 'number' || typeof job.salaryMaxLpa !== 'number') {
    return job.salary || 'Salary not disclosed';
  }

  return `${job.salaryMinLpa}-${job.salaryMaxLpa} LPA`;
};

const FindJobsPage = () => {
  const { jobs } = usePortalData();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [savedJobs, setSavedJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(jobs.list[0]?.id || null);

  const filteredJobs = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    const normalizedLocation = location.trim().toLowerCase();

    return jobs.list.filter((job) => {
      const matchesKeyword = normalizedKeyword
        ? job.title.toLowerCase().includes(normalizedKeyword) ||
          job.company.toLowerCase().includes(normalizedKeyword) ||
          (job.skills || []).some((skill) => skill.toLowerCase().includes(normalizedKeyword))
        : true;

      const matchesLocation = normalizedLocation
        ? job.location.toLowerCase().includes(normalizedLocation)
        : true;

      return matchesKeyword && matchesLocation;
    });
  }, [jobs.list, keyword, location]);
  const selectedJob =
    filteredJobs.find((job) => job.id === selectedJobId) || filteredJobs[0] || null;

  const handleSave = (jobId) => {
    setSavedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-8">
      <section className="border-b border-slate-200 bg-gradient-to-br from-blue-50 via-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center bg-white border border-slate-300 rounded-2xl p-2 shadow-sm">
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Job title, keywords, or company"
              className="w-full lg:flex-1 px-4 py-2.5 rounded-xl border border-transparent focus:border-blue-400 focus:outline-none"
            />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder='City, state, zip code, or "remote"'
              className="w-full lg:w-80 px-4 py-2.5 rounded-xl border border-transparent focus:border-blue-400 focus:outline-none"
            />
            <button
              type="button"
              className="w-full lg:w-auto bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2.5 rounded-xl"
            >
              Find jobs
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
        <main className="space-y-3 order-2 lg:order-1">
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <p className="text-sm text-slate-600">
              Jobs for you · <span className="font-semibold text-slate-900">{filteredJobs.length}</span> results
            </p>
          </div>

          {filteredJobs.map((job) => (
            <article
              key={job.id}
              onClick={() => setSelectedJobId(job.id)}
              className={`bg-white rounded-2xl border p-4 cursor-pointer transition ${
                selectedJob?.id === job.id
                  ? 'border-blue-500 shadow-md'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{job.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{job.company}</p>
                  <p className="text-sm text-slate-500 mt-1">{job.location}</p>
                </div>
                {job.urgent ? (
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-orange-100 text-orange-700 shrink-0">
                    Urgent
                  </span>
                ) : null}
              </div>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-700">{getSalaryText(job)}</span>
                <span className="px-2 py-1 rounded bg-slate-100">{job.type}</span>
                <span className="px-2 py-1 rounded bg-slate-100">{job.workMode || 'On-site'}</span>
                <span className="px-2 py-1 rounded bg-slate-100">{getExperienceText(job)}</span>
              </div>

              <p className="mt-3 text-sm text-slate-600 line-clamp-2">{job.description}</p>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs text-slate-500">Posted {job.postedAt}</p>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSave(job.id);
                    }}
                    className="text-sm px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    {savedJobs.includes(job.id) ? 'Saved' : 'Save'}
                  </button>
                  <Link
                    to={`/jobs/${job.id}/apply`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm px-3 py-1.5 rounded-lg bg-blue-700 text-white hover:bg-blue-800"
                  >
                    Apply
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </main>

        <aside className="order-1 lg:order-2">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:sticky lg:top-24">
            {selectedJob ? (
              <>
                <h3 className="text-lg font-semibold text-slate-900">{selectedJob.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{selectedJob.company}</p>
                <p className="text-sm text-slate-500 mt-1">{selectedJob.location}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                  <span className="px-2 py-1 rounded bg-slate-100">{selectedJob.location}</span>
                  <span className="px-2 py-1 rounded bg-slate-100">{getExperienceText(selectedJob)}</span>
                  <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-700">{getSalaryText(selectedJob)}</span>
                </div>
                <p className="mt-4 text-sm text-slate-700 whitespace-pre-line">{selectedJob.description}</p>
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {(selectedJob.skills || []).map((skill) => (
                      <span key={skill} className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  to={`/jobs/${selectedJob.id}/apply`}
                  className="block mt-6 text-center bg-blue-700 text-white font-semibold py-2.5 rounded-xl hover:bg-blue-800"
                >
                  Apply now
                </Link>
              </>
            ) : (
              <p className="text-sm text-slate-500">No jobs match current filters.</p>
            )}
          </div>
        </aside>
      </section>
    </div>
  );
};

export default FindJobsPage;
