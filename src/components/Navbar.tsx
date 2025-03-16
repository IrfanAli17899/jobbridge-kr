
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Search, User, BriefcaseBusiness, Globe } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 z-10"
          >
            <Globe className="h-6 w-6 text-primary animate-pulse" />
            <span className="font-bold text-xl tracking-tight">KorJobs</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/' ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/jobs" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/jobs' ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Jobs
            </Link>
            <Link 
              to="/dashboard" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/dashboard' ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Dashboard
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard" className="hover-transition">
                <BriefcaseBusiness className="mr-2 h-4 w-4" />
                Employer Login
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/jobs" className="hover-transition">
                <Search className="mr-2 h-4 w-4" />
                Find Jobs
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none z-10"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <div className="fixed inset-0 bg-white dark:bg-slate-900 pt-20 px-4 md:hidden animate-fade-in">
          <nav className="flex flex-col space-y-6 text-center">
            <Link 
              to="/" 
              className="text-lg font-medium py-2 hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/jobs" 
              className="text-lg font-medium py-2 hover:text-primary transition-colors"
            >
              Jobs
            </Link>
            <Link 
              to="/dashboard" 
              className="text-lg font-medium py-2 hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <hr className="border-t border-border mx-12" />
            <Button variant="outline" size="lg" className="w-full" asChild>
              <Link to="/dashboard">
                <User className="mr-2 h-5 w-5" />
                Employer Login
              </Link>
            </Button>
            <Button size="lg" className="w-full" asChild>
              <Link to="/jobs">
                <Search className="mr-2 h-5 w-5" />
                Find Jobs
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
