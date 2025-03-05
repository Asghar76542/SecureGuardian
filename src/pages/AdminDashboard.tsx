
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import SecuritySummary from '@/components/dashboard/SecuritySummary';
import DeviceList from '@/components/dashboard/DeviceList';
import ThreatFeed from '@/components/dashboard/ThreatFeed';
import UserManagement from '@/components/dashboard/admin/UserManagement';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Users, AlertTriangle, Activity } from 'lucide-react';
import GlobalThreatMonitor from '@/components/dashboard/admin/GlobalThreatMonitor';
import ComplianceControls from '@/components/dashboard/admin/ComplianceControls';
import SystemLogs from '@/components/dashboard/admin/SystemLogs';

const AdminDashboard = () => {
  const { profile } = useAuth();

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-display font-semibold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, Admin {profile?.full_name}. This dashboard provides administrative controls and security monitoring.
        </p>
      </div>

      <SecuritySummary />

      <Tabs defaultValue="users" className="mt-6 mb-6">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">User Management</span>
          </TabsTrigger>
          <TabsTrigger value="threats" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">Threat Monitoring</span>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Compliance</span>
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">System Logs</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        
        <TabsContent value="threats">
          <GlobalThreatMonitor />
        </TabsContent>
        
        <TabsContent value="compliance">
          <ComplianceControls />
        </TabsContent>
        
        <TabsContent value="logs">
          <SystemLogs />
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="xl:col-span-2">
          <DeviceList isAdmin={true} />
        </div>
        <div>
          <ThreatFeed showAllThreats={true} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
