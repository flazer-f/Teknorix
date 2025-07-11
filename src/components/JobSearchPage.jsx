import React, { useState } from 'react';
import { Search, ChevronRight, X, MapPin, Building2 } from 'lucide-react';


const JobSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    department: 'Development',
    location: 'Verna, Goa',
    function: ''
  });
  

  const removeFilter = (filterType) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: ''
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      department: '',
      location: '',
      function: ''
    });
  };

  const jobs = [
    {
      id: 1,
      title: 'Quality Assurance Analyst',
      department: 'Quality Assurance',
      location: 'Verna, Goa',
      type: 'FULL TIME',
      category: 'Quality Assurance'
    },
    {
      id: 2,
      title: 'Quality Assurance Lead',
      department: 'Quality Assurance',
      location: 'Verna, Goa',
      type: 'FULL TIME',
      category: 'Quality Assurance'
    },
    {
      id: 3,
      title: 'Business Analyst',
      department: 'Project Management',
      location: 'Verna, Goa',
      type: 'FULL TIME',
      category: 'Project Management'
    }
  ];

  const groupedJobs = jobs.reduce((acc, job) => {
    if (!acc[job.category]) {
      acc[job.category] = [];
    }
    acc[job.category].push(job);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Search Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for Job"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <button className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-left text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between">
                <span>Department</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="relative">
              <button className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-left text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between">
                <span>Location</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="relative">
              <button className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-left text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between">
                <span>Function</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Active Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3">
            {selectedFilters.department && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {selectedFilters.department}
                <button
                  onClick={() => removeFilter('department')}
                  className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-600 hover:bg-blue-200 hover:text-blue-800 focus:outline-none"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedFilters.location && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {selectedFilters.location}
                <button
                  onClick={() => removeFilter('location')}
                  className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-600 hover:bg-blue-200 hover:text-blue-800 focus:outline-none"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
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
          {Object.entries(groupedJobs).map(([category, categoryJobs]) => (
            <div key={category} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Category Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">{category}</h2>
                <div className="w-12 h-1 bg-blue-500 mt-2"></div>
              </div>

              {/* Jobs in Category */}
              <div className="divide-y divide-gray-200">
                {categoryJobs.map((job) => (
                  <div key={job.id} className="px-6 py-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Building2 className="h-4 w-4 mr-1" />
                            {job.department}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0">
                        <div className="flex items-center space-x-3">
                          <button className="inline-flex items-center px-6 py-2 border border-blue-300 rounded-full text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                            Apply
                          </button>
                          <button className="inline-flex items-center px-6 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors">
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobSearchPage;