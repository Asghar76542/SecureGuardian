
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import SecuritySummary from '@/components/dashboard/SecuritySummary';
import DeviceList from '@/components/dashboard/DeviceList';
import ThreatFeed from '@/components/dashboard/ThreatFeed';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { profile } = useAuth();

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-display font-semibold">Welcome, {profile?.full_name}</h1>
        <p className="text-muted-foreground">
          Your SecureGuardian dashboard provides real-time security monitoring and device management.
        </p>
      </div>

      <SecuritySummary />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="xl:col-span-2">
          <DeviceList />
        </div>
        <div>
          <ThreatFeed />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
