
import { Job, JobApplication, User, ApplicationStatus } from '@/lib/types';

export interface JobContextType {
  jobs: Job[];
  applications: JobApplication[];
  users: User[];
  filteredJobs: Job[];
  loading: boolean;
  error: string | null;
  currentJob: Job | null;
  setFilteredJobs: (jobs: Job[]) => void;
  getJobById: (id: string) => Job | undefined;
  getApplicationsForJob: (jobId: string) => JobApplication[];
  addJob: (job: Omit<Job, 'id' | 'postedDate'>) => void;
  updateJob: (job: Job) => void;
  deleteJob: (id: string) => void;
  addApplication: (application: Omit<JobApplication, 'id' | 'appliedDate' | 'status'>) => void;
  updateApplicationStatus: (id: string, status: ApplicationStatus) => void;
  setCurrentJob: (job: Job | null) => void;
}
