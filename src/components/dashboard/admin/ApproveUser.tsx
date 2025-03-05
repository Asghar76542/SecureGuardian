
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Check, X, AlertCircle, Shield, User } from 'lucide-react';
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
  const { data: user, isLoading: isUserLoading, error: userError } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (userName && userEmail) return { full_name: userName, email: userEmail };
      
      const { data, error } = await supabase
        .from('users')
        .select('full_name, email')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  // Approve user mutation
  const approveMutation = useMutation({
    mutationFn: async () => {
      // First update user role
      const { error: roleError } = await supabase
        .from('users')
        .update({ role: selectedRole })
        .eq('id', userId);
      
      if (roleError) throw roleError;
      
      // Then approve the user
      const { data, error } = await supabase
        .rpc('approve_user', { user_uuid: userId });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('User approved successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      if (afterApproval) afterApproval();
    },
    onError: (error) => {
      toast.error(`Failed to approve user: ${error.message}`);
    },
  });

  // Reject user mutation
  const rejectMutation = useMutation({
    mutationFn: async () => {
      // Store the rejection reason in a comments field or similar
      // We'll use a separate table or field for this if needed
      console.log("Rejection reason:", rejectionReason);
      
      // Reject the user
      const { data, error } = await supabase
        .rpc('reject_user', { user_uuid: userId });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('User rejected successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      if (afterApproval) afterApproval();
    },
    onError: (error) => {
      toast.error(`Failed to reject user: ${error.message}`);
    },
  });

  if (isUserLoading) {
    return <div className="p-4">Loading user information...</div>;
  }

  if (userError) {
    return (
      <div className="p-4 text-destructive flex items-center">
        <AlertCircle className="mr-2" />
        Error loading user: {(userError as Error).message}
      </div>
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
