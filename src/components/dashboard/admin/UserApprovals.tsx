
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, Search, UserCheck, ExternalLink } from 'lucide-react';
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
} from '@/components/ui/card';

interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

const UserApprovals = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  // Fetch pending users
  const { data: pendingUsers, isLoading, error } = useQuery({
    queryKey: ['pendingUsers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, full_name, created_at')
        .eq('approval_status', 'pending')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as User[];
    },
  });

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
        </CardContent>
      </Card>
    );
  }

  // Check if we have a specific user that needs approval
  const hasSpecificPendingUser = pendingUsers?.some(user => 
    user.id === "e9403c29-af1b-4a35-9d2d-e23ee6eb4136"
  );

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
        {hasSpecificPendingUser && (
          <div className="mb-6 p-4 border border-amber-300 bg-amber-50 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div>
                <h3 className="font-semibold text-amber-800">Priority Approval</h3>
                <p className="text-amber-700 text-sm">A priority user is waiting for your approval: Zaheer Asghar</p>
              </div>
              <Button 
                onClick={() => navigate('/admin/approve/e9403c29-af1b-4a35-9d2d-e23ee6eb4136')}
                className="mt-3 sm:mt-0 bg-amber-500 hover:bg-amber-600 text-white"
              >
                Review Now <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        )}

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
    </Card>
  );
};

export default UserApprovals;
