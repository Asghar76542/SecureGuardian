
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, BarChart3, Laptop, AlertTriangle, Lock, FileText } from 'lucide-react';
import DeviceList from './DeviceList';
import ThreatFeed from './ThreatFeed';

interface DashboardTabsProps {
  path: string;
  isAdmin?: boolean;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ path, isAdmin = false }) => {
  // Main Dashboard Overview
  if (path === '/dashboard' || path === '/dashboard/') {
    return (
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
              <DeviceList isAdmin={isAdmin} />
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
    );
  }
  
  // Devices Page
  else if (path.includes('/dashboard/devices')) {
    return (
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
          <DeviceList isAdmin={isAdmin} />
        </TabsContent>
        
        <TabsContent value="pending">
          <DeviceList 
            isAdmin={isAdmin} 
          />
        </TabsContent>
      </Tabs>
    );
  }
  
  // Threats Page
  else if (path.includes('/dashboard/threats')) {
    return (
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
          <ThreatFeed showAllThreats={true} />
        </TabsContent>
      </Tabs>
    );
  }
  
  // Communications Page
  else if (path.includes('/dashboard/communications')) {
    return (
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
    );
  }
  
  // Reports Page
  else if (path.includes('/dashboard/reports')) {
    return (
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
    );
  }
  
  // Default empty state
  return <div>Content not found</div>;
};

export default DashboardTabs;
