
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Job, JobApplication, User, ApplicationStatus } from '@/lib/types';

// Sample job data
const sampleJobs: Job[] = [
  {
    id: '1',
    title: 'Electronics Factory Worker',
    company: 'Samsung Electronics',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png',
    location: 'Busan',
    category: 'Manufacturing',
    type: 'Full-time',
    experienceLevel: 'Entry Level',
    salary: {
      min: 2200000,
      max: 2800000,
      currency: 'KRW',
    },
    description: 'Join Samsung Electronics as a factory worker in our state-of-the-art electronics manufacturing facility. You will be responsible for assembling components for our latest consumer electronics products.',
    requirements: [
      'High school diploma or equivalent',
      'Ability to stand for long periods',
      'Good eyesight and attention to detail',
      'Basic understanding of safety procedures',
      'Willingness to work in shifts',
    ],
    benefits: [
      'Visa sponsorship',
      'Subsidized housing',
      'Health insurance',
      'Annual round-trip flight to home country',
      'Korean language classes',
    ],
    applicationDeadline: '2023-12-31',
    postedDate: '2023-10-15',
    eligibleCountries: ['Pakistan', 'Vietnam', 'Philippines', 'Indonesia', 'Thailand'],
    contactEmail: 'jobs@samsung.com',
    visaSponsorship: true,
    accommodationProvided: true,
    languageRequirements: {
      korean: 'Basic',
      english: 'Basic',
    },
  },
  {
    id: '2',
    title: 'Construction Worker',
    company: 'Hyundai Engineering & Construction',
    logo: 'https://logoeps.com/wp-content/uploads/2012/10/hyundai-logo-vector.png',
    location: 'Seoul',
    category: 'Construction',
    type: 'Contract',
    experienceLevel: 'Mid Level',
    salary: {
      min: 2500000,
      max: 3200000,
      currency: 'KRW',
    },
    description: 'Hyundai E&C is seeking construction workers for various projects in Seoul. Experience in concrete work, steel fixing, or carpentry is preferred.',
    requirements: [
      'Minimum 2 years of construction experience',
      'Knowledge of construction safety protocols',
      'Ability to work in various weather conditions',
      'Physical stamina and strength',
    ],
    benefits: [
      'Competitive salary',
      'Overtime pay',
      'Worker's compensation insurance',
      'Accommodation arranged',
      'Transportation to and from work sites',
    ],
    applicationDeadline: '2023-11-30',
    postedDate: '2023-10-10',
    eligibleCountries: ['Pakistan', 'Nepal', 'Vietnam', 'Bangladesh'],
    contactEmail: 'recruitment@hyundai-ec.com',
    visaSponsorship: true,
    accommodationProvided: true,
  },
  {
    id: '3',
    title: 'IT Support Specialist',
    company: 'LG CNS',
    logo: 'https://1000logos.net/wp-content/uploads/2017/03/LG-Logo-1995.png',
    location: 'Seoul',
    category: 'IT & Technology',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: {
      min: 3500000,
      max: 4500000,
      currency: 'KRW',
    },
    description: 'LG CNS is looking for IT Support Specialists to join our Seoul headquarters. The role involves providing technical support to internal staff and troubleshooting IT issues.',
    requirements: [
      'Bachelor's degree in IT or related field',
      'At least 2 years of IT support experience',
      'Knowledge of Windows and Mac OS environments',
      'Fluent English communication skills',
      'Basic Korean language skills preferred',
    ],
    benefits: [
      'Competitive salary package',
      'Health and dental insurance',
      'Relocation assistance',
      'Professional development opportunities',
      'Modern office environment',
    ],
    applicationDeadline: '2023-12-15',
    postedDate: '2023-10-05',
    eligibleCountries: ['Pakistan', 'Vietnam', 'Philippines', 'India', 'Sri Lanka'],
    contactEmail: 'careers@lgcns.com',
    visaSponsorship: true,
    accommodationProvided: false,
    languageRequirements: {
      korean: 'Basic',
      english: 'Fluent',
    },
  },
  {
    id: '4',
    title: 'Farm Worker',
    company: 'Jeju Agricultural Cooperative',
    logo: 'https://www.nonghyup.com/Content/images/eng/common/logo.png',
    location: 'Jeju',
    category: 'Agriculture',
    type: 'Seasonal',
    experienceLevel: 'Entry Level',
    salary: {
      min: 1800000,
      max: 2200000,
      currency: 'KRW',
    },
    description: 'Seasonal farm workers needed for citrus harvest on Jeju Island. Work includes picking, sorting, and packing citrus fruits.',
    requirements: [
      'No specific education requirements',
      'Physical stamina for outdoor work',
      'Previous farm work experience is a plus',
      'Ability to work in a team',
    ],
    benefits: [
      'Free housing on farm property',
      'Meals provided',
      'Transportation from mainland Korea',
      'End-of-season bonus based on performance',
    ],
    applicationDeadline: '2023-11-15',
    postedDate: '2023-09-20',
    eligibleCountries: ['Vietnam', 'Cambodia', 'Myanmar', 'Nepal', 'Thailand'],
    contactEmail: 'recruit@jejucoop.kr',
    visaSponsorship: true,
    accommodationProvided: true,
  },
  {
    id: '5',
    title: 'Hotel Housekeeper',
    company: 'Lotte Hotels & Resorts',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Lotte_Hotels_%26_Resorts_Logo.svg/2560px-Lotte_Hotels_%26_Resorts_Logo.svg.png',
    location: 'Busan',
    category: 'Hospitality',
    type: 'Full-time',
    experienceLevel: 'Entry Level',
    salary: {
      min: 2000000,
      max: 2300000,
      currency: 'KRW',
    },
    description: 'Lotte Hotels & Resorts is hiring housekeepers for our 5-star property in Busan. Responsibilities include cleaning guest rooms, public areas, and ensuring high standards of cleanliness.',
    requirements: [
      'Previous housekeeping experience preferred but not required',
      'Attention to detail',
      'Good physical condition',
      'Basic communication skills',
    ],
    benefits: [
      'Staff accommodation available',
      'Meals during shifts',
      'Health insurance',
      'Use of hotel facilities',
      'Training and career advancement opportunities',
    ],
    applicationDeadline: '2023-12-20',
    postedDate: '2023-10-12',
    eligibleCountries: ['Philippines', 'Vietnam', 'Indonesia', 'Thailand', 'Myanmar'],
    contactEmail: 'jobs@lottehotels.com',
    visaSponsorship: true,
    accommodationProvided: true,
    languageRequirements: {
      korean: 'Basic',
      english: 'Basic',
    },
  },
];

// Sample applications
const sampleApplications: JobApplication[] = [
  {
    id: '1',
    jobId: '1',
    userId: '1',
    status: 'Reviewing',
    appliedDate: '2023-10-20',
    resume: 'http://example.com/resume1.pdf',
    coverLetter: 'I am very interested in this position and believe my experience in electronics assembly makes me a strong candidate.',
    name: 'Ali Rahman',
    email: 'ali.rahman@example.com',
    phone: '+92 300 1234567',
    country: 'Pakistan',
    passportNumber: 'AB1234567',
    currentlyInKorea: false,
    previousExperience: [
      {
        title: 'Assembly Line Worker',
        company: 'Tech Solutions Inc.',
        years: 2,
      },
    ],
    education: [
      {
        degree: 'High School Diploma',
        institution: 'Karachi Public School',
        year: 2018,
      },
    ],
    languages: [
      {
        language: 'English',
        proficiency: 'Intermediate',
      },
      {
        language: 'Korean',
        proficiency: 'Basic',
      },
    ],
    documents: [
      {
        name: 'Passport',
        url: 'http://example.com/passport1.pdf',
        verified: true,
      },
      {
        name: 'Education Certificate',
        url: 'http://example.com/certificate1.pdf',
        verified: false,
      },
    ],
    notes: 'Candidate has relevant experience. Schedule initial interview.',
  },
  {
    id: '2',
    jobId: '1',
    userId: '2',
    status: 'Pending',
    appliedDate: '2023-10-22',
    resume: 'http://example.com/resume2.pdf',
    name: 'Nguyen Van Minh',
    email: 'minh.nguyen@example.com',
    phone: '+84 90 1234567',
    country: 'Vietnam',
    currentlyInKorea: false,
    languages: [
      {
        language: 'Vietnamese',
        proficiency: 'Native',
      },
      {
        language: 'English',
        proficiency: 'Basic',
      },
    ],
    documents: [
      {
        name: 'Passport',
        url: 'http://example.com/passport2.pdf',
        verified: false,
      },
    ],
  },
];

// Sample users
const sampleUsers: User[] = [
  {
    id: '1',
    name: 'Ali Rahman',
    email: 'ali.rahman@example.com',
    role: 'jobseeker',
    country: 'Pakistan',
    resume: 'http://example.com/resume1.pdf',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    skills: ['Assembly', 'Quality Control', 'Team Work'],
    experience: [
      {
        title: 'Assembly Line Worker',
        company: 'Tech Solutions Inc.',
        years: 2,
      },
    ],
    education: [
      {
        degree: 'High School Diploma',
        institution: 'Karachi Public School',
        year: 2018,
      },
    ],
    languages: [
      {
        language: 'English',
        proficiency: 'Intermediate',
      },
      {
        language: 'Korean',
        proficiency: 'Basic',
      },
    ],
  },
  {
    id: '2',
    name: 'Nguyen Van Minh',
    email: 'minh.nguyen@example.com',
    role: 'jobseeker',
    country: 'Vietnam',
    profilePicture: 'https://randomuser.me/api/portraits/men/2.jpg',
    skills: ['Factory Work', 'Electronics'],
    experience: [],
    education: [
      {
        degree: 'High School Diploma',
        institution: 'Hanoi Public School',
        year: 2020,
      },
    ],
    languages: [
      {
        language: 'Vietnamese',
        proficiency: 'Native',
      },
      {
        language: 'English',
        proficiency: 'Basic',
      },
    ],
  },
  {
    id: '3',
    name: 'Sarah Kim',
    email: 'sarah.kim@samsung.com',
    role: 'employer',
    country: 'Other',
    profilePicture: 'https://randomuser.me/api/portraits/women/1.jpg',
    skills: [],
    experience: [],
    education: [],
    languages: [],
  },
];

interface JobContextType {
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

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>(sampleJobs);
  const [applications, setApplications] = useState<JobApplication[]>(sampleApplications);
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(sampleJobs);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentJob, setCurrentJob] = useState<Job | null>(null);

  // Simulate loading
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const getJobById = (id: string) => {
    return jobs.find(job => job.id === id);
  };

  const getApplicationsForJob = (jobId: string) => {
    return applications.filter(app => app.jobId === jobId);
  };

  const addJob = (jobData: Omit<Job, 'id' | 'postedDate'>) => {
    const newJob: Job = {
      ...jobData,
      id: (jobs.length + 1).toString(),
      postedDate: new Date().toISOString().split('T')[0],
    };
    setJobs([...jobs, newJob]);
    setFilteredJobs([...jobs, newJob]);
  };

  const updateJob = (updatedJob: Job) => {
    setJobs(jobs.map(job => job.id === updatedJob.id ? updatedJob : job));
    setFilteredJobs(filteredJobs.map(job => job.id === updatedJob.id ? updatedJob : job));
  };

  const deleteJob = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
    setFilteredJobs(filteredJobs.filter(job => job.id !== id));
  };

  const addApplication = (applicationData: Omit<JobApplication, 'id' | 'appliedDate' | 'status'>) => {
    const newApplication: JobApplication = {
      ...applicationData,
      id: (applications.length + 1).toString(),
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };
    setApplications([...applications, newApplication]);
  };

  const updateApplicationStatus = (id: string, status: ApplicationStatus) => {
    setApplications(applications.map(app => app.id === id ? { ...app, status } : app));
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
        getJobById,
        getApplicationsForJob,
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
