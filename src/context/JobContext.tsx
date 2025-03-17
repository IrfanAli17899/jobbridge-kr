
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { JobContextType } from './JobContextType';
import { Job, JobApplication, User, ApplicationStatus, JobLocation, JobCategory, JobType, ExperienceLevel, CountryOfOrigin } from '@/lib/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Json } from '@/integrations/supabase/types';

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentJob, setCurrentJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('jobs')
          .select('*');

        if (error) {
          throw error;
        }

        if (data) {
          // Transform the Supabase data to match our Job type
          const transformedJobs: Job[] = data.map(job => ({
            id: job.id,
            title: job.title,
            company: job.company,
            logo: job.logo || '',
            location: job.location as JobLocation,
            category: job.industry as JobCategory, // Map to our type
            type: job.job_type as JobType,        // Map to our type
            experienceLevel: 'Entry Level' as ExperienceLevel, // Default value since DB doesn't have this
            salary: {
              min: 0, // Default values since DB structure is different
              max: 0,
              currency: 'KRW'
            },
            description: job.description,
            requirements: Array.isArray(job.requirements) 
              ? job.requirements.map(req => String(req)) 
              : [],
            benefits: Array.isArray(job.benefits) 
              ? job.benefits.map(benefit => String(benefit)) 
              : [],
            applicationDeadline: new Date().toISOString(), // Default since DB might be missing this
            postedDate: job.created_at || new Date().toISOString(),
            eligibleCountries: [] as CountryOfOrigin[], // Default since DB might be missing this
            contactEmail: 'contact@example.com', // Default since DB might be missing this
            visaSponsorship: false,
            accommodationProvided: false,
            languageRequirements: {
              korean: 'Basic',
              english: 'Basic'
            }
          }));

          setJobs(transformedJobs);
          setFilteredJobs(transformedJobs);
        }
      } catch (err: any) {
        console.error('Error fetching jobs:', err);
        setError(err.message);
        toast.error('Failed to load jobs data');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const getJobById = (id: string): Job | undefined => {
    return jobs.find(job => job.id === id);
  };

  const getApplicationsForJob = (jobId: string): JobApplication[] => {
    return applications.filter(app => app.jobId === jobId);
  };

  const addJob = async (jobData: Omit<Job, 'id' | 'postedDate'>) => {
    try {
      setLoading(true);
      
      // Transform the Job data to match Supabase schema
      const supabaseJobData = {
        title: jobData.title,
        company: jobData.company,
        logo: jobData.logo,
        location: jobData.location,
        industry: jobData.category, // Map to DB column
        job_type: jobData.type,     // Map to DB column
        description: jobData.description,
        requirements: jobData.requirements,
        benefits: jobData.benefits,
        salary: `${jobData.salary.min}-${jobData.salary.max} ${jobData.salary.currency}`,
        status: 'active',
        user_id: supabase.auth.getUser() ? (await supabase.auth.getUser()).data.user?.id : null
      };

      const { data, error } = await supabase
        .from('jobs')
        .insert(supabaseJobData)
        .select()
        .single();

      if (error) throw error;

      if (data) {
        // Transform back to our Job type
        const newJob: Job = {
          id: data.id,
          title: data.title,
          company: data.company,
          logo: data.logo || '',
          location: data.location as JobLocation,
          category: data.industry as JobCategory,
          type: data.job_type as JobType,
          experienceLevel: 'Entry Level' as ExperienceLevel, // Default
          salary: {
            min: 0, // Default
            max: 0,
            currency: 'KRW'
          },
          description: data.description,
          requirements: Array.isArray(data.requirements) 
            ? data.requirements.map(req => String(req)) 
            : [],
          benefits: Array.isArray(data.benefits) 
            ? data.benefits.map(benefit => String(benefit)) 
            : [],
          applicationDeadline: new Date().toISOString(), // Default
          postedDate: data.created_at || new Date().toISOString(),
          eligibleCountries: [] as CountryOfOrigin[], // Default
          contactEmail: 'contact@example.com', // Default
          visaSponsorship: false,
          accommodationProvided: false,
          languageRequirements: {
            korean: 'Basic',
            english: 'Basic'
          }
        };

        setJobs(prevJobs => [...prevJobs, newJob]);
        setFilteredJobs(prevJobs => [...prevJobs, newJob]);
        toast.success('Job posted successfully');
      }
    } catch (err: any) {
      console.error('Error adding job:', err);
      setError(err.message);
      toast.error('Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (updatedJob: Job) => {
    try {
      setLoading(true);
      
      // Transform the Job data to match Supabase schema
      const supabaseJobData = {
        title: updatedJob.title,
        company: updatedJob.company,
        logo: updatedJob.logo,
        location: updatedJob.location,
        industry: updatedJob.category, // Map to DB column
        job_type: updatedJob.type,     // Map to DB column
        description: updatedJob.description,
        requirements: updatedJob.requirements,
        benefits: updatedJob.benefits,
        salary: `${updatedJob.salary.min}-${updatedJob.salary.max} ${updatedJob.salary.currency}`
      };

      const { error } = await supabase
        .from('jobs')
        .update(supabaseJobData)
        .eq('id', updatedJob.id);

      if (error) throw error;

      setJobs(prevJobs => prevJobs.map(job => job.id === updatedJob.id ? updatedJob : job));
      setFilteredJobs(prevJobs => prevJobs.map(job => job.id === updatedJob.id ? updatedJob : job));
      toast.success('Job updated successfully');
    } catch (err: any) {
      console.error('Error updating job:', err);
      setError(err.message);
      toast.error('Failed to update job');
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
      setFilteredJobs(prevJobs => prevJobs.filter(job => job.id !== id));
      toast.success('Job deleted successfully');
    } catch (err: any) {
      console.error('Error deleting job:', err);
      setError(err.message);
      toast.error('Failed to delete job');
    } finally {
      setLoading(false);
    }
  };

  const addApplication = async (applicationData: Omit<JobApplication, 'id' | 'appliedDate' | 'status'>) => {
    try {
      setLoading(true);
      
      // Transform the application data to match Supabase schema
      const supabaseApplicationData = {
        job_id: applicationData.jobId,
        user_id: supabase.auth.getUser() ? (await supabase.auth.getUser()).data.user?.id : null,
        resume_url: applicationData.resume,
        cover_letter: applicationData.coverLetter,
        status: 'Pending' as ApplicationStatus
      };

      const { data, error } = await supabase
        .from('job_applications')
        .insert(supabaseApplicationData)
        .select()
        .single();

      if (error) throw error;

      if (data) {
        // Transform back to our JobApplication type
        const newApplication: JobApplication = {
          id: data.id,
          jobId: data.job_id,
          userId: data.user_id || '',
          status: data.status as ApplicationStatus,
          appliedDate: data.created_at || new Date().toISOString(),
          resume: data.resume_url,
          coverLetter: data.cover_letter,
          name: applicationData.name,
          email: applicationData.email,
          phone: applicationData.phone,
          country: applicationData.country,
          passportNumber: applicationData.passportNumber,
          currentlyInKorea: applicationData.currentlyInKorea,
          previousExperience: applicationData.previousExperience,
          education: applicationData.education,
          languages: applicationData.languages,
          documents: applicationData.documents,
          notes: applicationData.notes
        };

        setApplications(prevApplications => [...prevApplications, newApplication]);
        toast.success('Application submitted successfully');
      }
    } catch (err: any) {
      console.error('Error adding application:', err);
      setError(err.message);
      toast.error('Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id: string, status: ApplicationStatus) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setApplications(prevApplications => 
        prevApplications.map(app => app.id === id ? { ...app, status } : app)
      );
      toast.success('Application status updated');
    } catch (err: any) {
      console.error('Error updating application status:', err);
      setError(err.message);
      toast.error('Failed to update application status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <JobContext.Provider value={{
      jobs,
      applications,
      users,
      filteredJobs,
      loading,
      error,
      currentJob,
      setFilteredJobs,
      getJobById,
      getApplicationsForJob,
      addJob,
      updateJob,
      deleteJob,
      addApplication,
      updateApplicationStatus,
      setCurrentJob
    }}>
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
