import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useJobContext } from '@/context/JobContext';
import { CountryOfOrigin } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  Globe, 
  FileText, 
  Info, 
  Mail, 
  Phone,
  AlertCircle,
  Loader2,
} from 'lucide-react';

// Define the validation schema
const applicationSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(5, { message: 'Please enter a valid phone number' }),
  country: z.string({ required_error: 'Please select your country of origin' }),
  resume: z.string().url({ message: 'Please enter a valid URL for your resume' }),
  coverLetter: z.string().optional(),
  currentlyInKorea: z.boolean().default(false),
  passportNumber: z.string().optional(),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const Apply = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getJobById, addApplication, loading } = useJobContext();
  const [job, setJob] = useState(getJobById(id || ''));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      resume: '',
      coverLetter: '',
      currentlyInKorea: false,
      passportNumber: '',
      agreeTerms: false,
    },
  });

  useEffect(() => {
    if (id) {
      const jobData = getJobById(id);
      setJob(jobData);

      // If job not found, redirect to jobs page
      if (!jobData) {
        toast({
          title: "Job not found",
          description: "The job you're looking for doesn't exist or has been removed.",
          variant: "destructive",
        });
        navigate('/jobs');
      }

      // Check if job application deadline has passed
      const deadline = new Date(jobData?.applicationDeadline || '');
      const today = new Date();
      if (deadline < today) {
        toast({
          title: "Application closed",
          description: "The application deadline for this job has passed.",
          variant: "destructive",
        });
        navigate(`/job/${id}`);
      }
    }
  }, [id, getJobById, navigate, toast]);

  const onSubmit = (data: ApplicationFormValues) => {
    if (!job) return;
    
    setIsSubmitting(true);
    
    try {
      addApplication({
        jobId: job.id,
        userId: '1', // In a real app, this would be the current user's ID
        resume: data.resume,
        coverLetter: data.coverLetter,
        name: data.name,
        email: data.email,
        phone: data.phone,
        country: data.country as CountryOfOrigin,
        passportNumber: data.passportNumber,
        currentlyInKorea: data.currentlyInKorea,
        languages: [
          {
            language: 'English',
            proficiency: 'Intermediate',
          },
        ],
        documents: [],
      });

      toast({
        title: "Application Submitted",
        description: "Your job application has been successfully submitted!",
      });
      
      // Redirect to success page or job details
      navigate(`/job/${id}?applied=true`);
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !job) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto animate-pulse space-y-6">
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
        <div className="max-w-3xl mx-auto">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate(`/job/${id}`)}
            className="mb-4"
          >
            Back to Job Details
          </Button>

          <div className="mb-6">
            <h1 className="text-3xl font-bold">Apply for {job.title}</h1>
            <div className="flex items-center mt-2 text-muted-foreground">
              <Building2 className="h-4 w-4 mr-1.5" />
              <span>{job.company}</span>
              <span className="mx-2">•</span>
              <MapPin className="h-4 w-4 mr-1.5" />
              <span>{job.location}</span>
              <span className="mx-2">•</span>
              <Briefcase className="h-4 w-4 mr-1.5" />
              <span>{job.type}</span>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Eligible Countries</CardTitle>
              <CardDescription>
                This job is open to applicants from the following countries:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.eligibleCountries.map((country) => (
                  <div key={country} className="flex items-center bg-muted px-3 py-1.5 rounded-full">
                    <Globe className="h-3.5 w-3.5 mr-1.5" />
                    <span className="text-sm">{country}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Form</CardTitle>
              <CardDescription>
                Please fill out all required fields below to apply for this position.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+82 10 1234 5678" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country of Origin</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your country of origin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {job.eligibleCountries.map((country) => (
                                <SelectItem key={country} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                              <SelectItem value="other-country">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Please select your country of origin. This will help us determine your eligibility.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="currentlyInKorea"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Currently in Korea</FormLabel>
                              <FormDescription>
                                Check this if you are already residing in South Korea
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="passportNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Passport Number (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="AB1234567" {...field} />
                            </FormControl>
                            <FormDescription>
                              Your passport number will be kept confidential
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Application Documents</h3>
                    
                    <FormField
                      control={form.control}
                      name="resume"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resume URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/your-resume.pdf" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter a link to your resume (Google Drive, Dropbox, etc.)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="coverLetter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cover Letter (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us why you're interested in this position and why you'd be a good fit..." 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator />
                  
                  <FormField
                    control={form.control}
                    name="agreeTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Terms and Conditions</FormLabel>
                          <FormDescription>
                            I agree to the terms and conditions of this application and certify that all information provided is accurate and complete.
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="bg-muted p-4 rounded-md flex items-start">
                    <Info className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <p className="mb-2">
                        By submitting this application, you understand that:
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Your application will be reviewed by recruiters for {job.company}</li>
                        <li>You may be contacted for additional documents or interviews</li>
                        <li>Visa sponsorship and relocation assistance will be provided as per company policy</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={isSubmitting}
                      className="hover-transition"
                    >
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Submit Application
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 bg-muted/50">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium">Important Notice</p>
                  <p>Application deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <p className="text-sm font-medium">Contact Information:</p>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{job.contactEmail}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Apply;
