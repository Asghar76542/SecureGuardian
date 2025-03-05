
import React from 'react';
import { UserProfile } from '@/integrations/supabase/types';

interface DashboardHeaderProps {
  pathname: string;
  profile?: UserProfile | null;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ pathname, profile }) => {
  // Get title based on route
  const getTitle = () => {
    if (pathname === '/dashboard' || pathname === '/dashboard/') {
      return `Welcome, ${profile?.full_name}`;
    } else if (pathname.includes('/dashboard/devices')) {
      return 'Device Management';
    } else if (pathname.includes('/dashboard/threats')) {
      return 'Threat Intelligence';
    } else if (pathname.includes('/dashboard/communications')) {
      return 'Secure Communications';
    } else if (pathname.includes('/dashboard/reports')) {
      return 'Reports & Compliance';
    } else {
      return 'Dashboard';
    }
  };

  // Get description based on route
  const getDescription = () => {
    if (pathname === '/dashboard' || pathname === '/dashboard/') {
      return 'Your SecureGuardian dashboard provides real-time security monitoring and device management.';
    } else if (pathname.includes('/dashboard/devices')) {
      return 'Manage and monitor all your registered devices from one place.';
    } else if (pathname.includes('/dashboard/threats')) {
      return 'Monitor and respond to security threats affecting your organization.';
    } else if (pathname.includes('/dashboard/communications')) {
      return 'Access encrypted communication channels for secure messaging.';
    } else if (pathname.includes('/dashboard/reports')) {
      return 'Access compliance reports and security documentation.';
    } else {
      return 'Manage your security settings and configurations.';
    }
  };

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-display font-semibold">{getTitle()}</h1>
      <p className="text-muted-foreground">{getDescription()}</p>
    </div>
  );
};

export default DashboardHeader;
