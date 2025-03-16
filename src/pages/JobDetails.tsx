
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobContext } from '@/context/JobContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  MapPin, 
  Building2, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Briefcase, 
  GraduationCap,
  Home,
  Globe,
  Mail,
  Clock,
  AlertCircle,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getJobById, loading, setCurrentJob } = useJobContext();
  const [job, setJob] = useState(getJobById(id || ''));

  useEffect(() => {
    if (id) {
      const jobData = getJobById(id);
      setJob(jobData);
      setCurrentJob(jobData || null);

      // If job not found, redirect to jobs page
      if (!jobData) {
        toast({
          title: "Job not found",
          description: "The job you're looking for doesn't exist or has been removed.",
          variant: "destructive",
        });
        navigate('/jobs');
      }
    }

    return () => {
      setCurrentJob(null);
    };
  }, [id, getJobById, navigate, setCurrentJob, toast]);

  const formatSalary = (min: number, max: number, currency: string) => {
    if (currency === 'KRW') {
      return `${(min / 1000000).toFixed(1)}M - ${(max / 1000000).toFixed(1)}M KRW`;
    }
    return `${min} - ${max} ${currency}`;
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading || !job) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded-md w-3/4"></div>
            <div className="h-6 bg-muted rounded-md w-1/2"></div>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded-md"></div>
              <div className="h-4 bg-muted rounded-md"></div>
              <div className="h-4 bg-muted rounded-md w-4/5"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/jobs')}
              className="mb-4"
            >
              Back to Jobs
            </Button>
            
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold">{job.title}</h1>
                <div className="flex items-center mt-2 text-muted-foreground">
                  <Building2 className="h-4 w-4 mr-1.5" />
                  <span className="font-medium">{job.company}</span>
                  <span className="mx-2">•</span>
                  <MapPin className="h-4 w-4 mr-1.5" />
                  <span>{job.location}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-primary text-primary font-medium">
                  {job.type}
                </Badge>
                <Badge variant="outline" className="font-medium">
                  {job.category}
                </Badge>
                <Badge variant="outline" className="font-medium">
                  {job.experienceLevel}
                </Badge>
              </div>
            </div>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {job.logo ? (
                    <img 
                      src={job.logo} 
                      alt={`${job.company} logo`}
                      className="h-16 w-16 object-contain" 
                    />
                  ) : (
                    <div className="h-16 w-16 bg-muted flex items-center justify-center rounded-md">
                      <Building2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <CardTitle>{job.company}</CardTitle>
                    <p className="text-muted-foreground">{job.location}, South Korea</p>
                  </div>
                </div>
                <div className="hidden md:block">
                  <Button 
                    size="lg" 
                    onClick={() => navigate(`/apply/${job.id}`)}
                    className="hover-transition"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground">Salary Range</span>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1.5 text-muted-foreground" />
                    <span className="font-medium">{formatSalary(job.salary.min, job.salary.max, job.salary.currency)}</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground">Experience Level</span>
                  <div className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-1.5 text-muted-foreground" />
                    <span className="font-medium">{job.experienceLevel}</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground">Application Deadline</span>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5 text-muted-foreground" />
                    <span className="font-medium">{formatDate(job.applicationDeadline)}</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground">Job Posted</span>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1.5 text-muted-foreground" />
                    <span className="font-medium">{formatDate(job.postedDate)}</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground">Contact</span>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1.5 text-muted-foreground" />
                    <span className="font-medium">{job.contactEmail}</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground">Job Type</span>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1.5 text-muted-foreground" />
                    <span className="font-medium">{job.type}</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-3">Job Description</h3>
                <p className="text-muted-foreground">{job.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Benefits</h3>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-3">Eligible Countries</h3>
                <div className="flex flex-wrap gap-2">
                  {job.eligibleCountries.map((country) => (
                    <Badge key={country} variant="secondary">
                      <Globe className="h-3.5 w-3.5 mr-1.5" />
                      {country}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {job.visaSponsorship && (
                  <div className="flex items-center p-3 bg-primary/10 rounded-md">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                    <span className="font-medium">Visa Sponsorship Provided</span>
                  </div>
                )}
                
                {job.accommodationProvided && (
                  <div className="flex items-center p-3 bg-primary/10 rounded-md">
                    <Home className="h-5 w-5 text-primary mr-2" />
                    <span className="font-medium">Accommodation Provided</span>
                  </div>
                )}
              </div>
              
              {job.languageRequirements && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Language Requirements</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {job.languageRequirements.korean && (
                      <div className="flex items-center">
                        <span className="text-muted-foreground mr-2">Korean:</span>
                        <span className="font-medium">{job.languageRequirements.korean}</span>
                      </div>
                    )}
                    {job.languageRequirements.english && (
                      <div className="flex items-center">
                        <span className="text-muted-foreground mr-2">English:</span>
                        <span className="font-medium">{job.languageRequirements.english}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <div className="w-full p-4 bg-muted rounded-md flex items-center">
                <AlertCircle className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-sm text-muted-foreground">
                  Application deadline: <span className="font-medium">{formatDate(job.applicationDeadline)}</span>
                </span>
              </div>
              
              <div className="w-full md:hidden">
                <Button 
                  className="w-full hover-transition" 
                  size="lg"
                  onClick={() => navigate(`/apply/${job.id}`)}
                >
                  Apply Now
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <div className="text-center">
            <h3 className="text-xl font-medium mb-4">Ready to Apply?</h3>
            <p className="text-muted-foreground mb-6">
              Make sure you meet all the requirements before applying.
              Have your resume and personal documents ready for submission.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate(`/apply/${job.id}`)}
              className="hover-transition"
            >
              Start Application Process
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobDetails;
