import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Facebook, Linkedin, Twitter, ArrowLeft } from 'lucide-react';

const JobDetailsPage = () => {
  const [jobData, setJobData] = useState(null);
  const [otherJobs, setOtherJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API Configuration- - Replace with your actual Jobsoid API details
  const API_BASE_URL = 'https://api.jobsoid.com/v1';
  const API_KEY = 'your_api_key_here'; // Replace with your actual API key

  // Mock data for demonstration - Replace with actual API calls
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setLoading(true);
        
        // Simulated API call - Replace with actual Jobsoid API endpoint
        // const response = await fetch(`${API_BASE_URL}/jobs/{jobId}`, {
        //   headers: {
        //     'Authorization': `Bearer ${API_KEY}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockJobData = {
          id: '1',
          title: 'React JS - Developer / Sr. Developer',
          department: 'Development',
          location: 'Verna, Goa',
          company: 'Teknorix Systems Goa',
          employmentType: 'FULL TIME',
          description: 'Looking for React / Angular Experts.',
          detailedDescription: 'You must understand the ins and outs of React, with an obsession for code quality. We want someone that is proud and obsessive in delivering quality products. Get-it-done attitude as an independent thinker who enjoys creating solutions in a collaborative environment.',
          requirements: [
            '1+ year of React JS Experience',
            'Understand inheritance in Javascript and object-oriented and functional programming concepts',
            'Extensive experience with ReactJS',
            'Expertise with HTML5 and CSS3',
            'Comfortable translating complex visual designs into clean and modular HTML markup and CSS',
            'Know how to work with version control systems.',
            'Bachelors degree in Computer Science or related technical field.'
          ],
          bonusPoints: [
            'You have an advanced degree (e.g. M.Tech) in Computer Science or a related technical field.',
            'Knowledge of LESS/SASS, Bootstrap, PureCSS',
            'Understanding of memory management in JavaScript.',
            'Experience with Webpack, Typescript, ASP.NET, NodeJS'
          ]
        };

        const mockOtherJobs = [
          {
            id: '2',
            title: 'Quality Assurance Analyst',
            department: 'Quality Assurance',
            location: 'Verna, Goa'
          },
          {
            id: '3',
            title: 'HR Manager',
            department: 'Human Resources',
            location: 'Verna, Goa'
          },
          {
            id: '4',
            title: 'Project Manager',
            department: 'Project Management',
            location: 'Verna, Goa'
          },
          {
            id: '5',
            title: 'Technical Lead - Dot Net / React JS',
            department: 'Development',
            location: 'Verna, Goa'
          }
        ];

        // Simulate API delay
        setTimeout(() => {
          setJobData(mockJobData);
          setOtherJobs(mockOtherJobs);
          setLoading(false);
        }, 1000);

      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobData();
  }, []);

  // Actual API functions (commented out - uncomment and modify as needed)
  /*
  const fetchJobById = async (jobId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching job:', error);
      throw error;
    }
  };

  const fetchAllJobs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  };
  */

  const handleApply = () => {
    // Implement application logic here
    // You might want to redirect to an application form or open a modal
    console.log('Apply button clicked');
  };

  const handleBack = () => {
    // Implement navigation back to job listings
    console.log('Back button clicked');
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
            onClick={handleBack}
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {jobData.description}
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {jobData.detailedDescription}
              </p>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Requirements:
                </h3>
                <ul className="space-y-2">
                  {jobData.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3"></span>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Bonus Points if:
                </h3>
                <ul className="space-y-2">
                  {jobData.bonusPoints.map((bonus, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3"></span>
                      <span className="text-gray-700">{bonus}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Other Job Openings */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                OTHER JOB OPENINGS
              </h3>
              <div className="w-12 h-1 bg-blue-500 mb-6"></div>
              <div className="space-y-4">
                {otherJobs.map((job) => (
                  <div key={job.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <h4 className="font-medium text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                      {job.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Building2 className="h-3 w-3 mr-1" />
                        {job.department}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {job.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Share Job Openings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                SHARE JOB OPENINGS
              </h3>
              <div className="w-12 h-1 bg-blue-500 mb-6"></div>
              <div className="flex space-x-4">
                <button className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <Facebook className="h-5 w-5" />
                </button>
                <button className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <Linkedin className="h-5 w-5" />
                </button>
                <button className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
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