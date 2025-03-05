
import React from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import SecuritySummary from '@/components/dashboard/SecuritySummary';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { profile } = useAuth();
  const location = useLocation();
  
  // Check if user is admin
  const isAdmin = profile?.role === 'admin';

  return (
    <DashboardLayout>
      <DashboardHeader pathname={location.pathname} profile={profile} />
      <SecuritySummary />
      <DashboardTabs path={location.pathname} isAdmin={isAdmin} />
    </DashboardLayout>
  );
};

export default Dashboard;
