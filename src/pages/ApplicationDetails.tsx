
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobContext } from '@/context/JobContext';
import { useAuth } from '@/context/AuthContext';
import { JobApplication, ApplicationStatus } from '@/lib/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import {
  User,
  Briefcase,
  Calendar,
  FileText,
  MapPin,
  Phone,
  Mail,
  Globe,
  GraduationCap,
  Languages,
  FileCheck,
  Clock,
  Edit,
} from 'lucide-react';

const ApplicationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { applications, jobs, updateApplicationStatus, loading } = useJobContext();
  const { user, isEmployer, isAdmin } = useAuth();
  const { toast } = useToast();
  const [application, setApplication] = useState<JobApplication | null>(null);
  const [job, setJob] = useState(null);
  
  useEffect(() => {
    // Check if user is allowed to view applications
    if (!user || (!isEmployer && !isAdmin)) {
      toast({
        title: "Access denied",
        description: "You don't have permission to view applications.",
        variant: "destructive",
      });
      navigate('/dashboard');
      return;
    }
    
    // Load application data
    if (id) {
      const app = applications.find(app => app.id === id);
      if (!app) {
        toast({
          title: "Application not found",
          description: "The application you're trying to view doesn't exist.",
          variant: "destructive",
        });
        navigate('/dashboard');
        return;
      }
      
      setApplication(app);
      
      // Get associated job
      const jobData = jobs.find(job => job.id === app.jobId);
      if (jobData) {
        setJob(jobData);
      }
    }
  }, [id, applications, jobs, user, isEmployer, isAdmin, navigate, toast]);
  
  const handleStatusChange = (status: string) => {
    if (!application) return;
    
    updateApplicationStatus(application.id, status as ApplicationStatus);
    
    toast({
      title: "Status updated",
      description: `Application status has been updated to ${status}.`
    });
    
    setApplication({
      ...application,
      status: status as ApplicationStatus
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-500';
      case 'Rejected':
        return 'bg-red-500';
      case 'Interview':
        return 'bg-blue-500';
      case 'Documentation':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading || !application) {
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
              onClick={() => navigate('/dashboard')}
              className="mb-4"
            >
              Back to Dashboard
            </Button>
            
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Application Details</h1>
              <Badge className={`${getStatusColor(application.status)} text-white`}>
                {application.status}
              </Badge>
            </div>
          </div>
          
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Applicant Details</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="notes">Notes & Status</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{application.name}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Country of Origin</p>
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                        <p className="font-medium">{application.country}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Email Address</p>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <p className="font-medium">{application.email}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Phone Number</p>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <p className="font-medium">{application.phone}</p>
                      </div>
                    </div>
                    
                    {application.passportNumber && (
                      <div>
                        <p className="text-sm text-muted-foreground">Passport Number</p>
                        <p className="font-medium">{application.passportNumber}</p>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Currently in Korea</p>
                      <p className="font-medium">{application.currentlyInKorea ? 'Yes' : 'No'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Application Date</p>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <p className="font-medium">{formatDate(application.appliedDate)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {job && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="mr-2 h-5 w-5" />
                      Applied for
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex flex-col space-y-2">
                      <h3 className="font-medium text-lg">{job.title}</h3>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1.5" />
                        <span>{job.company}, {job.location}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-fit mt-2"
                        onClick={() => navigate(`/job/${job.id}`)}
                      >
                        View Job Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {application.previousExperience && application.previousExperience.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="mr-2 h-5 w-5" />
                      Work Experience
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {application.previousExperience.map((exp, index) => (
                        <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                          <h4 className="font-medium">{exp.title}</h4>
                          <p className="text-muted-foreground">{exp.company}</p>
                          <p className="text-sm text-muted-foreground">{exp.years} {exp.years === 1 ? 'year' : 'years'}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {application.education && application.education.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <GraduationCap className="mr-2 h-5 w-5" />
                      Education
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {application.education.map((edu, index) => (
                        <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                          <h4 className="font-medium">{edu.degree}</h4>
                          <p className="text-muted-foreground">{edu.institution}</p>
                          <p className="text-sm text-muted-foreground">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {application.languages && application.languages.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Languages className="mr-2 h-5 w-5" />
                      Language Skills
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {application.languages.map((lang, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="font-medium">{lang.language}</span>
                          <span className="text-muted-foreground">{lang.proficiency}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Resume & Cover Letter
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-muted rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-primary" />
                      <div>
                        <p className="font-medium">Resume</p>
                        <p className="text-sm text-muted-foreground">Uploaded during application</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => window.open(application.resume, '_blank')}>
                      View Resume
                    </Button>
                  </div>
                  
                  {application.coverLetter && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Cover Letter</h3>
                      <div className="p-4 bg-muted rounded-md">
                        <p className="whitespace-pre-line">{application.coverLetter}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {application.documents && application.documents.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileCheck className="mr-2 h-5 w-5" />
                      Supporting Documents
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {application.documents.map((doc, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-muted rounded-md">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-primary" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <div className="flex items-center">
                              <Badge 
                                variant={doc.verified ? "default" : "outline"} 
                                className="text-xs"
                              >
                                {doc.verified ? 'Verified' : 'Pending Verification'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => window.open(doc.url, '_blank')}>
                          View Document
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="notes" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Application Status
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm text-muted-foreground">Current Status</p>
                    <div className="flex items-center">
                      <Badge className={`${getStatusColor(application.status)} text-white mr-2`}>
                        {application.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        Last updated: {formatDate(application.appliedDate)}
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Update Status</p>
                    <Select 
                      defaultValue={application.status}
                      onValueChange={handleStatusChange}
                    >
                      <SelectTrigger className="w-full md:w-[250px]">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Reviewing">Reviewing</SelectItem>
                        <SelectItem value="Interview">Interview</SelectItem>
                        <SelectItem value="Documentation">Documentation</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Edit className="mr-2 h-5 w-5" />
                    Notes
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  {application.notes ? (
                    <div className="p-4 bg-muted rounded-md">
                      <p className="whitespace-pre-line">{application.notes}</p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No notes have been added for this application.</p>
                  )}
                </CardContent>
                
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Add/Edit Notes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ApplicationDetails;
