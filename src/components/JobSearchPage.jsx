import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, Building2 } from 'lucide-react';
import { useJobContext } from '../context/JobContext';
import { useNavigate } from 'react-router-dom';

const JobSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    department: '',
    location: '',
    function: ''
  });

  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const { setFilteredJobs } = useJobContext();

  // Load dropdown data
  useEffect(() => {
    fetch('https://demo.jobsoid.com/api/v1/departments')
      .then(res => res.json())
      .then(setDepartments)
      .catch(console.error);

    fetch('https://demo.jobsoid.com/api/v1/locations')
      .then(res => res.json())
      .then(setLocations)
      .catch(console.error);

    fetch('https://demo.jobsoid.com/api/v1/functions')
      .then(res => res.json())
      .then(setFunctions)
      .catch(console.error);
  }, []);

  // Load all jobs initially
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    let url = `https://demo.jobsoid.com/api/v1/jobs`;

    const params = [];
    if (searchTerm) params.push(`q=${encodeURIComponent(searchTerm)}`);
    if (selectedFilters.location) params.push(`loc=${selectedFilters.location}`);
    if (selectedFilters.department) params.push(`dept=${selectedFilters.department}`);
    if (selectedFilters.function) params.push(`fun=${selectedFilters.function}`);

    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }

    fetch(url)
      .then(res => res.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data);
      })
      .catch(console.error);
  };

  // ✅ FIX: define handleFilterChange
  const handleFilterChange = (type, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: value
    }));
  };

  const removeFilter = (filterType) => {
    setSelectedFilters((prev) => ({ ...prev, [filterType]: '' }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      department: '',
      location: '',
      function: ''
    });
    setSearchTerm('');
  };

  // Refetch jobs when filters or search change
  useEffect(() => {
    fetchJobs();
  }, [searchTerm, selectedFilters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Search */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for Job"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={selectedFilters.department}
              onChange={(e) => handleFilterChange('department', e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Department</option>
              {departments.map(dep => (
                <option key={dep.id} value={dep.id}>{dep.title}</option>
              ))}
            </select>

            <select
              value={selectedFilters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Location</option>
              {locations.map(loc => (
                <option key={loc.id} value={loc.id}>{loc.title}</option>
              ))}
            </select>

            <select
              value={selectedFilters.function}
              onChange={(e) => handleFilterChange('function', e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Function</option>
              {functions.map(func => (
                <option key={func.id} value={func.id}>{func.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Active Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3">
            {Object.entries(selectedFilters).map(([key, value]) =>
              value && (
                <span key={key} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {key}: {value}
                  <button
                    onClick={() => removeFilter(key)}
                    className="ml-2 inline-flex items-center justify-center w-4 h-4 text-blue-600 hover:bg-blue-200 hover:text-blue-800 focus:outline-none"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )
            )}
            {(selectedFilters.department || selectedFilters.location || selectedFilters.function) && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-green-600 hover:text-green-800 font-medium"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-8">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div
                  onClick={() => navigate(`/jobs/${job.id}`)}
                  className="cursor-pointer"
                >
                  <h2 className="text-xl font-semibold text-gray-900 px-6 py-4">{job.title}</h2>
                </div>
                <div className="px-6 py-6">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    {job.department && (
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 mr-1" />
                        {job.department.title}
                      </div>
                    )}
                    {job.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location.title}
                      </div>
                    )}
                    {job.type && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {job.type}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => navigate(`/jobs/${job.id}`)}
                      className="inline-flex items-center px-6 py-2 border border-blue-300 rounded-full text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Apply
                    </button>
                    <button
                      onClick={() => navigate(`/jobs/${job.id}`)}
                      className="inline-flex items-center px-6 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSearchPage;
