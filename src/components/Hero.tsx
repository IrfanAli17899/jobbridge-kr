
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, BriefcaseBusiness, Globe } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden pt-24 pb-16 md:pb-20 lg:pb-24">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-950 dark:to-blue-950 -z-10"></div>
      <div 
        className="absolute inset-0 opacity-20 -z-10 bg-[url('https://images.unsplash.com/photo-1602391833977-358a52198938')] bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1602391833977-358a52198938?q=80&w=1974')" }}
      ></div>
      
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center space-y-6 pt-8 md:pt-12">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-2 animate-fade-in">
            <Globe className="mr-1 h-3.5 w-3.5" />
            <span>Connect with Korean employers</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-slide-up max-w-3xl">
            Your Path to <span className="text-primary">Professional Success</span> in Korea
          </h1>
          
          <p className="text-muted-foreground max-w-[600px] md:text-lg animate-slide-up animation-delay-100">
            We connect international talent from Pakistan, Vietnam, and beyond with Korean employers looking for qualified workers across various industries.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-200">
            <Button size="lg" onClick={() => navigate('/jobs')} className="hover-transition">
              <Search className="mr-2 h-4 w-4" />
              Find Jobs
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/dashboard')} className="hover-transition">
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              For Employers
            </Button>
          </div>
          
          <div className="w-full max-w-lg mt-8 md:mt-12 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm rounded-lg shadow-sm border border-border p-4 animate-slide-up animation-delay-300">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-primary">5,000+</div>
                <div className="text-sm text-muted-foreground">Available Jobs</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Companies</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-primary">8,000+</div>
                <div className="text-sm text-muted-foreground">Workers Placed</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
