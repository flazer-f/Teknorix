import { createContext, useContext, useState } from 'react';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [filteredJobs, setFilteredJobs] = useState([]);

  return (
    <JobContext.Provider value={{ filteredJobs, setFilteredJobs }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => useContext(JobContext);
