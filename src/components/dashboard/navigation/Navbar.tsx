
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface NavbarProps {
  setMobileMenuOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setMobileMenuOpen }) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [pendingCount, setPendingCount] = useState(0);
  
  // Fetch pending users count for admins
  useEffect(() => {
    if (!isAdmin) return;
    
    const fetchPendingCount = async () => {
      try {
        const { count, error } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true })
          .eq('approval_status', 'pending');
        
        if (error) {
          console.error('Error fetching pending users:', error);
          return;
        }
        
        setPendingCount(count || 0);
      } catch (error) {
        console.error('Failed to fetch pending users count:', error);
      }
    };
    
    fetchPendingCount();
    
    // Set up real-time subscription for pending users
    const subscription = supabase
      .channel('users-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'users' }, 
        () => {
          fetchPendingCount();
        }
      )
      .subscribe();
    
    return () => {
      subscription.unsubscribe();
    };
  }, [isAdmin]);
  
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
        {isAdmin && pendingCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/admin/approvals')}
            className="relative"
          >
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-amber-500 text-white">
              {pendingCount}
            </Badge>
          </Button>
        )}
        {isAdmin && pendingCount === 0 && (
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        )}
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
