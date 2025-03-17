
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Job } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, Calendar, DollarSign, Clock } from 'lucide-react';
import { formatSalary, calculateDaysAgo } from '@/utils/jobUtils';

interface JobCardProps {
  job: Job;
  featured?: boolean;
}

const JobCard = ({ job, featured = false }: JobCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className={`overflow-hidden transition-all hover:shadow-md ${
        featured ? 'border-primary border-2' : ''
      }`}
    >
      <CardContent className="p-0">
        {featured && (
          <div className="bg-primary text-primary-foreground text-xs px-3 py-1 text-center">
            Featured Opportunity
          </div>
        )}
        
        <div className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              {job.logo ? (
                <img 
                  src={job.logo} 
                  alt={`${job.company} logo`} 
                  className="w-12 h-12 object-contain"
                />
              ) : (
                <div className="w-12 h-12 bg-muted flex items-center justify-center rounded-md">
                  <Briefcase className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
              <div>
                <h3 className="font-semibold text-lg line-clamp-1">{job.title}</h3>
                <p className="text-muted-foreground text-sm">{job.company}</p>
              </div>
            </div>
            <Badge variant={job.type === 'Full-time' ? 'default' : 'outline'} className="ml-2">
              {job.type}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1.5" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 mr-1.5" />
              <span>{job.category}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1.5" />
              <span>{formatSalary(job.salary.min, job.salary.max, job.salary.currency)}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1.5" />
              <span>Apply by {new Date(job.applicationDeadline).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1.5" />
              <span>{calculateDaysAgo(job.postedDate)}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm line-clamp-2">{job.description}</p>
          </div>
          
          {job.eligibleCountries && job.eligibleCountries.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1">
              {job.eligibleCountries.map((country) => (
                <Badge key={country} variant="secondary" className="text-xs">
                  {country}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between p-4 pt-0 mt-4 border-t">
        <div className="flex space-x-2">
          {job.visaSponsorship && (
            <Badge variant="outline" className="text-xs">Visa Sponsorship</Badge>
          )}
          {job.accommodationProvided && (
            <Badge variant="outline" className="text-xs">Housing Provided</Badge>
          )}
        </div>
        <Button 
          variant="default" 
          size="sm" 
          onClick={() => navigate(`/job/${job.id}`)}
          className="hover-transition"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
