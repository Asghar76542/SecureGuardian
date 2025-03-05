
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-3 flex items-center justify-between">
        <a 
          href="/" 
          className="flex items-center space-x-2"
        >
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">SecureGuardian</span>
        </a>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Features</a>
          <a href="#solutions" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Solutions</a>
          <a href="#about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">About</a>
          <a href="#faq" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">FAQ</a>
        </nav>
        
        {/* Auth buttons - desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost"
            className="text-sm font-medium"
            onClick={() => navigate('/auth')}
          >
            Login
          </Button>
          <Button 
            className="bg-white text-black hover:bg-white/90 text-sm"
            onClick={() => navigate('/auth/register')}
          >
            Sign Up
          </Button>
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
        <div className="md:hidden bg-card/95 backdrop-blur-lg border-t border-border animate-fade-in">
          <div className="px-6 py-4 space-y-3">
            <a 
              href="#features" 
              className="block text-foreground/80 hover:text-primary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#solutions" 
              className="block text-foreground/80 hover:text-primary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Solutions
            </a>
            <a 
              href="#about" 
              className="block text-foreground/80 hover:text-primary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#faq" 
              className="block text-foreground/80 hover:text-primary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            
            {/* Auth buttons - mobile */}
            <div className="pt-2 space-y-2">
              <Button 
                variant="ghost" 
                className="w-full justify-center"
                onClick={() => navigate('/auth')}
              >
                Login
              </Button>
              <Button 
                className="bg-white text-black hover:bg-white/90 w-full"
                onClick={() => navigate('/auth/register')}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
