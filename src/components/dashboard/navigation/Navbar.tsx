
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  setMobileMenuOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setMobileMenuOpen }) => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-card border-b border-border px-4 py-2 flex items-center justify-between">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setMobileMenuOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex items-center space-x-2 ml-auto">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/settings')}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
