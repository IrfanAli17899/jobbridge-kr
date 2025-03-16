
import React from 'react';
import { JobApplication } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, MapPin, FileText, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ApplicationCardProps {
  application: JobApplication;
  showJobTitle?: boolean;
  jobTitle?: string;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ 
  application, 
  showJobTitle = false,
  jobTitle = ''
}) => {
  const navigate = useNavigate();
  
  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Get status badge color based on status
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">Pending</Badge>;
      case 'Reviewing':
        return <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">Reviewing</Badge>;
      case 'Interview':
        return <Badge variant="outline" className="text-purple-500 border-purple-200 bg-purple-50">Interview</Badge>;
      case 'Documentation':
        return <Badge variant="outline" className="text-orange-500 border-orange-200 bg-orange-50">Documentation</Badge>;
      case 'Approved':
        return <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">Approved</Badge>;
      case 'Rejected':
        return <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">{application.name}</h3>
              <p className="text-sm text-muted-foreground">{application.country}</p>
            </div>
          </div>
          {getStatusBadge(application.status)}
        </div>

        {showJobTitle && jobTitle && (
          <div className="mt-3">
            <span className="text-sm text-muted-foreground">Applied for:</span>
            <h4 className="font-medium">{jobTitle}</h4>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="truncate">{application.email}</span>
          </div>
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{application.phone}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{application.country}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Applied on {formatDate(application.appliedDate)}</span>
          </div>
        </div>

        {/* Languages */}
        {application.languages && application.languages.length > 0 && (
          <div className="mt-4">
            <span className="text-sm font-medium">Languages:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {application.languages.map((lang, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs"
                >
                  {lang.language}: {lang.proficiency}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Documents */}
        {application.documents && application.documents.length > 0 && (
          <div className="mt-4">
            <span className="text-sm font-medium">Documents:</span>
            <div className="space-y-1 mt-1">
              {application.documents.map((doc, index) => (
                <div key={index} className="flex items-center text-sm">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{doc.name}</span>
                  {doc.verified ? (
                    <CheckCircle2 className="h-4 w-4 ml-2 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 ml-2 text-amber-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {application.notes && (
          <div className="mt-4 p-3 bg-muted/50 rounded-md text-sm">
            <p className="font-medium text-sm">Notes:</p>
            <p className="text-muted-foreground">{application.notes}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0 mt-4 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(application.resume, '_blank')}
        >
          View Resume
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => navigate(`/dashboard/application/${application.id}`)}
        >
          Manage Application
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
