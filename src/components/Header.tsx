
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Menu, X, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, isApproved, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDashboardClick = () => {
    navigate('/dashboard');
    setMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    navigate('/auth');
    setMobileMenuOpen(false);
  };

  const handleSignupClick = () => {
    navigate('/auth/register');
    setMobileMenuOpen(false);
  };

  const handleLogoutClick = () => {
    signOut();
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-xl shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-xl font-display font-semibold">SecureGuardian</span>
        </a>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Features</a>
          <a href="#users" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Who It's For</a>
          <a href="#security" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Security</a>
          <a href="#contact" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Contact</a>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {isApproved && (
                <Button 
                  variant="outline" 
                  className="flex items-center space-x-2"
                  onClick={handleDashboardClick}
                >
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
              )}
              <Button 
                className="button-primary"
                onClick={handleLogoutClick}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline"
                onClick={handleLoginClick}
              >
                Sign In
              </Button>
              <Button 
                className="button-primary"
                onClick={handleSignupClick}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
        
        <button 
          className="md:hidden text-foreground" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card backdrop-blur-lg border-t border-border animate-fade-in">
          <div className="px-6 py-4 space-y-4">
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
            
            {isAuthenticated ? (
              <div className="pt-2 space-y-2">
                {isApproved && (
                  <Button 
                    variant="outline" 
                    className="w-full justify-center"
                    onClick={handleDashboardClick}
                  >
                    Dashboard
                  </Button>
                )}
                <Button 
                  className="button-primary w-full"
                  onClick={handleLogoutClick}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="pt-2 space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-center"
                  onClick={handleLoginClick}
                >
                  Sign In
                </Button>
                <Button 
                  className="button-primary w-full"
                  onClick={handleSignupClick}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
