
import { Navigate } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Register = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-display font-bold mb-2">Create Your Account</h1>
            <p className="text-muted-foreground">
              Join SecureGuardian to access our advanced security platform
            </p>
          </div>
          
          <AuthForm isLogin={false} />
          
          <Card className="mt-6 border-primary/20 bg-primary/5">
            <CardContent className="p-4 flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">Security Notice</p>
                <p className="text-muted-foreground">
                  For security reasons, all new accounts require administrator approval 
                  before gaining access to the platform.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
