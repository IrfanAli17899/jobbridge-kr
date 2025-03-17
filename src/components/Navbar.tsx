
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X, User, LogOut } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut, isEmployer, isAdmin } = useAuth();
  
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
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-950 transition-all duration-300 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">KoreaWorks</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/jobs" className="text-sm font-medium hover:text-primary transition-colors">
              Jobs
            </Link>
            {user && (isEmployer || isAdmin) && (
              <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                Dashboard
              </Link>
            )}
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {(isEmployer || isAdmin) && (
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/applications">My Applications</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="text-red-500">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
          
          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-in fade-in">
            <nav className="flex flex-col space-y-4 mb-4">
              <Link 
                to="/" 
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/jobs" 
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Jobs
              </Link>
              {user && (isEmployer || isAdmin) && (
                <Link 
                  to="/dashboard" 
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
            </nav>
            
            <div className="flex flex-col space-y-2 pt-4 border-t">
              {user ? (
                <>
                  <Button variant="ghost" size="sm" asChild onClick={() => setIsMenuOpen(false)}>
                    <Link to="/profile">Profile</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild onClick={() => setIsMenuOpen(false)}>
                    <Link to="/applications">My Applications</Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="justify-start"
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">Sign In</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full justify-start">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
