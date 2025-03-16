
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useJobContext } from '@/context/JobContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import JobCard from '@/components/JobCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MapPin, 
  Building2, 
  GraduationCap, 
  Languages, 
  Home, 
  Landmark, 
  CheckCircle2, 
  ArrowRight,
  Globe,
  UserPlus,
  FileSearch,
  Briefcase
} from 'lucide-react';

const Index = () => {
  const { jobs, loading } = useJobContext();
  const navigate = useNavigate();
  
  // Get featured jobs (first 3)
  const featuredJobs = jobs.slice(0, 3);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Featured Jobs Section */}
        <section className="py-12 md:py-16 bg-white dark:bg-slate-950">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-10 animate-fade-in">
              <h2 className="text-3xl font-bold tracking-tight">Featured Job Opportunities</h2>
              <p className="mt-2 text-muted-foreground">Discover your next career move in Korea</p>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6 space-y-4">
                      <div className="h-6 bg-muted rounded-md w-3/4"></div>
                      <div className="h-4 bg-muted rounded-md w-1/2"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded-md"></div>
                        <div className="h-4 bg-muted rounded-md"></div>
                      </div>
                      <div className="h-10 bg-muted rounded-md w-1/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
                  {featuredJobs.map((job) => (
                    <JobCard key={job.id} job={job} featured={job.id === '1'} />
                  ))}
                </div>
                
                <div className="text-center mt-10 animate-slide-up">
                  <Button onClick={() => navigate('/jobs')} className="hover-transition">
                    Browse All Jobs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-12 md:py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-10 animate-fade-in">
              <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
              <p className="mt-2 text-muted-foreground">Your journey to working in Korea</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
              <Card className="bg-white dark:bg-slate-900 border transition-transform hover:translate-y-[-4px]">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FileSearch className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">1. Find a Job</h3>
                  <p className="text-muted-foreground">Browse job listings and find positions that match your skills and experience.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-slate-900 border transition-transform hover:translate-y-[-4px]">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <UserPlus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">2. Apply Online</h3>
                  <p className="text-muted-foreground">Submit your application, resume, and required documents through our platform.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-slate-900 border transition-transform hover:translate-y-[-4px]">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">3. Get Hired</h3>
                  <p className="text-muted-foreground">Connect with employers, complete the visa process, and begin your career in Korea.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-12 md:py-16 bg-white dark:bg-slate-950">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-up">
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-4">
                  <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                  <span>Benefits of Working in Korea</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">Experience Professional Growth and Cultural Immersion</h2>
                <p className="text-muted-foreground mb-6">Working in South Korea offers more than just employment opportunities. It's a chance to immerse yourself in a vibrant culture while advancing your career.</p>
                
                <ul className="space-y-4">
                  <li className="flex">
                    <Building2 className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Modern Work Environment</h3>
                      <p className="text-sm text-muted-foreground">Experience working in some of the world's most innovative companies and industries.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <Landmark className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Competitive Salaries</h3>
                      <p className="text-sm text-muted-foreground">Earn attractive wages that often include benefits such as housing allowances and healthcare.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <GraduationCap className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Professional Development</h3>
                      <p className="text-sm text-muted-foreground">Gain valuable skills and international experience to enhance your career prospects.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <Home className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Housing Assistance</h3>
                      <p className="text-sm text-muted-foreground">Many employers provide accommodation or housing allowances for international workers.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <Languages className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Language Learning</h3>
                      <p className="text-sm text-muted-foreground">Opportunity to learn Korean while working, with many companies offering language classes.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <Globe className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Cultural Experience</h3>
                      <p className="text-sm text-muted-foreground">Immerse yourself in Korean culture, cuisine, and traditions while building international connections.</p>
                    </div>
                  </li>
                </ul>
                
                <Button className="mt-6 hover-transition" onClick={() => navigate('/jobs')}>
                  Explore Opportunities
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="relative h-[500px] rounded-lg overflow-hidden animate-fade-in">
                <img 
                  src="https://images.unsplash.com/photo-1535189043414-47a3c49a0bed?q=80&w=1469&auto=format&fit=crop"
                  alt="Working in Korea" 
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <div className="text-sm font-medium mb-2">Seoul, South Korea</div>
                  <div className="text-2xl font-bold mb-1">Build Your Future</div>
                  <div className="text-sm opacity-90">Join thousands of international professionals working in Korea</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-12 md:py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-10 animate-fade-in">
              <h2 className="text-3xl font-bold tracking-tight">Success Stories</h2>
              <p className="mt-2 text-muted-foreground">Hear from those who found success through our platform</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
              <Card className="bg-white dark:bg-slate-900">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Testimonial"
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-medium">Ahmad Khan</h3>
                      <p className="text-sm text-muted-foreground">Electronics Technician from Pakistan</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">
                    "Finding work in Korea seemed impossible until I discovered this platform. The application process was straightforward, and within two months, I was working at Samsung's manufacturing plant in Busan."
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-slate-900">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Testimonial"
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-medium">Linh Nguyen</h3>
                      <p className="text-sm text-muted-foreground">IT Specialist from Vietnam</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">
                    "The platform not only helped me find a job but also guided me through the visa process and relocation. I'm now working in Seoul's tech industry and loving the experience!"
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-slate-900">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src="https://randomuser.me/api/portraits/men/62.jpg"
                      alt="Testimonial"
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-medium">Marco Reyes</h3>
                      <p className="text-sm text-muted-foreground">Hospitality Worker from Philippines</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">
                    "Working at a luxury hotel in Jeju Island has been life-changing. The platform matched me with the perfect employer, and the support throughout the process was exceptional."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-primary">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <div className="max-w-2xl mx-auto animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Korean Career Journey?</h2>
              <p className="text-primary-foreground/90 mb-8">
                Join thousands of international workers who have successfully found employment in South Korea through our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  onClick={() => navigate('/jobs')}
                  className="hover-transition"
                >
                  Find Jobs
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent text-white border-white hover:bg-white/10 hover-transition"
                  onClick={() => navigate('/dashboard')}
                >
                  For Employers
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
