
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Check, X, AlertCircle, Shield, User, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import type { Database } from '@/integrations/supabase/types';

type UserRole = Database['public']['Enums']['user_role'];

interface ApproveUserProps {
  userId: string;
  userName?: string;
  userEmail?: string;
  afterApproval?: () => void;
}

const ApproveUser = ({ userId, userName, userEmail, afterApproval }: ApproveUserProps) => {
  const queryClient = useQueryClient();
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [rejectionReason, setRejectionReason] = useState<string>('');
  const [showRejectionReason, setShowRejectionReason] = useState<boolean>(false);

  // Fetch user if not provided
  const { data: user, isLoading: isUserLoading, error: userError, refetch: refetchUser } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (userName && userEmail) return { full_name: userName, email: userEmail };
      
      console.log("Fetching user details for approval:", userId);
      const { data, error } = await supabase
        .from('users')
        .select('full_name, email, approval_status')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error("Error fetching user for approval:", error);
        throw error;
      }
      
      console.log("Retrieved user for approval:", data);
      return data;
    },
    enabled: !!userId,
  });

  // Approve user mutation
  const approveMutation = useMutation({
    mutationFn: async () => {
      console.log(`Approving user ${userId} with role ${selectedRole}`);
      
      // First update user role
      const { error: roleError } = await supabase
        .from('users')
        .update({ role: selectedRole })
        .eq('id', userId);
      
      if (roleError) {
        console.error("Error updating role:", roleError);
        throw roleError;
      }
      
      // Then approve the user
      const { data, error } = await supabase
        .rpc('approve_user', { user_uuid: userId });
      
      if (error) {
        console.error("Error approving user:", error);
        throw error;
      }
      
      console.log("User approved successfully:", data);
      return data;
    },
    onSuccess: () => {
      toast.success('User approved successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['pendingUsers'] });
      if (afterApproval) afterApproval();
    },
    onError: (error) => {
      console.error("Approval mutation error:", error);
      toast.error(`Failed to approve user: ${error.message}`);
    },
  });

  // Reject user mutation
  const rejectMutation = useMutation({
    mutationFn: async () => {
      console.log(`Rejecting user ${userId} with reason: ${rejectionReason}`);
      
      // Store the rejection reason in a comments field or similar
      // We'll use a separate table or field for this if needed
      console.log("Rejection reason:", rejectionReason);
      
      // Reject the user
      const { data, error } = await supabase
        .rpc('reject_user', { user_uuid: userId });
      
      if (error) {
        console.error("Error rejecting user:", error);
        throw error;
      }
      
      console.log("User rejected successfully:", data);
      return data;
    },
    onSuccess: () => {
      toast.success('User rejected successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['pendingUsers'] });
      if (afterApproval) afterApproval();
    },
    onError: (error) => {
      console.error("Rejection mutation error:", error);
      toast.error(`Failed to reject user: ${error.message}`);
    },
  });

  if (isUserLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading User Information</CardTitle>
          <CardDescription>Please wait while we fetch the user details...</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={30} className="w-full mt-2" />
        </CardContent>
      </Card>
    );
  }

  if (userError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive flex items-center">
            <AlertCircle className="mr-2" />
            Error Loading User
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Error loading user: {(userError as Error).message}</p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => refetchUser()}
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
        <CardTitle>Approve User Access</CardTitle>
        <CardDescription>
          Review and approve user access to the SecureGuardian platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        {user && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div>
                <span className="font-semibold">Name:</span> {user.full_name}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {user.email}
              </div>
              <div>
                <span className="font-semibold">User ID:</span> {userId}
              </div>
              <div>
                <span className="font-semibold">Status:</span> {user.approval_status || 'pending'}
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <label className="block text-sm font-medium mb-2">
                Assign Role
              </label>
              <Select 
                value={selectedRole} 
                onValueChange={(value: UserRole) => setSelectedRole(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Standard User
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Administrator
                    </div>
                  </SelectItem>
                  <SelectItem value="manager">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Manager
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-2">
                {selectedRole === 'admin' 
                  ? 'Administrators have full access to all platform features including user management.' 
                  : selectedRole === 'manager'
                  ? 'Managers have access to team management and reporting features.'
                  : 'Standard users have limited access to platform features.'}
              </p>
            </div>
            
            {showRejectionReason && (
              <div className="pt-4 space-y-2">
                <label className="block text-sm font-medium">
                  Rejection Reason
                </label>
                <Textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Please provide a reason for rejection"
                  className="w-full"
                  rows={3}
                />
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {!showRejectionReason ? (
          <>
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500/10"
              onClick={() => setShowRejectionReason(true)}
              disabled={approveMutation.isPending || rejectMutation.isPending}
            >
              <X className="h-4 w-4 mr-1" /> Reject
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={() => approveMutation.mutate()}
              disabled={approveMutation.isPending || rejectMutation.isPending}
            >
              {approveMutation.isPending ? 'Approving...' : (
                <>
                  <Check className="h-4 w-4 mr-1" /> Approve User
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={() => setShowRejectionReason(false)}
              disabled={rejectMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => rejectMutation.mutate()}
              disabled={rejectMutation.isPending}
            >
              {rejectMutation.isPending ? 'Rejecting...' : 'Confirm Rejection'}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApproveUser;
