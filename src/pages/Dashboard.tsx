
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import SecuritySummary from '@/components/dashboard/SecuritySummary';
import DeviceList from '@/components/dashboard/DeviceList';
import ThreatFeed from '@/components/dashboard/ThreatFeed';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, AlertTriangle, Lock, FileText, History, HelpCircle, Laptop } from 'lucide-react';

const Dashboard = () => {
  const { profile } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');

  // Determine which tab to show based on the URL
  useEffect(() => {
    const path = location.pathname;
    
    if (path === '/dashboard' || path === '/dashboard/') {
      setActiveTab('overview');
    } else if (path.includes('/dashboard/devices')) {
      setActiveTab('devices');
    } else if (path.includes('/dashboard/threats')) {
      setActiveTab('threats');
    } else if (path.includes('/dashboard/communications')) {
      setActiveTab('communications');
    } else if (path.includes('/dashboard/reports')) {
      setActiveTab('reports');
    } else if (path.includes('/dashboard/incidents')) {
      setActiveTab('incidents');
    } else if (path.includes('/dashboard/mfa')) {
      setActiveTab('mfa');
    } else if (path.includes('/dashboard/support')) {
      setActiveTab('support');
    }
  }, [location.pathname]);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-display font-semibold">Welcome, {profile?.full_name}</h1>
        <p className="text-muted-foreground">
          Your SecureGuardian dashboard provides real-time security monitoring and device management.
        </p>
      </div>

      <SecuritySummary />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6 mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="devices" className="flex items-center gap-2">
            <Laptop className="h-4 w-4" />
            <span>Devices</span>
          </TabsTrigger>
          <TabsTrigger value="threats" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Threats</span>
          </TabsTrigger>
          <TabsTrigger value="communications" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>Communications</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Reports</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <div className="xl:col-span-2">
              <DeviceList />
            </div>
            <div>
              <ThreatFeed />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="devices">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <div className="xl:col-span-3">
              <DeviceList />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="threats">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <div className="xl:col-span-2">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Threat Intelligence</h3>
                <p>View and manage security threats affecting your devices.</p>
              </div>
            </div>
            <div>
              <ThreatFeed />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="communications">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Secure Communications</h3>
            <p>Manage your encrypted communication channels.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="reports">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Compliance Reports</h3>
            <p>View and download security compliance reports.</p>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Dashboard;
