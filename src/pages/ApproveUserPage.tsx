
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import ApproveUser from '@/components/dashboard/admin/ApproveUser';
import { useAuth } from '@/contexts/AuthContext';

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
    navigate('/admin');
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-display font-semibold">User Approval</h1>
        <p className="text-muted-foreground">
          Review and approve the user account
        </p>
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
