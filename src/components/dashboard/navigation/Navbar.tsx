
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
    
    console.log("Admin user - fetching pending users count");
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
        
        console.log(`Found ${count} pending users`);
        setPendingCount(count || 0);
      } catch (error) {
        console.error('Failed to fetch pending users count:', error);
      }
    };
    
    fetchPendingCount();
    
    // Enable realtime updates for pending users
    console.log("Setting up realtime subscription for users table");
    const subscription = supabase
      .channel('users-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'users',
          filter: 'approval_status=eq.pending' 
        }, 
        (payload) => {
          console.log('Realtime update from users table:', payload);
          fetchPendingCount();
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
      });
    
    return () => {
      console.log("Cleaning up realtime subscription");
      subscription.unsubscribe();
    };
  }, [isAdmin]);
  
  // Debug log for rendering
  useEffect(() => {
    console.log("Navbar rendered with pending count:", pendingCount);
  }, [pendingCount]);
  
  const handleViewApprovals = () => {
    console.log("Navigating to approvals page");
    navigate('/admin/approvals');
  };
  
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
        {isAdmin && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleViewApprovals}
            className="relative"
            title="User approvals"
          >
            <Bell className="h-5 w-5" />
            {pendingCount > 0 && (
              <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-amber-500 text-white">
                {pendingCount}
              </Badge>
            )}
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
