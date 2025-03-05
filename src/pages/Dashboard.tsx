
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import SecuritySummary from '@/components/dashboard/SecuritySummary';
import DeviceList from '@/components/dashboard/DeviceList';
import ThreatFeed from '@/components/dashboard/ThreatFeed';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, AlertTriangle, Lock, FileText, Laptop, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const { profile } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');

  // Determine which page we are viewing based on URL
  useEffect(() => {
    const path = location.pathname;
    
    if (path === '/dashboard' || path === '/dashboard/') {
      // Main dashboard has overview & insights tabs
    } else if (path.includes('/dashboard/devices')) {
      // Devices page has its own set of tabs
    } else if (path.includes('/dashboard/threats')) {
      // Threats page has its own set of tabs
    } else if (path.includes('/dashboard/communications')) {
      // Communications page has its own set of tabs
    } else if (path.includes('/dashboard/reports')) {
      // Reports page has its own set of tabs
    }
  }, [location.pathname]);

  // Determine which tabs to show based on current route
  const renderContent = () => {
    const path = location.pathname;
    
    // Main Dashboard Overview
    if (path === '/dashboard' || path === '/dashboard/') {
      return (
        <>
          <Tabs defaultValue="overview" className="mt-6 mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>Insights</span>
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
            
            <TabsContent value="insights">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Security Insights</h3>
                <p>View detailed security analytics and performance metrics.</p>
              </div>
            </TabsContent>
          </Tabs>
        </>
      );
    }
    
    // Devices Page
    else if (path.includes('/dashboard/devices')) {
      return (
        <>
          <Tabs defaultValue="all-devices" className="mt-6 mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="all-devices" className="flex items-center gap-2">
                <Laptop className="h-4 w-4" />
                <span>All Devices</span>
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Pending Approval</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all-devices">
              <DeviceList />
            </TabsContent>
            
            <TabsContent value="pending">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Devices Pending Approval</h3>
                <p>Review new device registrations waiting for your authorization.</p>
              </div>
            </TabsContent>
          </Tabs>
        </>
      );
    }
    
    // Threats Page
    else if (path.includes('/dashboard/threats')) {
      return (
        <>
          <Tabs defaultValue="active" className="mt-6 mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="active" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Active Threats</span>
              </TabsTrigger>
              <TabsTrigger value="intelligence" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Threat Intelligence</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
                <div className="xl:col-span-2">
                  <div className="p-6 border rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Active Threats</h3>
                    <p>Current security threats affecting your network and devices.</p>
                  </div>
                </div>
                <div>
                  <ThreatFeed />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="intelligence">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Threat Intelligence</h3>
                <p>Comprehensive analysis of security threats and vulnerabilities.</p>
              </div>
            </TabsContent>
          </Tabs>
        </>
      );
    }
    
    // Communications Page
    else if (path.includes('/dashboard/communications')) {
      return (
        <>
          <Tabs defaultValue="messages" className="mt-6 mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>Secure Messages</span>
              </TabsTrigger>
              <TabsTrigger value="channels" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>Channels</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="messages">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Secure Communications</h3>
                <p>End-to-end encrypted messaging system for sensitive communications.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="channels">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Communication Channels</h3>
                <p>Manage your secure communication channels and permissions.</p>
              </div>
            </TabsContent>
          </Tabs>
        </>
      );
    }
    
    // Reports Page
    else if (path.includes('/dashboard/reports')) {
      return (
        <>
          <Tabs defaultValue="compliance" className="mt-6 mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="compliance" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Compliance Reports</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Security Reports</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="compliance">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Compliance Reports</h3>
                <p>Review and download security compliance documentation.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="security">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Security Reports</h3>
                <p>Detailed reports on security incidents and resolution status.</p>
              </div>
            </TabsContent>
          </Tabs>
        </>
      );
    }
    
    // Default empty state
    return <div>Content not found</div>;
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-display font-semibold">
          {location.pathname === '/dashboard' || location.pathname === '/dashboard/' 
            ? `Welcome, ${profile?.full_name}` 
            : location.pathname.includes('/dashboard/devices') 
              ? 'Device Management'
              : location.pathname.includes('/dashboard/threats')
                ? 'Threat Intelligence'
                : location.pathname.includes('/dashboard/communications')
                  ? 'Secure Communications'
                  : location.pathname.includes('/dashboard/reports')
                    ? 'Reports & Compliance'
                    : 'Dashboard'}
        </h1>
        <p className="text-muted-foreground">
          {location.pathname === '/dashboard' || location.pathname === '/dashboard/' 
            ? 'Your SecureGuardian dashboard provides real-time security monitoring and device management.'
            : location.pathname.includes('/dashboard/devices')
              ? 'Manage and monitor all your registered devices from one place.'
              : location.pathname.includes('/dashboard/threats')
                ? 'Monitor and respond to security threats affecting your organization.'
                : location.pathname.includes('/dashboard/communications')
                  ? 'Access encrypted communication channels for secure messaging.'
                  : location.pathname.includes('/dashboard/reports')
                    ? 'Access compliance reports and security documentation.'
                    : 'Manage your security settings and configurations.'}
        </p>
      </div>

      <SecuritySummary />
      
      {/* Render the appropriate content based on the current route */}
      {renderContent()}
    </DashboardLayout>
  );
};

export default Dashboard;
