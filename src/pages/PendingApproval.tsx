
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PendingApproval = () => {
  const { isAuthenticated, isApproved, isLoading, signOut } = useAuth();

  // If user is not authenticated, redirect to login
  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/auth" replace />;
  }

  // If user is already approved, redirect to dashboard
  if (isAuthenticated && isApproved && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="glass-panel rounded-xl p-12 max-w-lg text-center">
          <div className="mb-6 h-20 w-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <Clock className="h-10 w-10 text-primary" />
          </div>
          
          <h1 className="text-3xl font-display font-bold mb-4">Account Pending Approval</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Your account is currently awaiting administrator approval.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            For security reasons, all new accounts require verification before gaining access. 
            This usually takes 24-48 hours. You'll receive an email notification once your 
            account has been approved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
            <Link to="/">
              <Button className="button-primary w-full sm:w-auto">
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PendingApproval;
