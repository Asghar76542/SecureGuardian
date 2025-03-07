
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, UserPlus, Search, AlertCircle, ExternalLink, UserCheck, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  const [activeFilter, setActiveFilter] = useState('all');
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

  // Filter users based on status and search query
  const filteredUsers = users?.filter(user => {
    // First filter by status
    if (activeFilter !== 'all' && user.approval_status !== activeFilter) {
      return false;
    }
    
    // Then filter by search query
    return user.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const pendingCount = users?.filter(user => user.approval_status === 'pending').length || 0;

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

      {pendingCount > 0 && (
        <div className="mb-6 p-4 border border-amber-300 bg-amber-50 rounded-lg">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <h3 className="font-semibold text-amber-800">Pending Approvals</h3>
              <p className="text-amber-700 text-sm">
                {pendingCount} {pendingCount === 1 ? 'user is' : 'users are'} waiting for your approval
              </p>
            </div>
            <Button 
              onClick={() => navigate('/admin/approvals')} 
              className="mt-3 sm:mt-0 bg-amber-500 hover:bg-amber-600 text-white"
            >
              <UserCheck className="h-4 w-4 mr-1" /> View Approvals
            </Button>
          </div>
        </div>
      )}

      <Tabs value={activeFilter} onValueChange={setActiveFilter} className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              {pendingCount > 0 && (
                <Badge className="ml-2 bg-amber-500">{pendingCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">More Filters</span>
          </Button>
        </div>
        
        <TabsContent value="all">
          <UserTable 
            users={filteredUsers} 
            formatDate={formatDate} 
            getStatusBadge={getStatusBadge} 
            handleApproveClick={handleApproveClick}
            handleRejectClick={handleRejectClick}
            searchQuery={searchQuery}
            navigate={navigate}
          />
        </TabsContent>
        
        <TabsContent value="approved">
          <UserTable 
            users={filteredUsers} 
            formatDate={formatDate} 
            getStatusBadge={getStatusBadge} 
            handleApproveClick={handleApproveClick}
            handleRejectClick={handleRejectClick}
            searchQuery={searchQuery}
            navigate={navigate}
          />
        </TabsContent>
        
        <TabsContent value="pending">
          <UserTable 
            users={filteredUsers} 
            formatDate={formatDate} 
            getStatusBadge={getStatusBadge} 
            handleApproveClick={handleApproveClick}
            handleRejectClick={handleRejectClick}
            searchQuery={searchQuery}
            navigate={navigate}
          />
        </TabsContent>
        
        <TabsContent value="rejected">
          <UserTable 
            users={filteredUsers} 
            formatDate={formatDate} 
            getStatusBadge={getStatusBadge} 
            handleApproveClick={handleApproveClick}
            handleRejectClick={handleRejectClick}
            searchQuery={searchQuery}
            navigate={navigate}
          />
        </TabsContent>
      </Tabs>

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

// Extract the table component for reuse
interface UserTableProps {
  users?: User[];
  formatDate: (date: string | null) => string;
  getStatusBadge: (status: string) => JSX.Element;
  handleApproveClick: (user: User) => void;
  handleRejectClick: (user: User) => void;
  searchQuery: string;
  navigate: (path: string) => void;
}

const UserTable = ({ 
  users, 
  formatDate, 
  getStatusBadge, 
  handleApproveClick, 
  handleRejectClick,
  searchQuery,
  navigate
}: UserTableProps) => {
  return (
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
          {users && users.length > 0 ? (
            users.map((user) => (
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
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8"
                        onClick={() => navigate(`/admin/approve/${user.id}`)}
                      >
                        Review
                      </Button>
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
  );
};

export default UserManagement;
