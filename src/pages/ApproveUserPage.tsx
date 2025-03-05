
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import ApproveUser from '@/components/dashboard/admin/ApproveUser';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ApproveUserPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  // Only admins can approve users
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Handle after approval
  const handleAfterApproval = () => {
    navigate('/admin/approvals');
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => navigate('/admin/approvals')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-display font-semibold">User Approval</h1>
          <p className="text-muted-foreground">
            Review and approve the user account
          </p>
        </div>
      </div>
      
      <div className="max-w-md mx-auto">
        {userId ? (
          <ApproveUser 
            userId={userId} 
            afterApproval={handleAfterApproval}
          />
        ) : (
          <div className="glass-panel p-6 rounded-xl">
            No user ID provided. Please select a user from the user management page.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ApproveUserPage;
