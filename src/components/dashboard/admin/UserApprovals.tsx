
import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, Search, UserCheck, ExternalLink, RefreshCw } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

const UserApprovals = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  // Subscribe to users table changes
  useEffect(() => {
    console.log("Setting up realtime subscription for UserApprovals component");
    
    const subscription = supabase
      .channel('public:users:pendingApprovals')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'users',
          filter: 'approval_status=eq.pending'
        }, 
        (payload) => {
          console.log('Realtime update received for pending users:', payload);
          queryClient.invalidateQueries({ queryKey: ['pendingUsers'] });
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status in UserApprovals:', status);
      });
    
    return () => {
      console.log("Cleaning up realtime subscription in UserApprovals");
      subscription.unsubscribe();
    };
  }, [queryClient]);
  
  // Fetch pending users
  const { data: pendingUsers, isLoading, error, refetch } = useQuery({
    queryKey: ['pendingUsers'],
    queryFn: async () => {
      console.log('Fetching pending users');
      const { data, error } = await supabase
        .from('users')
        .select('id, email, full_name, created_at')
        .eq('approval_status', 'pending')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching pending users:', error);
        toast.error('Failed to load pending users');
        throw error;
      }
      
      console.log('Fetched pending users:', data);
      return data as User[];
    },
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  // Manual fetch for debugging
  const handleManualRefetch = async () => {
    console.log("Manually refreshing pending users data");
    toast.info("Refreshing pending users list...");
    await refetch();
  };

  // Try direct DB query for debugging
  const checkRawPendingUsers = async () => {
    console.log("Running direct DB query for pending users");
    
    try {
      const { data, error, count } = await supabase
        .from('users')
        .select('*', { count: 'exact' })
        .eq('approval_status', 'pending');
      
      console.log("Direct query result:", { data, error, count });
      
      if (error) {
        console.error("Direct query error:", error);
        toast.error("Direct query failed: " + error.message);
      } else if (data && data.length > 0) {
        console.log("Found pending users directly:", data);
        toast.success(`Found ${data.length} pending users directly`);
      } else {
        console.log("No pending users found in direct query");
        toast.info("No pending users found in direct query");
      }
    } catch (err) {
      console.error("Error in direct query:", err);
      toast.error("Error in direct query");
    }
  };

  // Filter users based on search query
  const filteredUsers = pendingUsers?.filter(user => 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading User Approvals</CardTitle>
          <CardDescription>Please wait...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive flex items-center">
            <AlertCircle className="mr-2" />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Error loading pending users: {(error as Error).message}</p>
          <Button 
            onClick={handleManualRefetch} 
            variant="outline" 
            className="mt-4"
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle>User Approvals</CardTitle>
            <CardDescription>
              Review and approve pending user registrations
            </CardDescription>
          </div>
          <div className="mt-4 sm:mt-0 relative w-full sm:w-auto max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredUsers && filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.full_name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(user.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        onClick={() => navigate(`/admin/approve/${user.id}`)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <UserCheck className="h-4 w-4 mr-1" /> Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <UserCheck className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-3" />
            <h3 className="text-lg font-medium mb-1">No Pending Approvals</h3>
            <p className="text-muted-foreground">
              {searchQuery 
                ? 'No pending users found matching your search criteria.' 
                : 'All user registrations have been processed.'}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          className="text-xs" 
          size="sm" 
          onClick={checkRawPendingUsers}
        >
          Check DB Directly
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleManualRefetch}
          className="gap-1"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserApprovals;
