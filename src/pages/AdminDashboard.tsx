
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import SecuritySummary from '@/components/dashboard/SecuritySummary';
import DeviceList from '@/components/dashboard/DeviceList';
import ThreatFeed from '@/components/dashboard/ThreatFeed';
import UserManagement from '@/components/dashboard/admin/UserManagement';
import UserApprovals from '@/components/dashboard/admin/UserApprovals';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Users, UserCheck, AlertTriangle, Activity, DatabaseZap, ListChecks } from 'lucide-react';
import GlobalThreatMonitor from '@/components/dashboard/admin/GlobalThreatMonitor';
import ComplianceControls from '@/components/dashboard/admin/ComplianceControls';
import SystemLogs from '@/components/dashboard/admin/SystemLogs';

const AdminDashboard = () => {
  const { profile } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');

  // Determine which content to show based on the URL
  const renderContent = () => {
    const path = location.pathname;
    
    // Admin Dashboard Overview
    if (path === '/admin' || path === '/admin/') {
      return (
        <>
          <Tabs defaultValue="overview" className="mt-6 mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="threats" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Global Threats</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
                <div className="xl:col-span-2">
                  <DeviceList isAdmin={true} />
                </div>
                <div>
                  <ThreatFeed showAllThreats={true} />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="threats">
              <GlobalThreatMonitor />
            </TabsContent>
          </Tabs>
        </>
      );
    }
    
    // System Management (Users, Approvals, Audit, Logs)
    else if (location.pathname.includes('/admin/system')) {
      return (
        <>
          <Tabs defaultValue={getSystemTab()} onValueChange={setActiveTab} className="mt-6 mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>User Management</span>
              </TabsTrigger>
              <TabsTrigger value="approvals" className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                <span>User Approvals</span>
              </TabsTrigger>
              <TabsTrigger value="compliance" className="flex items-center gap-2">
                <ListChecks className="h-4 w-4" />
                <span>Compliance</span>
              </TabsTrigger>
              <TabsTrigger value="logs" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span>System Logs</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <UserManagement />
            </TabsContent>
            
            <TabsContent value="approvals">
              <UserApprovals />
            </TabsContent>
            
            <TabsContent value="compliance">
              <ComplianceControls />
            </TabsContent>
            
            <TabsContent value="logs">
              <SystemLogs />
            </TabsContent>
          </Tabs>
        </>
      );
    }
    
    // Default empty state
    return <div>Content not found</div>;
  };

  // Helper function to determine the active tab for System Management
  const getSystemTab = () => {
    if (location.pathname.includes('/admin/users')) return 'users';
    if (location.pathname.includes('/admin/approvals')) return 'approvals';
    if (location.pathname.includes('/admin/audit')) return 'compliance';
    if (location.pathname.includes('/admin/logs')) return 'logs';
    return 'users'; // Default
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-display font-semibold">
          {location.pathname === '/admin' || location.pathname === '/admin/' 
            ? 'Admin Dashboard' 
            : location.pathname.includes('/admin/system')
              ? 'System Management'
              : 'Admin Control Panel'}
        </h1>
        <p className="text-muted-foreground">
          {location.pathname === '/admin' || location.pathname === '/admin/' 
            ? `Welcome, Admin ${profile?.full_name}. This dashboard provides administrative controls and security monitoring.`
            : location.pathname.includes('/admin/system')
              ? 'Manage users, approvals, compliance settings, and system logs.'
              : 'Access administrative controls and configurations.'}
        </p>
      </div>

      <SecuritySummary />
      
      {/* Render the appropriate content based on the current route */}
      {renderContent()}
    </DashboardLayout>
  );
};

export default AdminDashboard;
