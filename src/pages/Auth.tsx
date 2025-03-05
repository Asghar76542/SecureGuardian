
import { Navigate } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Auth = () => {
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
          <AuthForm isLogin={true} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
