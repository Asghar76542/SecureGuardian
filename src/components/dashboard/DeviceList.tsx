
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Laptop, Smartphone, MoreHorizontal, AlertTriangle, Search, PlusCircle, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

// Define the types to match exactly what the database expects
type DeviceStatus = 'active' | 'inactive' | 'pending' | 'maintenance';
// Modified to remove 'windows' which is not in the database schema
type DeviceType = 'ios' | 'android' | 'macbook' | 'imac' | 'tablet';

interface Device {
  id: string;
  type: DeviceType;
  serial_number: string;
  status: DeviceStatus;
  assigned_to: string | null;
  configuration_id: string | null;
  created_at: string;
  updated_at: string;
  org_id?: string;
}

interface DeviceListProps {
  isAdmin?: boolean;
}

const DeviceList = ({ isAdmin = false }: DeviceListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isWipeDialogOpen, setIsWipeDialogOpen] = useState(false);
  const [isAddDeviceDialogOpen, setIsAddDeviceDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { profile } = useAuth();

  // Fetch devices from Supabase
  const { data: devices, isLoading, error } = useQuery({
    queryKey: ['devices'],
    queryFn: async () => {
      // If the user has an org_id, fetch only their org's devices
      const query = supabase.from('devices').select('*');
      
      if (profile?.org_id) {
        query.eq('org_id', profile.org_id);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Device[];
    }
  });

  // Remote wipe mutation
  const wipeMutation = useMutation({
    mutationFn: async (deviceId: string) => {
      // In a real implementation, this would make a call to an edge function
      // that would trigger the remote wipe process
      console.log('Triggered remote wipe for device:', deviceId);
      
      // Update status in the database
      const { data, error } = await supabase
        .from('devices')
        .update({ status: 'maintenance' as DeviceStatus })
        .eq('id', deviceId);
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('Remote wipe initiated');
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      setIsWipeDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to initiate remote wipe: ${error.message}`);
    }
  });

  // Add device mutation
  const addDeviceMutation = useMutation({
    mutationFn: async (newDevice: {
      type: DeviceType;
      serial_number: string;
      status: DeviceStatus;
      org_id: string | undefined;
    }) => {
      // Important: We need to pass a single object here, not an array
      const { error } = await supabase.from('devices').insert(newDevice);
      
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      toast.success('Device added successfully');
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      setIsAddDeviceDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to add device: ${error.message}`);
    }
  });

  // Filter devices based on search
  const filteredDevices = devices?.filter(device => 
    device.serial_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDeviceIcon = (type: string) => {
    if (type === 'ios' || type === 'android' || type === 'tablet') {
      return <Smartphone className="h-5 w-5" />;
    } else {
      return <Laptop className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="text-muted-foreground">Inactive</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>;
      case 'maintenance':
        return <Badge variant="secondary">Maintenance</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleWipeClick = (device: Device) => {
    setSelectedDevice(device);
    setIsWipeDialogOpen(true);
  };

  // Handle adding a new device
  const handleAddDevice = (formData: FormData) => {
    const deviceType = formData.get('type') as string;
    const serialNumber = formData.get('serialNumber') as string;
    
    if (!deviceType || !serialNumber) {
      toast.error('Device type and serial number are required');
      return;
    }

    // Validate the device type against our allowed types
    if (!isValidDeviceType(deviceType)) {
      toast.error('Invalid device type selected');
      return;
    }

    addDeviceMutation.mutate({
      type: deviceType as DeviceType,
      serial_number: serialNumber,
      status: 'pending' as DeviceStatus,
      org_id: profile?.org_id
    });
  };

  // Helper function to validate device type
  const isValidDeviceType = (type: string): type is DeviceType => {
    return ['ios', 'android', 'macbook', 'imac', 'tablet'].includes(type);
  };

  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-xl font-display font-semibold">Secured Devices</h2>
          <p className="text-muted-foreground">Manage your protected devices</p>
        </div>
        <div className="flex mt-4 sm:mt-0 gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search devices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          {isAdmin && (
            <Dialog open={isAddDeviceDialogOpen} onOpenChange={setIsAddDeviceDialogOpen}>
              <DialogTrigger asChild>
                <Button className="button-primary">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Device
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Secure Device</DialogTitle>
                  <DialogDescription>
                    Register a new device in the SecureGuardian system.
                  </DialogDescription>
                </DialogHeader>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddDevice(new FormData(e.target as HTMLFormElement));
                  }} 
                  className="space-y-4 py-4"
                >
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <label htmlFor="deviceType" className="text-sm font-medium">
                        Device Type
                      </label>
                      <select 
                        id="deviceType" 
                        name="type" 
                        className="w-full p-2 border rounded-md"
                        required
                      >
                        <option value="">Select device type</option>
                        <option value="ios">iOS Device</option>
                        <option value="android">Android Device</option>
                        <option value="macbook">MacBook</option>
                        <option value="imac">iMac</option>
                        <option value="tablet">Tablet</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="serialNumber" className="text-sm font-medium">
                        Serial Number
                      </label>
                      <Input 
                        id="serialNumber" 
                        name="serialNumber" 
                        placeholder="Enter device serial number" 
                        required 
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" type="button" onClick={() => setIsAddDeviceDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      disabled={addDeviceMutation.isPending}
                    >
                      {addDeviceMutation.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Registering...
                        </>
                      ) : (
                        'Register Device'
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="rounded-md bg-destructive/20 p-4 text-center">
          <AlertTriangle className="h-10 w-10 text-destructive mx-auto mb-2" />
          <h3 className="font-medium">Error Loading Devices</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {(error as Error).message || 'There was an error fetching the device list.'}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 font-medium">Device</th>
                  <th className="pb-3 font-medium">Serial Number</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Last Activity</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredDevices && filteredDevices.length > 0 ? (
                  filteredDevices.map((device) => (
                    <tr key={device.id} className="group">
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            {getDeviceIcon(device.type)}
                          </div>
                          <div>
                            <div className="font-medium capitalize">{device.type}</div>
                            <div className="text-xs text-muted-foreground">
                              {device.assigned_to || 'Unassigned'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 font-mono text-sm">{device.serial_number}</td>
                      <td className="py-4">{getStatusBadge(device.status)}</td>
                      <td className="py-4 text-sm text-muted-foreground">
                        {new Date(device.updated_at).toLocaleString()}
                      </td>
                      <td className="py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => { /* View details */ }}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleWipeClick(device)}
                              className="text-red-500 focus:text-red-500"
                            >
                              Remote Wipe
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-6 text-center">
                      {searchQuery 
                        ? 'No devices matching your search criteria' 
                        : 'No devices registered yet'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Remote Wipe Confirmation Dialog */}
      <AlertDialog open={isWipeDialogOpen} onOpenChange={setIsWipeDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Remote Wipe</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently erase all data on the device {selectedDevice?.serial_number}.
              This action cannot be undone. The device will be crypto-shredded and all secure
              data will be permanently destroyed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-destructive hover:bg-destructive/90"
              onClick={() => selectedDevice && wipeMutation.mutate(selectedDevice.id)}
              disabled={wipeMutation.isPending}
            >
              {wipeMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Initiating Wipe...
                </>
              ) : (
                'Confirm Remote Wipe'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeviceList;
