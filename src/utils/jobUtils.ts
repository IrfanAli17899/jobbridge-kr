
import { Job, JobApplication, ApplicationStatus } from '@/lib/types';

export const getJobById = (jobs: Job[], id: string): Job | undefined => {
  return jobs.find(job => job.id === id);
};

export const getApplicationsForJob = (applications: JobApplication[], jobId: string): JobApplication[] => {
  return applications.filter(app => app.jobId === jobId);
};

export const addJob = (jobs: Job[], jobData: Omit<Job, 'id' | 'postedDate'>): Job => {
  const newJob: Job = {
    ...jobData,
    id: (jobs.length + 1).toString(),
    postedDate: new Date().toISOString().split('T')[0],
  };
  return newJob;
};

export const updateJob = (jobs: Job[], updatedJob: Job): Job[] => {
  return jobs.map(job => job.id === updatedJob.id ? updatedJob : job);
};

export const deleteJob = (jobs: Job[], id: string): Job[] => {
  return jobs.filter(job => job.id !== id);
};

export const addApplication = (
  applications: JobApplication[], 
  applicationData: Omit<JobApplication, 'id' | 'appliedDate' | 'status'>
): JobApplication => {
  const newApplication: JobApplication = {
    ...applicationData,
    id: (applications.length + 1).toString(),
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'Pending',
  };
  return newApplication;
};

export const updateApplicationStatus = (
  applications: JobApplication[], 
  id: string, 
  status: ApplicationStatus
): JobApplication[] => {
  return applications.map(app => app.id === id ? { ...app, status } : app);
};
