
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Job, JobApplication, User, ApplicationStatus } from '@/lib/types';
import { JobContextType } from './JobContextType';
import { sampleJobs } from '@/data/sampleJobs';
import { sampleApplications } from '@/data/sampleApplications';
import { sampleUsers } from '@/data/sampleUsers';
import { 
  getJobById, 
  getApplicationsForJob, 
  addJob as addJobUtil, 
  updateJob as updateJobUtil, 
  deleteJob as deleteJobUtil,
  addApplication as addApplicationUtil,
  updateApplicationStatus as updateApplicationStatusUtil
} from '@/utils/jobUtils';

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>(sampleJobs);
  const [applications, setApplications] = useState<JobApplication[]>(sampleApplications);
  const [users] = useState<User[]>(sampleUsers);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(sampleJobs);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentJob, setCurrentJob] = useState<Job | null>(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const addJob = (jobData: Omit<Job, 'id' | 'postedDate'>) => {
    const newJob = addJobUtil(jobs, jobData);
    setJobs([...jobs, newJob]);
    setFilteredJobs([...jobs, newJob]);
  };

  const updateJob = (updatedJob: Job) => {
    const updatedJobs = updateJobUtil(jobs, updatedJob);
    setJobs(updatedJobs);
    setFilteredJobs(updatedJobs.filter(job => filteredJobs.some(fj => fj.id === job.id)));
  };

  const deleteJob = (id: string) => {
    const updatedJobs = deleteJobUtil(jobs, id);
    setJobs(updatedJobs);
    setFilteredJobs(filteredJobs.filter(job => job.id !== id));
  };

  const addApplication = (applicationData: Omit<JobApplication, 'id' | 'appliedDate' | 'status'>) => {
    const newApplication = addApplicationUtil(applications, applicationData);
    setApplications([...applications, newApplication]);
  };

  const updateApplicationStatus = (id: string, status: ApplicationStatus) => {
    const updatedApplications = updateApplicationStatusUtil(applications, id, status);
    setApplications(updatedApplications);
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        applications,
        users,
        filteredJobs,
        loading,
        error,
        currentJob,
        setFilteredJobs,
        getJobById: (id) => getJobById(jobs, id),
        getApplicationsForJob: (jobId) => getApplicationsForJob(applications, jobId),
        addJob,
        updateJob,
        deleteJob,
        addApplication,
        updateApplicationStatus,
        setCurrentJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobContext must be used within a JobProvider');
  }
  return context;
};
