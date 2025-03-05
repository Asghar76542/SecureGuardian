
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Check, X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ApproveUserProps {
  userId: string;
  userName?: string;
  userEmail?: string;
  afterApproval?: () => void;
}

const ApproveUser = ({ userId, userName, userEmail, afterApproval }: ApproveUserProps) => {
  const queryClient = useQueryClient();

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
          Review and approve user access to the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        {user && (
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
            <div className="text-sm text-muted-foreground mt-4">
              Approving this user will grant them access to the SecureGuardian platform.
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          variant="outline"
          className="border-red-500 text-red-500 hover:bg-red-500/10"
          disabled={approveMutation.isPending}
        >
          <X className="h-4 w-4 mr-1" /> Reject
        </Button>
        <Button
          className="bg-green-500 hover:bg-green-600"
          onClick={() => approveMutation.mutate()}
          disabled={approveMutation.isPending}
        >
          {approveMutation.isPending ? 'Approving...' : (
            <>
              <Check className="h-4 w-4 mr-1" /> Approve User
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApproveUser;
