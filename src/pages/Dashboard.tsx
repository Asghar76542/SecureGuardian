
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, User, Users, LogOut } from 'lucide-react';

const Dashboard = () => {
  const { isAuthenticated, isApproved, isAdmin, profile, signOut, isLoading } = useAuth();

  // If user is not authenticated, redirect to login
  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/auth" replace />;
  }

  // If user is not approved, redirect to pending page
  if (isAuthenticated && !isApproved && !isLoading) {
    return <Navigate to="/auth/pending" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-display font-semibold">SecureGuardian</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-right">
              <div className="font-medium">{profile?.full_name}</div>
              <div className="text-xs text-muted-foreground">{profile?.role}</div>
            </div>
            <Button variant="ghost" size="icon" onClick={signOut}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="glass-panel rounded-xl p-8 mb-8">
          <h1 className="text-3xl font-display font-semibold mb-4">Welcome, {profile?.full_name}</h1>
          <p className="text-muted-foreground">
            You are logged in as a{isAdmin ? 'n admin' : ' user'}. 
            This is your secure dashboard where you can manage your security settings.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="feature-card">
            <User className="feature-icon" />
            <h2 className="text-xl font-display font-medium mb-2">User Profile</h2>
            <p className="text-muted-foreground mb-4">Manage your personal information and security preferences.</p>
            <Button className="button-secondary w-full">View Profile</Button>
          </div>
          
          {isAdmin && (
            <div className="feature-card">
              <Users className="feature-icon" />
              <h2 className="text-xl font-display font-medium mb-2">User Management</h2>
              <p className="text-muted-foreground mb-4">Review and approve new user registrations.</p>
              <Button className="button-secondary w-full">Manage Users</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
