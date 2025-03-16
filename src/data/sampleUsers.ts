
import { User } from '@/lib/types';

export const sampleUsers: User[] = [
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
