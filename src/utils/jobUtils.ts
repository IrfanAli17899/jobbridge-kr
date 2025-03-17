
import { JobLocation, JobCategory, JobType, CountryOfOrigin } from '@/lib/types';

// Job types array
export const jobTypes: JobType[] = [
  'Full-time',
  'Part-time',
  'Contract',
  'Temporary',
  'Seasonal',
  'Internship'
];

// Job categories array
export const jobCategories: JobCategory[] = [
  'Manufacturing',
  'Construction',
  'Agriculture',
  'Fishing',
  'Service Industry',
  'IT & Technology',
  'Healthcare',
  'Hospitality',
  'Education',
  'Other'
];

// Job locations array
export const jobLocations: JobLocation[] = [
  'Busan',
  'Seoul',
  'Incheon',
  'Daegu',
  'Daejeon',
  'Gwangju',
  'Ulsan',
  'Sejong',
  'Jeju',
  'Remote'
];

// Countries of origin array
export const countryOrigins: CountryOfOrigin[] = [
  'Pakistan',
  'Vietnam',
  'Philippines',
  'Indonesia',
  'Thailand',
  'Cambodia',
  'Myanmar',
  'Nepal',
  'Bangladesh',
  'Sri Lanka',
  'India',
  'Other'
];

// Format salary for display
export const formatSalary = (min: number, max: number, currency: string) => {
  if (currency === 'KRW') {
    return `${(min / 1000000).toFixed(1)}M - ${(max / 1000000).toFixed(1)}M KRW`;
  }
  return `${min} - ${max} ${currency}`;
};

// Calculate days since posting
export const calculateDaysAgo = (dateString: string) => {
  const posted = new Date(dateString);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - posted.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
};

// Format date for display
export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
