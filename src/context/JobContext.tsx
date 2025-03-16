
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { JobContextType } from './JobContextType';
import { Job, JobApplication, User, ApplicationStatus } from '@/lib/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
            logo: job.logo,
            location: job.location as any,
            category: job.category as any,
            type: job.type as any,
            experienceLevel: job.experience_level as any,
            salary: {
              min: job.salary_min,
              max: job.salary_max,
              currency: job.salary_currency
            },
            description: job.description,
            requirements: Array.isArray(job.requirements) ? job.requirements : [],
            benefits: Array.isArray(job.benefits) ? job.benefits : [],
            applicationDeadline: new Date(job.application_deadline).toISOString(),
            postedDate: new Date(job.posted_date).toISOString(),
            eligibleCountries: Array.isArray(job.eligible_countries) ? job.eligible_countries as any[] : [],
            contactEmail: job.contact_email,
            visaSponsorship: job.visa_sponsorship,
            accommodationProvided: job.accommodation_provided,
            languageRequirements: job.language_requirements ? {
              korean: job.language_requirements.korean,
              english: job.language_requirements.english
            } : undefined
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
        category: jobData.category,
        type: jobData.type,
        experience_level: jobData.experienceLevel,
        salary_min: jobData.salary.min,
        salary_max: jobData.salary.max,
        salary_currency: jobData.salary.currency,
        description: jobData.description,
        requirements: jobData.requirements,
        benefits: jobData.benefits,
        application_deadline: new Date(jobData.applicationDeadline).toISOString().split('T')[0],
        eligible_countries: jobData.eligibleCountries,
        contact_email: jobData.contactEmail,
        visa_sponsorship: jobData.visaSponsorship,
        accommodation_provided: jobData.accommodationProvided,
        language_requirements: jobData.languageRequirements
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
          logo: data.logo,
          location: data.location as any,
          category: data.category as any,
          type: data.type as any,
          experienceLevel: data.experience_level as any,
          salary: {
            min: data.salary_min,
            max: data.salary_max,
            currency: data.salary_currency
          },
          description: data.description,
          requirements: Array.isArray(data.requirements) ? data.requirements : [],
          benefits: Array.isArray(data.benefits) ? data.benefits : [],
          applicationDeadline: new Date(data.application_deadline).toISOString(),
          postedDate: new Date(data.posted_date).toISOString(),
          eligibleCountries: Array.isArray(data.eligible_countries) ? data.eligible_countries as any[] : [],
          contactEmail: data.contact_email,
          visaSponsorship: data.visa_sponsorship,
          accommodationProvided: data.accommodation_provided,
          languageRequirements: data.language_requirements ? {
            korean: data.language_requirements.korean,
            english: data.language_requirements.english
          } : undefined
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
        category: updatedJob.category,
        type: updatedJob.type,
        experience_level: updatedJob.experienceLevel,
        salary_min: updatedJob.salary.min,
        salary_max: updatedJob.salary.max,
        salary_currency: updatedJob.salary.currency,
        description: updatedJob.description,
        requirements: updatedJob.requirements,
        benefits: updatedJob.benefits,
        application_deadline: new Date(updatedJob.applicationDeadline).toISOString().split('T')[0],
        eligible_countries: updatedJob.eligibleCountries,
        contact_email: updatedJob.contactEmail,
        visa_sponsorship: updatedJob.visaSponsorship,
        accommodation_provided: updatedJob.accommodationProvided,
        language_requirements: updatedJob.languageRequirements
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
        name: applicationData.name,
        email: applicationData.email,
        phone: applicationData.phone,
        country: applicationData.country,
        passport_number: applicationData.passportNumber,
        currently_in_korea: applicationData.currentlyInKorea,
        previous_experience: applicationData.previousExperience,
        education: applicationData.education,
        languages: applicationData.languages,
        documents: applicationData.documents,
        notes: applicationData.notes
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
          appliedDate: new Date(data.applied_date).toISOString(),
          resume: data.resume_url,
          coverLetter: data.cover_letter,
          name: data.name,
          email: data.email,
          phone: data.phone,
          country: data.country as any,
          passportNumber: data.passport_number,
          currentlyInKorea: data.currently_in_korea,
          previousExperience: data.previous_experience,
          education: data.education,
          languages: data.languages,
          documents: data.documents,
          notes: data.notes
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
