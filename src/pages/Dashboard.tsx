
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import SecuritySummary from '@/components/dashboard/SecuritySummary';
import DeviceList from '@/components/dashboard/DeviceList';
import ThreatFeed from '@/components/dashboard/ThreatFeed';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, AlertTriangle, Lock, FileText, History, HelpCircle } from 'lucide-react';

const Dashboard = () => {
  const { profile } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('devices');

  // Determine which tab to show based on the URL
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/dashboard/threats')) {
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
    } else if (path.includes('/dashboard/devices') || path === '/dashboard') {
      setActiveTab('devices');
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
        <TabsList className="grid grid-cols-7 mb-4">
          <TabsTrigger value="devices" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Devices</span>
          </TabsTrigger>
          <TabsTrigger value="threats" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">Threats</span>
          </TabsTrigger>
          <TabsTrigger value="communications" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Communications</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Reports</span>
          </TabsTrigger>
          <TabsTrigger value="incidents" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">Incidents</span>
          </TabsTrigger>
          <TabsTrigger value="mfa" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">MFA</span>
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Support</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="devices">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <div className="xl:col-span-2">
              <DeviceList />
            </div>
            <div>
              <ThreatFeed />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="threats">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Threat Intelligence</h3>
            <p>View and manage security threats affecting your devices.</p>
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
        
        <TabsContent value="incidents">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Incident History</h3>
            <p>Review past security incidents and resolutions.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="mfa">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-4">MFA Management</h3>
            <p>Configure and manage your multi-factor authentication settings.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="support">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Help & Support</h3>
            <p>Get help with security issues and contact support.</p>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Dashboard;
