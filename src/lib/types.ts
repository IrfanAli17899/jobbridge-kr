
export type JobLocation = 'Busan' | 'Seoul' | 'Incheon' | 'Daegu' | 'Daejeon' | 'Gwangju' | 'Ulsan' | 'Sejong' | 'Remote';

export type CountryOfOrigin = 'Pakistan' | 'Vietnam' | 'Philippines' | 'Indonesia' | 'Thailand' | 'Cambodia' | 'Myanmar' | 'Nepal' | 'Bangladesh' | 'Sri Lanka' | 'Other';

export type JobCategory = 'Manufacturing' | 'Construction' | 'Agriculture' | 'Fishing' | 'Service Industry' | 'IT & Technology' | 'Healthcare' | 'Hospitality' | 'Education' | 'Other';

export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Temporary' | 'Internship';

export type ExperienceLevel = 'Entry Level' | 'Mid Level' | 'Senior Level';

export type ApplicationStatus = 'Pending' | 'Reviewing' | 'Interview' | 'Documentation' | 'Approved' | 'Rejected';

export interface Job {
  id: string;
  title: string;
  company: string;
  logo?: string;
  location: JobLocation;
  category: JobCategory;
  type: JobType;
  experienceLevel: ExperienceLevel;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  benefits: string[];
  applicationDeadline: string;
  postedDate: string;
  eligibleCountries: CountryOfOrigin[];
  contactEmail: string;
  visaSponsorship: boolean;
  accommodationProvided: boolean;
  languageRequirements?: {
    korean?: string;
    english?: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'jobseeker' | 'employer' | 'admin';
  country: CountryOfOrigin;
  resume?: string;
  profilePicture?: string;
  skills: string[];
  experience: {
    title: string;
    company: string;
    years: number;
  }[];
  education: {
    degree: string;
    institution: string;
    year: number;
  }[];
  languages: {
    language: string;
    proficiency: string;
  }[];
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  status: ApplicationStatus;
  appliedDate: string;
  resume: string;
  coverLetter?: string;
  name: string;
  email: string;
  phone: string;
  country: CountryOfOrigin;
  passportNumber?: string;
  currentlyInKorea: boolean;
  previousExperience?: {
    title: string;
    company: string;
    years: number;
  }[];
  education?: {
    degree: string;
    institution: string;
    year: number;
  }[];
  languages: {
    language: string;
    proficiency: string;
  }[];
  documents?: {
    name: string;
    url: string;
    verified: boolean;
  }[];
  notes?: string;
}
