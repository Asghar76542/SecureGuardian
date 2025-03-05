
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Menu, X, User, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, isApproved, isLoading, signOut, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      console.error('Sign out failed:', error);
      toast.error('Failed to sign out. Please try again.');
    } finally {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-xl shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <a 
          href="/" 
          className="flex items-center space-x-2"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
        >
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-xl font-display font-semibold">SecureGuardian</span>
        </a>
        
        {/* Public navigation */}
        {!isAuthenticated && !isLoading && (
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Features</a>
            <a href="#users" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Who It's For</a>
            <a href="#security" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Security</a>
            <a href="#contact" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Contact</a>
          </nav>
        )}
        
        {/* Authenticated navigation */}
        {isAuthenticated && !isLoading && (
          <nav className="hidden md:flex items-center space-x-8">
            {isApproved && (
              <>
                <Button
                  variant="ghost"
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  onClick={() => handleNavigate('/dashboard')}
                >
                  Dashboard
                </Button>
                {isAdmin && (
                  <Button
                    variant="ghost"
                    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                    onClick={() => handleNavigate('/admin')}
                  >
                    Admin
                  </Button>
                )}
                <Button
                  variant="ghost"
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  onClick={() => handleNavigate('/settings')}
                >
                  Settings
                </Button>
              </>
            )}
          </nav>
        )}
        
        {/* Auth buttons - desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoading ? (
            <div className="animate-pulse bg-gray-200 h-10 w-24 rounded-md"></div>
          ) : isAuthenticated ? (
            <div className="flex items-center gap-4">
              {isApproved && (
                <Button 
                  variant="outline" 
                  className="flex items-center space-x-2"
                  onClick={() => handleNavigate('/dashboard')}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
              )}
              <Button 
                variant="destructive"
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          ) : (
            <>
              <Button 
                variant="outline"
                onClick={() => handleNavigate('/auth')}
              >
                Sign In
              </Button>
              <Button 
                className="button-primary"
                onClick={() => handleNavigate('/auth/register')}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-foreground" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card backdrop-blur-lg border-t border-border animate-fade-in">
          <div className="px-6 py-4 space-y-4">
            {isLoading ? (
              <div className="space-y-2">
                <div className="animate-pulse bg-gray-200 h-6 w-full rounded-md"></div>
                <div className="animate-pulse bg-gray-200 h-6 w-full rounded-md"></div>
                <div className="animate-pulse bg-gray-200 h-6 w-full rounded-md"></div>
              </div>
            ) : isAuthenticated ? (
              <>
                {/* Authenticated mobile menu items */}
                {isApproved && (
                  <div className="space-y-3">
                    <button 
                      className="flex items-center text-foreground/80 hover:text-primary py-2 w-full text-left"
                      onClick={() => handleNavigate('/dashboard')}
                    >
                      <LayoutDashboard className="h-5 w-5 mr-2" /> Dashboard
                    </button>
                    
                    {isAdmin && (
                      <button 
                        className="flex items-center text-foreground/80 hover:text-primary py-2 w-full text-left"
                        onClick={() => handleNavigate('/admin')}
                      >
                        <Shield className="h-5 w-5 mr-2" /> Admin Portal
                      </button>
                    )}
                    
                    <button 
                      className="flex items-center text-foreground/80 hover:text-primary py-2 w-full text-left"
                      onClick={() => handleNavigate('/settings')}
                    >
                      <Settings className="h-5 w-5 mr-2" /> Settings
                    </button>
                  </div>
                )}
                
                {/* User info */}
                {profile && (
                  <div className="border-t border-border pt-4 mt-2">
                    <div className="text-sm text-muted-foreground">
                      Signed in as <span className="font-semibold text-foreground">{profile.full_name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{profile.email}</div>
                  </div>
                )}
                
                {/* Sign out button */}
                <div className="pt-2">
                  <Button 
                    variant="destructive"
                    className="w-full flex items-center justify-center"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Public mobile menu items */}
                <a 
                  href="#features" 
                  className="block text-foreground/80 hover:text-primary py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#users" 
                  className="block text-foreground/80 hover:text-primary py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Who It's For
                </a>
                <a 
                  href="#security" 
                  className="block text-foreground/80 hover:text-primary py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Security
                </a>
                <a 
                  href="#contact" 
                  className="block text-foreground/80 hover:text-primary py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
                
                {/* Auth buttons - mobile */}
                <div className="pt-2 space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-center"
                    onClick={() => handleNavigate('/auth')}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="button-primary w-full"
                    onClick={() => handleNavigate('/auth/register')}
                  >
                    Sign Up
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
