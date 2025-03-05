
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireApproved?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  requireAdmin = false,
  requireApproved = true
}: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, isApproved, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Redirect if admin access is required but user is not an admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Redirect if approval is required but user is not approved
  if (requireApproved && !isApproved) {
    return <Navigate to="/auth/pending" replace />;
  }

  // If all checks pass, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
