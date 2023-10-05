import React from 'react';

const JobFilter = ({ jobs, selectedJob, onJobChange }) => (
  <select value={selectedJob} onChange={e => onJobChange(e.target.value)}>
    <option value="Все">Все</option>
    {jobs.map(job => (
      <option key={job} value={job}>{job}</option>
    ))}
  </select>
);

export default JobFilter;
