import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Building2, MapPin, Facebook, Linkedin, Twitter, ArrowLeft } from 'lucide-react';
import { useJobContext } from '../context/JobContext';

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { filteredJobs } = useJobContext();

  const otherJobs = (filteredJobs || []).filter((job) => job.id !== jobData?.id);


  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://demo.jobsoid.com/api/v1/jobs/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Parse description to extract overview and requirements
        let parser = new DOMParser();
        let doc = parser.parseFromString(data.description, 'text/html');

        // Extract overview text
        const overviewDiv = doc.querySelector('#job-overview');
        let overview = overviewDiv ? overviewDiv.innerHTML : '';

        // Extract requirements
        const requirementsDiv = doc.querySelector('#requirements');
        let requirementItems = [];
        if (requirementsDiv) {
          requirementsDiv.querySelectorAll('li').forEach(li => {
            requirementItems.push(li.textContent.trim());
          });
        }

        // Extract responsibilities (if needed)
        const responsibilitiesDiv = doc.querySelector('#responsibilities');
        let responsibilities = [];
        if (responsibilitiesDiv) {
          responsibilitiesDiv.querySelectorAll('li').forEach(li => {
            responsibilities.push(li.textContent.trim());
          });
        }

        setJobData({
          id: data.id,
          title: data.title,
          department: data.department ? data.department.title : '',
          location: data.location ? data.location.title : '',
          company: data.company,
          employmentType: data.type,
          overview: overview,
          responsibilities: responsibilities,
          requirements: requirementItems,
          applyUrl: data.applyUrl,
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobData();
  }, [id]);

  const handleApply = () => {
    if (jobData && jobData.applyUrl) {
      window.open(jobData.applyUrl, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading job details: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Job not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(`/`)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </button>
          <div className="text-sm text-gray-600 mb-2">
            {jobData.department} Department At {jobData.company}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {jobData.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center">
              <Building2 className="h-4 w-4 mr-1" />
              {jobData.department}
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {jobData.location}
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {jobData.employmentType}
            </span>
          </div>
          <button
            onClick={handleApply}
            className="bg-blue-500 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              {/* Overview */}
              {jobData.overview && (
                <div
                  className="text-gray-700 mb-6 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: jobData.overview }}
                />
              )}

              {/* Responsibilities */}
              {jobData.responsibilities.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Responsibilities:</h3>
                  <ul className="list-disc list-inside mb-6">
                    {jobData.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {/* Requirements */}
              {jobData.requirements.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements:</h3>
                  <ul className="list-disc list-inside mb-6">
                    {jobData.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">OTHER JOB OPENINGS</h3>
              <div className="w-12 h-1 bg-blue-500 mb-6"></div>
              {otherJobs.length > 0 ? (
                otherJobs.map(job => (
                  <div
                    key={job.id}
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    className="cursor-pointer mb-4 p-3 rounded hover:bg-gray-50 transition"
                  >
                    <h4 className="text-md font-medium text-gray-900">{job.title}</h4>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                      {job.department && <div className="flex items-center"><Building2 className="h-4 w-4 mr-1" />{job.department.title}</div>}
                      {job.location && <div className="flex items-center"><MapPin className="h-4 w-4 mr-1" />{job.location.title}</div>}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No other jobs available.</p>
              )}
            </div>


            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">SHARE JOB OPENINGS</h3>
              <div className="w-12 h-1 bg-blue-500 mb-6"></div>
              <div className="flex space-x-4">
                <button className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50">
                  <Facebook className="h-5 w-5" />
                </button>
                <button className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50">
                  <Linkedin className="h-5 w-5" />
                </button>
                <button className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50">
                  <Twitter className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
