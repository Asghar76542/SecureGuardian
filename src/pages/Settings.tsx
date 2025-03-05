
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Shield, User, Bell, LockKeyhole } from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const { profile } = useAuth();

  // In a real app, these would be loaded from the database
  const [notificationSettings, setNotificationSettings] = React.useState({
    securityAlerts: true,
    newDevices: true,
    weeklyReports: false,
    maintenanceUpdates: true
  });

  const [securitySettings, setSecuritySettings] = React.useState({
    twoFactorAuth: false,
    passwordExpiry: 90,
    deviceLimit: 5,
    autoLockTimeout: 15
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully');
  };

  const handleToggleNotification = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
    toast.success(`${setting} notification ${notificationSettings[setting] ? 'disabled' : 'enabled'}`);
  };

  const handleUpdateSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Security settings updated');
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-display font-semibold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and security preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="mt-6 mb-6">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your account details and personal information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue={profile?.full_name || ''} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={profile?.email || ''} disabled />
                    <p className="text-xs text-muted-foreground">
                      Email changes require verification
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" value={profile?.role || ''} disabled />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button onClick={handleUpdateProfile}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure which notifications you receive from SecureGuardian.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Security Alerts</h3>
                  <p className="text-sm text-muted-foreground">
                    Get notified about security incidents and threats
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings.securityAlerts}
                  onCheckedChange={() => handleToggleNotification('securityAlerts')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">New Device Logins</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts when your account is accessed from a new device
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings.newDevices}
                  onCheckedChange={() => handleToggleNotification('newDevices')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Weekly Security Reports</h3>
                  <p className="text-sm text-muted-foreground">
                    Get a weekly summary of security events and statistics
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings.weeklyReports}
                  onCheckedChange={() => handleToggleNotification('weeklyReports')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Maintenance Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Be informed about system maintenance and downtime
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings.maintenanceUpdates}
                  onCheckedChange={() => handleToggleNotification('maintenanceUpdates')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your security preferences and account protection.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateSecurity} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium flex items-center gap-2">
                        <LockKeyhole className="h-4 w-4" /> Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch 
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={() => setSecuritySettings({
                        ...securitySettings,
                        twoFactorAuth: !securitySettings.twoFactorAuth
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                    <Input 
                      id="passwordExpiry" 
                      type="number" 
                      value={securitySettings.passwordExpiry}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        passwordExpiry: parseInt(e.target.value)
                      })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Set to 0 for no expiry
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="deviceLimit">Maximum Devices</Label>
                    <Input 
                      id="deviceLimit" 
                      type="number" 
                      value={securitySettings.deviceLimit}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        deviceLimit: parseInt(e.target.value)
                      })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Maximum number of devices that can be associated with your account
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="autoLockTimeout">Auto-Lock Timeout (minutes)</Label>
                    <Input 
                      id="autoLockTimeout" 
                      type="number" 
                      value={securitySettings.autoLockTimeout}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        autoLockTimeout: parseInt(e.target.value)
                      })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Time of inactivity before automatically logging out
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button onClick={handleUpdateSecurity}>Update Security Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
