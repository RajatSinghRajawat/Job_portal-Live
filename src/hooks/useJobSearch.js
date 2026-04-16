import { useMemo, useState } from 'react';

const useJobSearch = (jobs) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedModes, setSelectedModes] = useState([]);

  const toggleValue = (value, selected, setter) => {
    setter(selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const q = query.trim().toLowerCase();
      const loc = location.trim().toLowerCase();
      const matchesQuery = q ? job.title.toLowerCase().includes(q) || job.company.toLowerCase().includes(q) : true;
      const matchesLocation = loc ? job.location.toLowerCase().includes(loc) : true;
      const matchesType = selectedTypes.length ? selectedTypes.includes(job.type) : true;
      const matchesMode = selectedModes.length
        ? selectedModes.some((mode) =>
            mode === 'Remote'
              ? job.location.toLowerCase().includes('remote')
              : mode === 'On-site'
                ? !job.location.toLowerCase().includes('remote')
                : true
          )
        : true;

      return matchesQuery && matchesLocation && matchesType && matchesMode;
    });
  }, [jobs, query, location, selectedTypes, selectedModes]);

  const clearFilters = () => {
    setQuery('');
    setLocation('');
    setSelectedTypes([]);
    setSelectedModes([]);
  };

  return {
    query,
    setQuery,
    location,
    setLocation,
    selectedTypes,
    selectedModes,
    toggleType: (value) => toggleValue(value, selectedTypes, setSelectedTypes),
    toggleMode: (value) => toggleValue(value, selectedModes, setSelectedModes),
    clearFilters,
    filteredJobs,
  };
};

export default useJobSearch;
