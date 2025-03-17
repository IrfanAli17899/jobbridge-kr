
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobContext } from '@/context/JobContext';
import { Job, JobApplication, ApplicationStatus } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  BarChart3,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Filter,
  Globe,
  ListFilter,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Plus,
  RefreshCw,
  Search,
  User,
  Users,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { jobs, applications, updateApplicationStatus } = useJobContext();
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'All'>('All');
  const { toast } = useToast();
  
  const filteredJobs = jobs.filter((job) => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const selectedJobApplications = applications.filter(
    (app) => selectedJobId === null || app.jobId === selectedJobId
  );
  
  const filteredApplications = selectedJobApplications.filter(
    (app) => statusFilter === 'All' || app.status === statusFilter
  );
  
  // Effect to log applications for debugging
  useEffect(() => {
    console.log('All applications:', applications);
    console.log('Filtered applications:', filteredApplications);
  }, [applications, filteredApplications]);
  
  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Reviewing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Interview':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'Documentation':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'Approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  const calculateStats = () => {
    const totalApplications = applications.length;
    const pendingCount = applications.filter(app => app.status === 'Pending').length;
    const interviewCount = applications.filter(app => app.status === 'Interview').length;
    const approvedCount = applications.filter(app => app.status === 'Approved').length;
    
    const applicationsByCountry: Record<string, number> = {};
    applications.forEach(app => {
      if (app.country) {
        applicationsByCountry[app.country] = (applicationsByCountry[app.country] || 0) + 1;
      }
    });
    
    return {
      totalApplications,
      pendingCount,
      interviewCount,
      approvedCount,
      applicationsByCountry,
    };
  };
  
  const stats = calculateStats();
  
  const handleStatusChange = (applicationId: string, newStatus: ApplicationStatus) => {
    updateApplicationStatus(applicationId, newStatus);
    
    toast({
      title: "Application status updated",
      description: `Status changed to ${newStatus}`,
    });
  };
  
  const viewApplicationDetails = (id: string) => {
    navigate(`/application/${id}`);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your job postings and applications
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Total Jobs</p>
                  <h3 className="text-2xl font-bold">{jobs.length}</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Total Applications</p>
                  <h3 className="text-2xl font-bold">{stats.totalApplications}</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <h3 className="text-2xl font-bold">{stats.pendingCount}</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <h3 className="text-2xl font-bold">{stats.approvedCount}</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="applications" className="mb-8">
          <TabsList>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="jobs">Job Postings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="applications" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search applications..."
                    className="w-full md:w-[300px] pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Select
                  value={selectedJobId || "all"}
                  onValueChange={(value) => setSelectedJobId(value === "all" ? null : value)}
                >
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Filter by job" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Jobs</SelectItem>
                    {jobs.map((job) => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value as ApplicationStatus | 'All')}
                >
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Reviewing">Reviewing</SelectItem>
                    <SelectItem value="Interview">Interview</SelectItem>
                    <SelectItem value="Documentation">Documentation</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
            
            {filteredApplications.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No applications found</h3>
                  <p className="text-muted-foreground text-center mt-2 max-w-md">
                    {searchQuery || selectedJobId || statusFilter !== 'All' 
                      ? "Try changing your filters to see more results."
                      : "You haven't received any job applications yet."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredApplications.map((application) => {
                  const job = jobs.find(j => j.id === application.jobId);
                  return (
                    <Card key={application.id} className="overflow-hidden">
                      <div className={`w-full h-1.5 ${getStatusColor(application.status)}`}></div>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                              <User className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{application.name}</h3>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground mt-1">
                                <div className="flex items-center">
                                  <Mail className="h-3.5 w-3.5 mr-1" />
                                  <span>{application.email}</span>
                                </div>
                                <div className="flex items-center">
                                  <Phone className="h-3.5 w-3.5 mr-1" />
                                  <span>{application.phone}</span>
                                </div>
                                <div className="flex items-center">
                                  <Globe className="h-3.5 w-3.5 mr-1" />
                                  <span>{application.country}</span>
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="h-3.5 w-3.5 mr-1" />
                                  <span>Applied on {new Date(application.appliedDate).toLocaleDateString()}</span>
                                </div>
                              </div>
                              
                              {job && (
                                <div className="mt-3 flex items-center text-sm">
                                  <Briefcase className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                                  <span className="text-muted-foreground">Applied for:</span>
                                  <span className="font-medium ml-1">{job.title}</span>
                                  <span className="mx-1.5 text-muted-foreground">•</span>
                                  <Building2 className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                  <span className="text-muted-foreground">{job.company}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row items-center gap-2 ml-0 md:ml-auto">
                            <Badge className={`${getStatusColor(application.status)} font-medium whitespace-nowrap`}>
                              {application.status}
                            </Badge>
                            
                            <Select
                              value={application.status}
                              onValueChange={(value) => 
                                handleStatusChange(application.id, value as ApplicationStatus)
                              }
                            >
                              <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Change status" />
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
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => viewApplicationDetails(application.id)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="jobs" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
                  className="w-full md:w-[300px] pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button onClick={() => navigate('/post-job')} className="gap-1">
                <Plus className="h-4 w-4" />
                Post New Job
              </Button>
            </div>
            
            {filteredJobs.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No jobs found</h3>
                  <p className="text-muted-foreground text-center mt-2 max-w-md">
                    {searchQuery ? "Try changing your search terms to see more results." : "You haven't posted any jobs yet."}
                  </p>
                  <Button className="mt-6 gap-1" onClick={() => navigate('/post-job')}>
                    <Plus className="h-4 w-4" />
                    Post New Job
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => {
                  const jobApplications = applications.filter(app => app.jobId === job.id);
                  const applicationsCount = jobApplications.length;
                  
                  return (
                    <Card key={job.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <CardTitle className="font-bold">{job.title}</CardTitle>
                            <CardDescription>
                              <div className="flex items-center">
                                <Building2 className="h-3.5 w-3.5 mr-1.5" />
                                <span>{job.company}</span>
                              </div>
                            </CardDescription>
                          </div>
                          <Badge variant={job.type === 'Full-time' ? 'default' : 'outline'}>
                            {job.type}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="py-4">
                        <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
                          <div className="flex items-center">
                            <MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            <span>
                              {new Date(job.applicationDeadline).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            <span>{job.category}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            <span>
                              {new Date() > new Date(job.applicationDeadline)
                                ? 'Closed'
                                : 'Active'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <div className="text-sm font-medium">Eligible Countries:</div>
                          <div className="flex flex-wrap gap-1">
                            {job.eligibleCountries.slice(0, 2).map((country) => (
                              <Badge key={country} variant="secondary" className="text-xs">
                                {country}
                              </Badge>
                            ))}
                            {job.eligibleCountries.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{job.eligibleCountries.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                          <div className="text-sm">
                            <span className="font-medium">{applicationsCount}</span>
                            <span className="text-muted-foreground ml-1">
                              {applicationsCount === 1 ? 'application' : 'applications'}
                            </span>
                          </div>
                          <div className="flex -space-x-2">
                            {[...Array(Math.min(3, applicationsCount))].map((_, index) => (
                              <div
                                key={index}
                                className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center border-2 border-background"
                              >
                                <User className="h-3.5 w-3.5 text-primary" />
                              </div>
                            ))}
                            {applicationsCount > 3 && (
                              <div className="w-7 h-7 rounded-full bg-muted-foreground/10 flex items-center justify-center text-xs font-medium border-2 border-background">
                                +{applicationsCount - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="border-t pt-4 flex justify-between">
                        <Button variant="outline" size="sm" onClick={() => navigate(`/job/${job.id}`)}>
                          View
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => navigate(`/edit-job/${job.id}`)}>
                          Edit
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Analytics</CardTitle>
                <CardDescription>
                  Overview of job applications and their statuses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Analytics Coming Soon</h3>
                    <p className="text-muted-foreground mt-2 max-w-md">
                      Detailed analytics and reporting features will be available in a future update.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Applications by Country</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(stats.applicationsByCountry).map(([country, count]) => (
                      <div key={country} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{country}</span>
                        </div>
                        <Badge variant="outline">{count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Application Status Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                        <span>Pending</span>
                      </div>
                      <Badge variant="outline">
                        {applications.filter(app => app.status === 'Pending').length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                        <span>Reviewing</span>
                      </div>
                      <Badge variant="outline">
                        {applications.filter(app => app.status === 'Reviewing').length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
                        <span>Interview</span>
                      </div>
                      <Badge variant="outline">
                        {applications.filter(app => app.status === 'Interview').length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-orange-400 mr-2"></div>
                        <span>Documentation</span>
                      </div>
                      <Badge variant="outline">
                        {applications.filter(app => app.status === 'Documentation').length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                        <span>Approved</span>
                      </div>
                      <Badge variant="outline">
                        {applications.filter(app => app.status === 'Approved').length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                        <span>Rejected</span>
                      </div>
                      <Badge variant="outline">
                        {applications.filter(app => app.status === 'Rejected').length}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
