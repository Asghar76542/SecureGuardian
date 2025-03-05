
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, UserPlus, Search, AlertCircle, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  approval_status: string;
  last_login: string | null;
  created_at: string;
}

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch users
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as User[];
    },
  });

  // Approve user mutation
  const approveMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { data, error } = await supabase
        .rpc('approve_user', { user_uuid: userId });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('User approved successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsApproveDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to approve user: ${error.message}`);
    },
  });

  // Reject user mutation
  const rejectMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { data, error } = await supabase
        .rpc('reject_user', { user_uuid: userId });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('User rejected');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsRejectDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to reject user: ${error.message}`);
    },
  });

  // Filter users based on search query
  const filteredUsers = users?.filter(user => 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApproveClick = (user: User) => {
    setSelectedUser(user);
    setIsApproveDialogOpen(true);
  };

  const handleRejectClick = (user: User) => {
    setSelectedUser(user);
    setIsRejectDialogOpen(true);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Check if we have the specific user that needs approval
  const hasSpecificPendingUser = users?.some(user => 
    user.id === "e9403c29-af1b-4a35-9d2d-e23ee6eb4136" && 
    user.approval_status === "pending"
  );

  if (isLoading) {
    return <div className="glass-panel p-6 rounded-xl">Loading users...</div>;
  }

  if (error) {
    return (
      <div className="glass-panel p-6 rounded-xl text-destructive flex items-center">
        <AlertCircle className="mr-2" />
        Error loading users: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 rounded-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-xl font-display font-semibold">User Management</h2>
          <p className="text-muted-foreground">Manage user access and permissions</p>
        </div>
        <div className="flex mt-4 sm:mt-0 gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button className="button-primary">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite
          </Button>
        </div>
      </div>

      {hasSpecificPendingUser && (
        <div className="mb-6 p-4 border border-amber-300 bg-amber-50 rounded-lg">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <h3 className="font-semibold text-amber-800">Pending Approval</h3>
              <p className="text-amber-700 text-sm">A user is waiting for your approval: Zaheer Asghar</p>
            </div>
            <Link 
              to="/quick-approval" 
              className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 rounded-md bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors"
            >
              Review & Approve <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers && filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.full_name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.approval_status)}</TableCell>
                  <TableCell>{formatDate(user.created_at)}</TableCell>
                  <TableCell>{formatDate(user.last_login)}</TableCell>
                  <TableCell className="text-right">
                    {user.approval_status === 'pending' && (
                      <div className="flex justify-end gap-2">
                        <Link to={`/admin/approve/${user.id}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 border-blue-500 text-blue-500 hover:bg-blue-500/10"
                          >
                            Review
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 border-green-500 text-green-500 hover:bg-green-500/10"
                          onClick={() => handleApproveClick(user)}
                        >
                          <Check className="h-4 w-4 mr-1" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 border-red-500 text-red-500 hover:bg-red-500/10"
                          onClick={() => handleRejectClick(user)}
                        >
                          <X className="h-4 w-4 mr-1" /> Reject
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  {searchQuery ? 'No users found matching your search.' : 'No users found.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Approve User Dialog */}
      <AlertDialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve {selectedUser?.full_name}? This will grant them access to the SecureGuardian platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-green-500 hover:bg-green-600"
              onClick={() => selectedUser && approveMutation.mutate(selectedUser.id)}
              disabled={approveMutation.isPending}
            >
              {approveMutation.isPending ? 'Approving...' : 'Approve User'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject User Dialog */}
      <AlertDialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject {selectedUser?.full_name}? They will not be able to access the SecureGuardian platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-destructive hover:bg-destructive/90"
              onClick={() => selectedUser && rejectMutation.mutate(selectedUser.id)}
              disabled={rejectMutation.isPending}
            >
              {rejectMutation.isPending ? 'Rejecting...' : 'Reject User'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagement;
