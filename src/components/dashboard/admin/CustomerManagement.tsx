import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Users, ShieldCheck, Building, Smartphone, Package, Calendar, Clock, AlertCircle, ShoppingCart } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import PurchaseOrdersList from './customer/PurchaseOrdersList';
import PurchaseOrdersCard from './customer/PurchaseOrdersCard';

interface Customer {
  id: string;
  name: string;
  email: string;
  org_id: string;
  org_name: string;
  role: string;
  status: string;
  subscription_type?: string;
  subscription_status?: string;
  device_count: number;
  created_at: string;
  last_login: string | null;
}

interface Subscription {
  id: string;
  org_id: string;
  plan_type: string;
  billing_cycle: string;
  start_date: string;
  end_date: string | null;
  status: string;
}

interface CustomerDevice {
  id: string;
  serial_number: string;
  type: string;
  status: string;
  org_id: string;
  org_name: string;
  assigned_to: string | null;
  user_name?: string;
  created_at: string;
}

const CustomerManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedView, setSelectedView] = useState<'overview' | 'subscriptions' | 'devices' | 'orders'>('overview');

  const { data: customers, isLoading, error } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select(`
          id, 
          full_name,
          email,
          role,
          status,
          created_at,
          last_login,
          org_id,
          organizations(id, name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(user => ({
        id: user.id,
        name: user.full_name,
        email: user.email,
        org_id: user.org_id || '',
        org_name: user.organizations ? user.organizations.name : 'No Organization',
        role: user.role,
        status: user.status,
        created_at: user.created_at,
        last_login: user.last_login,
        device_count: 0
      })) as Customer[];
    },
  });

  const { data: deviceCounts } = useQuery({
    queryKey: ['device-counts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('devices')
        .select('org_id, id')
        .order('org_id');

      if (error) throw error;

      const counts: Record<string, number> = {};
      data.forEach(device => {
        if (device.org_id) {
          counts[device.org_id] = (counts[device.org_id] || 0) + 1;
        }
      });

      return counts;
    }
  });

  useEffect(() => {
    if (customers && deviceCounts) {
      customers.forEach(customer => {
        if (customer.org_id && deviceCounts[customer.org_id]) {
          customer.device_count = deviceCounts[customer.org_id];
        }
      });
    }
  }, [customers, deviceCounts]);

  const { data: subscriptions, isLoading: isLoadingSubscriptions } = useQuery({
    queryKey: ['customer-subscriptions', selectedCustomer?.org_id],
    queryFn: async () => {
      if (!selectedCustomer?.org_id) return [];

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('org_id', selectedCustomer.org_id)
        .order('start_date', { ascending: false });

      if (error) throw error;
      return data as Subscription[];
    },
    enabled: !!selectedCustomer?.org_id
  });

  const { data: devices, isLoading: isLoadingDevices } = useQuery({
    queryKey: ['customer-devices', selectedCustomer?.org_id],
    queryFn: async () => {
      if (!selectedCustomer?.org_id) return [];

      const { data, error } = await supabase
        .from('devices')
        .select(`
          *,
          organizations(name)
        `)
        .eq('org_id', selectedCustomer.org_id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(device => ({
        ...device,
        org_name: device.organizations ? device.organizations.name : 'Unknown'
      })) as CustomerDevice[];
    },
    enabled: !!selectedCustomer?.org_id && selectedView === 'devices'
  });

  const filteredCustomers = customers?.filter(customer => {
    if (activeTab !== 'all' && customer.status !== activeTab) {
      return false;
    }

    const query = searchQuery.toLowerCase();
    return (
      customer.name.toLowerCase().includes(query) || 
      customer.email.toLowerCase().includes(query) || 
      customer.org_name.toLowerCase().includes(query)
    );
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSubscriptionStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getDeviceStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>;
      case 'maintenance':
        return <Badge variant="outline" className="text-blue-500 border-blue-500">Maintenance</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    setSelectedView('overview');
  };

  const handleBackToList = () => {
    setSelectedCustomer(null);
  };

  const renderCustomerDetail = () => {
    if (!selectedCustomer) return null;

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <Button 
              variant="ghost" 
              onClick={handleBackToList} 
              className="mb-4"
            >
              ← Back to Customers
            </Button>
            <h2 className="text-2xl font-display font-semibold">{selectedCustomer.name}</h2>
            <p className="text-muted-foreground">{selectedCustomer.email}</p>
          </div>
          
          <div className="space-x-2">
            <Button variant="outline">Edit Customer</Button>
            <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
              Disable Account
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <Card className="flex-1 min-w-[240px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Organization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-2 text-primary" />
                <span className="font-medium">{selectedCustomer.org_name}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="flex-1 min-w-[240px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                <span>{getStatusBadge(selectedCustomer.status)}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="flex-1 min-w-[240px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Created</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-primary" />
                <span>{formatDate(selectedCustomer.created_at)}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="flex-1 min-w-[240px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Last Login</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-primary" />
                <span>{formatDate(selectedCustomer.last_login)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={selectedView} onValueChange={(value) => setSelectedView(value as any)} className="mt-6">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span>Purchase Orders</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Subscription Summary</CardTitle>
                  <CardDescription>
                    Currently active services and plans
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingSubscriptions ? (
                    <p>Loading subscription information...</p>
                  ) : subscriptions && subscriptions.length > 0 ? (
                    <div className="space-y-4">
                      {subscriptions.slice(0, 1).map(sub => (
                        <div key={sub.id} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">Plan Type</span>
                            <span className="capitalize">{sub.plan_type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Status</span>
                            <span>{getSubscriptionStatusBadge(sub.status)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Billing Cycle</span>
                            <span className="capitalize">{sub.billing_cycle}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Start Date</span>
                            <span>{formatDate(sub.start_date)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Renewal Date</span>
                            <span>{sub.end_date ? formatDate(sub.end_date) : 'N/A'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Package className="h-12 w-12 mx-auto text-muted-foreground/50" />
                      <h3 className="mt-2 font-medium">No Subscriptions</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        This customer doesn't have any active subscriptions.
                      </p>
                      <Button className="mt-4">Add Subscription</Button>
                    </div>
                  )}
                </CardContent>
                {subscriptions && subscriptions.length > 0 && (
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setSelectedView('subscriptions')}
                    >
                      View All Subscriptions
                    </Button>
                  </CardFooter>
                )}
              </Card>
              
              <div className="space-y-6">
                <PurchaseOrdersCard 
                  customerId={selectedCustomer.id} 
                  orgId={selectedCustomer.org_id}
                  onViewAllOrders={() => setSelectedView('orders')}
                />

                <Card>
                  <CardHeader>
                    <CardTitle>Device Summary</CardTitle>
                    <CardDescription>
                      Connected devices
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedCustomer.device_count > 0 ? (
                      <div className="flex justify-between">
                        <span className="font-medium">Total Devices</span>
                        <span>{selectedCustomer.device_count}</span>
                      </div>
                    ) : (
                      <div className="text-center py-3">
                        <p className="text-sm text-muted-foreground">
                          No devices registered
                        </p>
                      </div>
                    )}
                  </CardContent>
                  {selectedCustomer.device_count > 0 && (
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setSelectedView('devices')}
                      >
                        View Devices
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="subscriptions">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Subscriptions</span>
                  <Button>Add Subscription</Button>
                </CardTitle>
                <CardDescription>
                  Manage customer subscriptions and plans
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingSubscriptions ? (
                  <p>Loading subscriptions...</p>
                ) : subscriptions && subscriptions.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Plan</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Billing</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscriptions.map((subscription) => (
                        <TableRow key={subscription.id}>
                          <TableCell className="font-medium capitalize">{subscription.plan_type}</TableCell>
                          <TableCell>{getSubscriptionStatusBadge(subscription.status)}</TableCell>
                          <TableCell className="capitalize">{subscription.billing_cycle}</TableCell>
                          <TableCell>{formatDate(subscription.start_date)}</TableCell>
                          <TableCell>{subscription.end_date ? formatDate(subscription.end_date) : 'N/A'}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">Edit</Button>
                              <Button size="sm" variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
                                Cancel
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground/50" />
                    <h3 className="mt-4 text-lg font-medium">No Subscriptions Found</h3>
                    <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                      This customer doesn't have any subscriptions. Add one to provide access to services.
                    </p>
                    <Button className="mt-6">Add Subscription</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="devices">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Devices</span>
                  <Button>Register New Device</Button>
                </CardTitle>
                <CardDescription>
                  Manage customer devices and their configurations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingDevices ? (
                  <p>Loading devices...</p>
                ) : devices && devices.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Serial Number</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {devices.map((device) => (
                        <TableRow key={device.id}>
                          <TableCell className="font-medium">{device.serial_number}</TableCell>
                          <TableCell className="capitalize">{device.type}</TableCell>
                          <TableCell>{getDeviceStatusBadge(device.status)}</TableCell>
                          <TableCell>{formatDate(device.created_at)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">Configure</Button>
                              <Button size="sm" variant="outline" className="text-amber-500 border-amber-500 hover:bg-amber-500/10">
                                Reset
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-12">
                    <Smartphone className="h-12 w-12 mx-auto text-muted-foreground/50" />
                    <h3 className="mt-4 text-lg font-medium">No Devices Found</h3>
                    <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                      This customer doesn't have any registered devices. Add one to enable secure communications.
                    </p>
                    <Button className="mt-6">Register New Device</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            {selectedCustomer && (
              <PurchaseOrdersList customerId={selectedCustomer.id} orgId={selectedCustomer.org_id} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  const renderCustomerList = () => {
    if (isLoading) {
      return <div className="text-center py-12">Loading customers...</div>;
    }

    if (error) {
      return (
        <div className="p-6 border border-destructive/20 bg-destructive/10 rounded-lg text-destructive flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <div>
            <h3 className="font-medium">Error loading customers</h3>
            <p className="text-sm">{(error as Error).message}</p>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h2 className="text-xl font-display font-semibold">Customer Management</h2>
            <p className="text-muted-foreground">Manage customers, subscriptions, and devices</p>
          </div>
          <div className="flex mt-4 sm:mt-0 gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button className="button-primary">
              <Users className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all">All Customers</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
            
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">More Filters</span>
            </Button>
          </div>
        </Tabs>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Devices</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers && filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleCustomerSelect(customer)}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {customer.org_name || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {customer.device_count || 0}
                    </TableCell>
                    <TableCell>{getStatusBadge(customer.status)}</TableCell>
                    <TableCell>{formatDate(customer.created_at)}</TableCell>
                    <TableCell>{formatDate(customer.last_login)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 border-primary text-primary hover:bg-primary/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCustomerSelect(customer);
                        }}
                      >
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    {searchQuery ? 'No customers found matching your search.' : 'No customers found.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </>
    );
  };

  return (
    <div className="glass-panel p-6 rounded-xl">
      {selectedCustomer ? renderCustomerDetail() : renderCustomerList()}
    </div>
  );
};

export default CustomerManagement;
