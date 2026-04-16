import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import usePortalData from '../hooks/usePortalData';

const jobsPerPage = 5;

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
  // Keep this false while exploring the full website.
  // Set true to force login before apply actions.
  const requireLoginForActions = false;
  const { jobs } = usePortalData();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedModes, setSelectedModes] = useState([]);
  const [experienceLimit, setExperienceLimit] = useState(12);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [savedJobs, setSavedJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(jobs.list[0]?.id || null);

  const toggleFilterValue = (value, selectedValues, setter) => {
    setter(
      selectedValues.includes(value)
        ? selectedValues.filter((item) => item !== value)
        : [...selectedValues, value]
    );
    setCurrentPage(1);
  };

  const filteredJobs = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    const normalizedLocation = location.trim().toLowerCase();

    const list = jobs.list.filter((job) => {
      const matchesKeyword = normalizedKeyword
        ? job.title.toLowerCase().includes(normalizedKeyword) ||
          job.company.toLowerCase().includes(normalizedKeyword) ||
          (job.skills || []).some((skill) => skill.toLowerCase().includes(normalizedKeyword))
        : true;

      const matchesLocation = normalizedLocation
        ? job.location.toLowerCase().includes(normalizedLocation)
        : true;

      const matchesType = selectedTypes.length ? selectedTypes.includes(job.type) : true;
      const matchesMode = selectedModes.length ? selectedModes.includes(job.workMode || 'On-site') : true;
      const matchesExperience =
        typeof job.experienceMin === 'number' ? job.experienceMin <= experienceLimit : true;

      return matchesKeyword && matchesLocation && matchesType && matchesMode && matchesExperience;
    });

    if (sortBy === 'latest') {
      return [...list].sort((a, b) => (a.postedDaysAgo || 99) - (b.postedDaysAgo || 99));
    }

    if (sortBy === 'salary') {
      return [...list].sort((a, b) => (b.salaryMaxLpa || 0) - (a.salaryMaxLpa || 0));
    }

    return list;
  }, [jobs.list, keyword, location, selectedTypes, selectedModes, experienceLimit, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / jobsPerPage));
  const currentJobs = filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);
  const selectedJob =
    filteredJobs.find((job) => job.id === selectedJobId) || currentJobs[0] || null;

  const clearAllFilters = () => {
    setKeyword('');
    setLocation('');
    setSelectedTypes([]);
    setSelectedModes([]);
    setExperienceLimit(12);
    setSortBy('relevance');
    setCurrentPage(1);
  };

  const handleSave = (jobId) => {
    setSavedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const applyRedirectPath = requireLoginForActions ? '/login' : '/candidate/dashboard';

  return (
    <div className="bg-slate-100 min-h-screen pb-10">
      <section className="bg-white border-b border-slate-200 sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-5">
              <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Skills, designation, companies"
              />
            </div>
            <div className="md:col-span-4">
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
              />
            </div>
            <div className="md:col-span-3">
              <Button className="w-full" size="lg">
                Search Jobs
              </Button>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <span className="text-slate-500">Popular searches:</span>
            {jobs.popularTags?.map((tag) => (
              <button
                key={tag}
                onClick={() => setKeyword(tag)}
                className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
        <aside className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sticky top-44">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">All Filters</h3>
              <button onClick={clearAllFilters} className="text-primary-600 text-sm font-medium">
                Clear
              </button>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-slate-700 mb-3">Job Type</p>
              <div className="space-y-2">
                {jobs.jobTypes.map((type) => (
                  <label key={type} className="flex items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleFilterValue(type, selectedTypes, setSelectedTypes)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <p className="text-sm font-semibold text-slate-700 mb-3">Work Mode</p>
              <div className="space-y-2">
                {jobs.workModes.map((mode) => (
                  <label key={mode} className="flex items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={selectedModes.includes(mode)}
                      onChange={() => toggleFilterValue(mode, selectedModes, setSelectedModes)}
                    />
                    {mode}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <p className="text-sm font-semibold text-slate-700 mb-2">Experience</p>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={experienceLimit}
                onChange={(e) => {
                  setExperienceLimit(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full accent-primary-600"
              />
              <p className="text-xs text-slate-500 mt-2">Up to {experienceLimit} years</p>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{filteredJobs.length}</span> jobs found
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="relevance">Sort by: Relevance</option>
              <option value="latest">Sort by: Latest</option>
              <option value="salary">Sort by: Highest Salary</option>
            </select>
          </div>

          {currentJobs.map((job) => (
            <article
              key={job.id}
              onClick={() => setSelectedJobId(job.id)}
              className={`bg-white rounded-2xl border p-5 cursor-pointer transition ${
                selectedJob?.id === job.id
                  ? 'border-primary-500 shadow-md'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{job.company}</p>
                </div>
                {job.urgent ? (
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-orange-100 text-orange-700">
                    Urgent
                  </span>
                ) : null}
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                <span className="px-2 py-1 rounded bg-slate-100">{job.location}</span>
                <span className="px-2 py-1 rounded bg-slate-100">{getExperienceText(job)}</span>
                <span className="px-2 py-1 rounded bg-slate-100">{getSalaryText(job)}</span>
                <span className="px-2 py-1 rounded bg-slate-100">{job.type}</span>
                <span className="px-2 py-1 rounded bg-slate-100">{job.workMode || 'On-site'}</span>
              </div>

              <p className="mt-4 text-sm text-slate-600 line-clamp-2">{job.description}</p>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-slate-500">Posted {job.postedAt}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSave(job.id);
                    }}
                    className="text-sm px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    {savedJobs.includes(job.id) ? 'Saved' : 'Save'}
                  </button>
                  <Link to={applyRedirectPath} onClick={(e) => e.stopPropagation()}>
                    <Button size="sm">Apply</Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}

          <div className="flex items-center justify-between text-sm text-slate-600 bg-white border border-slate-200 rounded-2xl p-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              className="px-3 py-1.5 rounded border border-slate-200 disabled:opacity-40"
            >
              Previous
            </button>
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              className="px-3 py-1.5 rounded border border-slate-200 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </main>

        <aside className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sticky top-44">
            {selectedJob ? (
              <>
                <h3 className="text-lg font-semibold text-slate-900">{selectedJob.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{selectedJob.company}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                  <span className="px-2 py-1 rounded bg-slate-100">{selectedJob.location}</span>
                  <span className="px-2 py-1 rounded bg-slate-100">{getExperienceText(selectedJob)}</span>
                  <span className="px-2 py-1 rounded bg-slate-100">{getSalaryText(selectedJob)}</span>
                </div>
                <p className="mt-4 text-sm text-slate-700">{selectedJob.description}</p>
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {(selectedJob.skills || []).map((skill) => (
                      <span key={skill} className="text-xs px-2 py-1 rounded-full bg-primary-50 text-primary-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <Link to={applyRedirectPath} className="block mt-6">
                  <Button className="w-full">Apply on JobPortal</Button>
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
