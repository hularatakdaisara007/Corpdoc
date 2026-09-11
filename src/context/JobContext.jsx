import React, { createContext, useContext, useState, useMemo } from 'react';
import { mockJobs } from '../data/mockJobs';

const JobContext = createContext(null);

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState(mockJobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedWorkplace, setSelectedWorkplace] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState('All');

  const getJobById = (id) => {
    return jobs.find((job) => job.id === id) || null;
  };

  const allAvailableSkills = useMemo(() => {
    const skillSet = new Set();
    jobs.forEach((job) => {
      job.requiredSkills.forEach((s) => skillSet.add(s));
    });
    return Array.from(skillSet);
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search text matches title, company, or any skill
      const matchesSearch =
        searchQuery.trim() === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      // Filter by type
      const matchesType = selectedType === 'All' || job.type === selectedType;

      // Filter by location
      const matchesLocation =
        selectedLocation === 'All' ||
        job.location.toLowerCase() === selectedLocation.toLowerCase();

      // Filter by workplace (Remote / On-site / Hybrid)
      const matchesWorkplace =
        selectedWorkplace === 'All' ||
        job.workplace.toLowerCase() === selectedWorkplace.toLowerCase();

      // Filter by skill
      const matchesSkill =
        selectedSkill === 'All' || job.requiredSkills.includes(selectedSkill);

      return matchesSearch && matchesType && matchesLocation && matchesWorkplace && matchesSkill;
    });
  }, [jobs, searchQuery, selectedType, selectedLocation, selectedWorkplace, selectedSkill]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('All');
    setSelectedLocation('All');
    setSelectedWorkplace('All');
    setSelectedSkill('All');
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        filteredJobs,
        searchQuery,
        setSearchQuery,
        selectedType,
        setSelectedType,
        selectedLocation,
        setSelectedLocation,
        selectedWorkplace,
        setSelectedWorkplace,
        selectedSkill,
        setSelectedSkill,
        allAvailableSkills,
        getJobById,
        clearFilters
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) throw new Error('useJobs must be used within a JobProvider');
  return context;
};
