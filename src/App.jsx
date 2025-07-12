import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import JobSearchPage from "./components/JobSearchPage";
import JobDetailsPage from "./components/JobDetailsPage";
import { JobProvider } from './context/JobContext';

function App() {
  return (
      <JobProvider>
    <Router>
      <Routes>
        <Route path="/" element={<JobSearchPage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />
      </Routes>
    </Router>
    </JobProvider>
  );
}

export default App;
