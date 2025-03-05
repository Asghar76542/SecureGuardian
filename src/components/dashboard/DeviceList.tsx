
import React from 'react';
import { Laptop, Smartphone, Tablet, AlertTriangle, Shield, MoreVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Mock data for devices
const mockDevices = [
  {
    id: '1',
    name: 'MacBook Pro',
    type: 'laptop',
    lastActive: '2 minutes ago',
    status: 'secure',
    securityLevel: 'maximum',
    ipAddress: '192.168.1.105',
    location: 'New York, USA',
  },
  {
    id: '2',
    name: 'iPhone 13',
    type: 'smartphone',
    lastActive: '15 minutes ago',
    status: 'warning',
    securityLevel: 'enhanced',
    ipAddress: '192.168.1.110',
    location: 'New York, USA',
    warnings: ['Outdated OS version', 'Multiple login attempts'],
  },
  {
    id: '3',
    name: 'iPad Pro',
    type: 'tablet',
    lastActive: '3 hours ago',
    status: 'risk',
    securityLevel: 'standard',
    ipAddress: '192.168.0.56',
    location: 'Boston, USA',
    warnings: ['Unencrypted connection', 'Suspicious app detected', 'Malware detected'],
  },
  {
    id: '4',
    name: 'Samsung Galaxy',
    type: 'smartphone',
    lastActive: '1 day ago',
    status: 'secure',
    securityLevel: 'enhanced',
    ipAddress: '192.168.1.115',
    location: 'Washington, USA',
  },
  {
    id: '5',
    name: 'Surface Pro',
    type: 'laptop',
    lastActive: '5 days ago',
    status: 'warning',
    securityLevel: 'enhanced',
    ipAddress: '192.168.1.120',
    location: 'Miami, USA',
    warnings: ['Inactive for 5+ days'],
  },
];

const DeviceList = () => {
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'laptop':
        return <Laptop className="h-5 w-5" />;
      case 'smartphone':
        return <Smartphone className="h-5 w-5" />;
      case 'tablet':
        return <Tablet className="h-5 w-5" />;
      default:
        return <Laptop className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'secure':
        return <Badge className="bg-green-500 text-white">Secure</Badge>;
      case 'warning':
        return <Badge className="bg-amber-500 text-white">Warning</Badge>;
      case 'risk':
        return <Badge className="bg-red-500 text-white">At Risk</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getSecurityLevelBadge = (level: string) => {
    switch (level) {
      case 'maximum':
        return <Badge variant="outline" className="border-green-500 text-green-500">Maximum</Badge>;
      case 'enhanced':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Enhanced</Badge>;
      case 'standard':
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Standard</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="glass-panel rounded-xl p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-display font-semibold">Registered Devices</h2>
          <p className="text-muted-foreground">Manage and monitor your secure devices</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Add New Device
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-secondary/50 text-muted-foreground text-sm">
              <th className="text-left p-3 rounded-tl-lg">Device</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Security Level</th>
              <th className="text-left p-3">Last Active</th>
              <th className="text-left p-3">Location</th>
              <th className="text-center p-3 rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockDevices.map((device, index) => (
              <tr 
                key={device.id} 
                className={`border-t border-border hover:bg-secondary/30 ${
                  device.status === 'risk' ? 'bg-red-500/10' : ''
                }`}
              >
                <td className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                      {getDeviceIcon(device.type)}
                    </div>
                    <div>
                      <div className="font-medium">{device.name}</div>
                      <div className="text-xs text-muted-foreground">{device.ipAddress}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(device.status)}
                    {device.status !== 'secure' && (
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    )}
                  </div>
                  {device.warnings && (
                    <div className="mt-1">
                      {device.warnings.map((warning, i) => (
                        <div key={i} className="text-xs text-red-500 flex items-center mt-1">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          {warning}
                        </div>
                      ))}
                    </div>
                  )}
                </td>
                <td className="p-3">
                  {getSecurityLevelBadge(device.securityLevel)}
                </td>
                <td className="p-3">
                  <div className="text-sm">{device.lastActive}</div>
                </td>
                <td className="p-3">
                  <div className="text-sm">{device.location}</div>
                </td>
                <td className="p-3 text-center">
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeviceList;
