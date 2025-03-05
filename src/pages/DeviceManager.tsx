
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, Settings, Smartphone, AlertTriangle, History, Lock, Unlock } from 'lucide-react';
import { toast } from 'sonner';

const DeviceManager = () => {
  // In a real app, you would fetch this data from your API
  const deviceData = {
    id: 'device-123',
    name: 'John\'s iPhone',
    type: 'ios',
    status: 'active',
    serial: 'IMEI-849302839048',
    lastSeen: '2023-11-12T08:45:00Z',
    securityScore: 92,
    encryptionEnabled: true,
    passcodeSet: true,
    biometricsEnabled: true,
    screenLockTimeout: 5,
    autoBackupEnabled: true,
    osVersion: 'iOS 17.0.2',
    lastScanDate: '2023-11-11T23:00:00Z',
    recentEvents: [
      { id: 'evt-1', type: 'login', date: '2023-11-12T08:45:00Z', details: 'User login from New York, USA' },
      { id: 'evt-2', type: 'setting_change', date: '2023-11-10T14:30:00Z', details: 'Screen lock timeout changed to 5 minutes' },
      { id: 'evt-3', type: 'scan', date: '2023-11-10T12:15:00Z', details: 'Security scan completed - no threats detected' }
    ]
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleRemoteWipe = () => {
    toast.success('Remote wipe initiated', {
      description: 'This device will be wiped remotely during its next connection.',
    });
  };

  const handleLockDevice = () => {
    toast.success('Device locked remotely', {
      description: 'The device has been locked and requires authentication to continue use.',
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-display font-semibold">Device Manager</h1>
            <p className="text-muted-foreground">
              Manage and secure your device
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-2">
            <Button variant="outline" className="flex items-center gap-1">
              <Lock className="h-4 w-4" />
              <span onClick={handleLockDevice}>Lock Device</span>
            </Button>
            <Button variant="destructive" className="flex items-center gap-1">
              <Unlock className="h-4 w-4" />
              <span onClick={handleRemoteWipe}>Remote Wipe</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Device Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-2xl font-bold">{deviceData.name}</div>
                <p className="text-xs text-muted-foreground">{deviceData.serial}</p>
              </div>
              <Badge className="bg-green-500">{deviceData.status}</Badge>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Last seen: {formatDate(deviceData.lastSeen)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Security Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-bold text-xl">{deviceData.securityScore}/100</div>
                <Shield className="h-5 w-5 text-green-500" />
              </div>
              <Progress value={deviceData.securityScore} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Last scan: {formatDate(deviceData.lastScanDate)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Device Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium flex items-center">
                  <Smartphone className="h-4 w-4 mr-1" />
                  {deviceData.type}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">OS Version</span>
                <span className="font-medium">{deviceData.osVersion}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Encryption</span>
                <span className="font-medium text-green-500">
                  {deviceData.encryptionEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="settings" className="mt-6">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Security Settings</span>
          </TabsTrigger>
          <TabsTrigger value="threats" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">Threat Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">Activity Log</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Security Configuration</CardTitle>
              <CardDescription>
                Review and update the security settings for this device.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between p-3 bg-secondary/50 rounded-md">
                    <span>Screen Lock Timeout</span>
                    <span className="font-medium">{deviceData.screenLockTimeout} minutes</span>
                  </div>
                  <div className="flex justify-between p-3 bg-secondary/50 rounded-md">
                    <span>Passcode Protection</span>
                    <span className={deviceData.passcodeSet ? "text-green-500" : "text-red-500"}>
                      {deviceData.passcodeSet ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-secondary/50 rounded-md">
                    <span>Biometric Authentication</span>
                    <span className={deviceData.biometricsEnabled ? "text-green-500" : "text-muted-foreground"}>
                      {deviceData.biometricsEnabled ? "Enabled" : "Not Set"}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-secondary/50 rounded-md">
                    <span>Automatic Backup</span>
                    <span className={deviceData.autoBackupEnabled ? "text-green-500" : "text-red-500"}>
                      {deviceData.autoBackupEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="threats">
          <Card>
            <CardHeader>
              <CardTitle>Threat Analysis</CardTitle>
              <CardDescription>
                Detailed security analysis of potential vulnerabilities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <Shield className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Active Threats Detected</h3>
                <p className="text-muted-foreground max-w-md">
                  Your device is currently secure. Regular security scans are running to ensure continued protection.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Track recent security events and logins for this device.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deviceData.recentEvents.map(event => (
                  <div 
                    key={event.id} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-border rounded-md"
                  >
                    <div className="mb-2 sm:mb-0">
                      <h4 className="font-medium capitalize">{event.type.replace('_', ' ')}</h4>
                      <p className="text-sm text-muted-foreground">{event.details}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(event.date)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default DeviceManager;
