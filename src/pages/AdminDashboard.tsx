
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import SecuritySummary from '@/components/dashboard/SecuritySummary';
import DeviceList from '@/components/dashboard/DeviceList';
import ThreatFeed from '@/components/dashboard/ThreatFeed';
import UserManagement from '@/components/dashboard/admin/UserManagement';
import UserApprovals from '@/components/dashboard/admin/UserApprovals';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Users, UserCheck, AlertTriangle, Activity, DatabaseZap, ListChecks, ShoppingCart, Users2, FileCheck } from 'lucide-react';
import GlobalThreatMonitor from '@/components/dashboard/admin/GlobalThreatMonitor';
import ComplianceControls from '@/components/dashboard/admin/ComplianceControls';
import SystemLogs from '@/components/dashboard/admin/SystemLogs';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import CustomerManagement from '@/components/dashboard/admin/CustomerManagement';

const AdminDashboard = () => {
  const { profile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch pending purchase orders count
  const { data: pendingOrdersCount } = useQuery({
    queryKey: ['pending-orders-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('purchase_orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');
        
      if (error) throw error;
      return count || 0;
    },
    refetchInterval: 30000 // Refetch every 30 seconds
  });

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
              {pendingOrdersCount > 0 && (
                <div className="mb-6 p-4 border border-primary/30 bg-primary/5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/20 rounded-full">
                        <ShoppingCart className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Pending Purchase Orders</h3>
                        <p className="text-sm text-muted-foreground">
                          You have {pendingOrdersCount} pending purchase {pendingOrdersCount === 1 ? 'order' : 'orders'} that {pendingOrdersCount === 1 ? 'requires' : 'require'} your approval
                        </p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => navigate('/admin/purchase-orders')}
                      className="shrink-0"
                    >
                      Review Orders
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="mb-6 p-4 border border-primary/30 bg-primary/5 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-full">
                      <FileCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Product Setup Instructions</h3>
                      <p className="text-sm text-muted-foreground">
                        Access detailed checklists and guides for properly setting up products
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => navigate('/admin/product-setup')}
                    className="shrink-0"
                  >
                    View Setup Guides
                  </Button>
                </div>
              </div>
            
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
              <TabsTrigger value="customers" className="flex items-center gap-2">
                <Users2 className="h-4 w-4" />
                <span>Customer Management</span>
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
            
            <TabsContent value="customers">
              <CustomerManagement />
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
    if (location.pathname.includes('/admin/customers')) return 'customers';
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
              : location.pathname.includes('/admin/purchase-orders')
                ? 'Purchase Orders'
                : 'Admin Control Panel'}
        </h1>
        <p className="text-muted-foreground">
          {location.pathname === '/admin' || location.pathname === '/admin/' 
            ? `Welcome, Admin ${profile?.full_name}. This dashboard provides administrative controls and security monitoring.`
            : location.pathname.includes('/admin/system')
              ? 'Manage users, approvals, compliance settings, and system logs.'
              : location.pathname.includes('/admin/purchase-orders')
                ? 'Review and manage product purchase requests from users.'
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
