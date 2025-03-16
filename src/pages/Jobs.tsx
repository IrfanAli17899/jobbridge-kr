
import React, { useState, useEffect } from 'react';
import { useJobContext } from '@/context/JobContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion';
import { JobCategory, JobLocation, JobType, CountryOfOrigin } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, X, ArrowDownUp } from 'lucide-react';

const Jobs = () => {
  const { jobs, filteredJobs, setFilteredJobs, loading } = useJobContext();
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [visaSponsorship, setVisaSponsorship] = useState<boolean>(false);
  const [accommodationProvided, setAccommodationProvided] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [filtersVisible, setFiltersVisible] = useState<boolean>(false);
  
  // All possible filter options
  const locations: JobLocation[] = ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Ulsan', 'Sejong', 'Remote'];
  const categories: JobCategory[] = ['Manufacturing', 'Construction', 'Agriculture', 'Fishing', 'Service Industry', 'IT & Technology', 'Healthcare', 'Hospitality', 'Education', 'Other'];
  const types: JobType[] = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'];
  const countries: CountryOfOrigin[] = ['Pakistan', 'Vietnam', 'Philippines', 'Indonesia', 'Thailand', 'Cambodia', 'Myanmar', 'Nepal', 'Bangladesh', 'Sri Lanka', 'Other'];
  
  // Apply filters
  useEffect(() => {
    let results = [...jobs];
    
    // Search term
    if (searchTerm) {
      results = results.filter(
        job => 
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Location filter
    if (selectedLocation) {
      results = results.filter(job => job.location === selectedLocation);
    }
    
    // Category filter
    if (selectedCategory) {
      results = results.filter(job => job.category === selectedCategory);
    }
    
    // Job type filter
    if (selectedType) {
      results = results.filter(job => job.type === selectedType);
    }
    
    // Eligible countries filter
    if (selectedCountries.length > 0) {
      results = results.filter(job => 
        job.eligibleCountries.some(country => selectedCountries.includes(country))
      );
    }
    
    // Visa sponsorship filter
    if (visaSponsorship) {
      results = results.filter(job => job.visaSponsorship === true);
    }
    
    // Accommodation filter
    if (accommodationProvided) {
      results = results.filter(job => job.accommodationProvided === true);
    }
    
    // Sorting
    if (sortBy === 'newest') {
      results = results.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    } else if (sortBy === 'deadline') {
      results = results.sort((a, b) => new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime());
    } else if (sortBy === 'salary-high') {
      results = results.sort((a, b) => b.salary.max - a.salary.max);
    } else if (sortBy === 'salary-low') {
      results = results.sort((a, b) => a.salary.min - b.salary.min);
    }
    
    setFilteredJobs(results);
  }, [
    jobs, 
    searchTerm, 
    selectedLocation, 
    selectedCategory, 
    selectedType, 
    selectedCountries, 
    visaSponsorship, 
    accommodationProvided, 
    sortBy,
    setFilteredJobs
  ]);
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLocation('');
    setSelectedCategory('');
    setSelectedType('');
    setSelectedCountries([]);
    setVisaSponsorship(false);
    setAccommodationProvided(false);
    setSortBy('newest');
  };
  
  // Toggle country selection
  const toggleCountrySelection = (country: string) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(selectedCountries.filter(c => c !== country));
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero section */}
        <div className="bg-slate-50 dark:bg-slate-900 py-12">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Find Your Perfect Job in Korea</h1>
              <p className="text-muted-foreground mb-8">
                Browse through our curated list of job opportunities for international workers across various industries in South Korea.
              </p>
              
              {/* Main search bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search jobs by title, company, or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-10 py-6 rounded-full border-muted"
                />
                {searchTerm && (
                  <button 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setSearchTerm('')}
                    aria-label="Clear search"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              
              {/* Mobile filter toggle */}
              <Button 
                variant="outline" 
                className="mt-4 md:hidden"
                onClick={() => setFiltersVisible(!filtersVisible)}
              >
                <Filter className="mr-2 h-4 w-4" />
                {filtersVisible ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="container px-4 md:px-6 mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Filters sidebar */}
            <aside className={`md:col-span-3 space-y-6 ${filtersVisible ? 'block' : 'hidden md:block'}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg flex items-center">
                  <Filter className="mr-2 h-5 w-5" />
                  Filters
                </h2>
                {(selectedLocation || selectedCategory || selectedType || selectedCountries.length > 0 || visaSponsorship || accommodationProvided) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="h-8 px-2 text-muted-foreground hover:text-foreground"
                  >
                    Clear All
                  </Button>
                )}
              </div>
              
              <Accordion type="single" collapsible defaultValue="location" className="w-full">
                <AccordionItem value="location" className="border-b">
                  <AccordionTrigger className="text-sm font-medium">Location</AccordionTrigger>
                  <AccordionContent>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="all-locations">All Locations</SelectItem>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="category" className="border-b">
                  <AccordionTrigger className="text-sm font-medium">Job Category</AccordionTrigger>
                  <AccordionContent>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="all-categories">All Categories</SelectItem>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="type" className="border-b">
                  <AccordionTrigger className="text-sm font-medium">Job Type</AccordionTrigger>
                  <AccordionContent>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="all-types">All Types</SelectItem>
                          {types.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="countries" className="border-b">
                  <AccordionTrigger className="text-sm font-medium">Eligible Countries</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {countries.map((country) => (
                        <div key={country} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`country-${country}`} 
                            checked={selectedCountries.includes(country)}
                            onCheckedChange={() => toggleCountrySelection(country)}
                          />
                          <label 
                            htmlFor={`country-${country}`}
                            className="text-sm cursor-pointer"
                          >
                            {country}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="benefits" className="border-b">
                  <AccordionTrigger className="text-sm font-medium">Benefits</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="visa" 
                          checked={visaSponsorship}
                          onCheckedChange={(checked) => setVisaSponsorship(!!checked)}
                        />
                        <label 
                          htmlFor="visa"
                          className="text-sm cursor-pointer"
                        >
                          Visa Sponsorship
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="accommodation" 
                          checked={accommodationProvided}
                          onCheckedChange={(checked) => setAccommodationProvided(!!checked)}
                        />
                        <label 
                          htmlFor="accommodation"
                          className="text-sm cursor-pointer"
                        >
                          Accommodation Provided
                        </label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </aside>
            
            {/* Main content */}
            <div className="md:col-span-9">
              {/* Sort and results count */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 animate-fade-in">
                <p className="text-muted-foreground mb-2 sm:mb-0">
                  {loading ? 'Loading...' : `${filteredJobs.length} ${filteredJobs.length === 1 ? 'job' : 'jobs'} found`}
                </p>
                
                <div className="flex items-center">
                  <ArrowDownUp className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="deadline">Application Deadline</SelectItem>
                      <SelectItem value="salary-high">Salary (High to Low)</SelectItem>
                      <SelectItem value="salary-low">Salary (Low to High)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Job listings */}
              {loading ? (
                <div className="grid gap-6 animate-pulse">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Card key={i}>
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
              ) : filteredJobs.length > 0 ? (
                <div className="grid gap-6 animate-fade-in">
                  {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 animate-fade-in">
                  <div className="text-muted-foreground text-lg mb-4">No jobs found matching your criteria</div>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Jobs;
