
import { JobApplication } from '@/lib/types';

export const sampleApplications: JobApplication[] = [
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
