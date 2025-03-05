
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ApproveUser from '@/components/dashboard/admin/ApproveUser';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

const QuickApproval = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  const [showMessage, setShowMessage] = useState(false);

  // The specific user ID we need to approve (Zaheer Asghar)
  const userIdToApprove = "e9403c29-af1b-4a35-9d2d-e23ee6eb4136";
  const userName = "zaheer asghar";
  const userEmail = "786asghar765@gmail.com";

  useEffect(() => {
    // Show message after a delay if not authenticated or not admin
    if (!isAuthenticated || !isAdmin) {
      const timer = setTimeout(() => {
        setShowMessage(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isAdmin]);

  const handleAfterApproval = () => {
    // Navigate back to the admin dashboard after approval
    navigate('/admin');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="glass-panel p-8 rounded-xl max-w-md text-center">
          <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-display font-semibold mb-4">Admin Access Required</h1>
          <p className="mb-6">You need to sign in with an admin account to approve users.</p>
          {showMessage && (
            <div className="mt-4 text-sm text-muted-foreground">
              Please sign in first to continue.
            </div>
          )}
          <Button onClick={() => navigate('/auth')} className="button-primary w-full">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="glass-panel p-8 rounded-xl max-w-md text-center">
          <Shield className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-display font-semibold mb-4">Admin Access Required</h1>
          <p className="mb-6">Only administrators can approve new users.</p>
          {showMessage && (
            <div className="mt-4 text-sm text-muted-foreground">
              Your account doesn't have admin privileges.
            </div>
          )}
          <Button onClick={() => navigate('/dashboard')} className="button-primary w-full">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Shield className="h-12 w-12 text-primary mx-auto mb-2" />
          <h1 className="text-2xl font-display font-semibold">Quick User Approval</h1>
          <p className="text-muted-foreground">
            Approve access for the pending user
          </p>
        </div>
        
        <ApproveUser 
          userId={userIdToApprove} 
          userName={userName}
          userEmail={userEmail}
          afterApproval={handleAfterApproval}
        />
        
        <div className="mt-4 text-center">
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => navigate('/admin')}
          >
            Back to Admin Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickApproval;
