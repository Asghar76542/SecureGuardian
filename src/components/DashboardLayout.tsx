
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Shield, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Settings,
  Laptop,
  AlertTriangle,
  Lock,
  FileText,
  History,
  HelpCircle,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { profile, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const standardMenuItems = [
    {
      name: 'Device Security',
      icon: <Laptop className="h-5 w-5" />,
      href: '/dashboard/devices',
      badge: 3,
    },
    {
      name: 'Threat Intelligence',
      icon: <AlertTriangle className="h-5 w-5" />,
      href: '/dashboard/threats',
      badge: 2,
    },
    {
      name: 'Secure Communications',
      icon: <Lock className="h-5 w-5" />,
      href: '/dashboard/communications',
    },
    {
      name: 'Compliance Reports',
      icon: <FileText className="h-5 w-5" />,
      href: '/dashboard/reports',
    },
    {
      name: 'Incident History',
      icon: <History className="h-5 w-5" />,
      href: '/dashboard/incidents',
    },
    {
      name: 'MFA Management',
      icon: <Shield className="h-5 w-5" />,
      href: '/dashboard/mfa',
    },
    {
      name: 'Help & Support',
      icon: <HelpCircle className="h-5 w-5" />,
      href: '/dashboard/support',
    },
  ];

  const adminMenuItems = [
    {
      name: 'User Management',
      icon: <Users className="h-5 w-5" />,
      href: '/dashboard/users',
      adminOnly: true,
    },
    {
      name: 'Global Threats',
      icon: <AlertTriangle className="h-5 w-5" />,
      href: '/dashboard/global-threats',
      adminOnly: true,
      badge: 5,
    },
    {
      name: 'Emergency Protocols',
      icon: <Bell className="h-5 w-5" />,
      href: '/dashboard/emergency',
      adminOnly: true,
    },
    {
      name: 'Audit Controls',
      icon: <FileText className="h-5 w-5" />,
      href: '/dashboard/audit',
      adminOnly: true,
    },
    {
      name: 'System Logs',
      icon: <History className="h-5 w-5" />,
      href: '/dashboard/logs',
      adminOnly: true,
    },
  ];

  const menuItems = [
    ...standardMenuItems,
    ...(isAdmin ? adminMenuItems : []),
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${mobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden'} w-64 bg-card shadow-lg border-r border-border md:block md:static md:z-auto`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl font-display font-semibold">SecureGuardian</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Profile Summary */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium">{profile?.full_name}</div>
                <div className="text-xs text-muted-foreground">
                  {profile?.role === 'admin' ? (
                    <Badge variant="outline" className="text-primary border-primary">Admin</Badge>
                  ) : (
                    <Badge variant="outline">User</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-primary/10 h-auto py-3"
                    onClick={() => navigate(item.href)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                    {item.badge && (
                      <Badge className="ml-auto bg-primary text-primary-foreground">{item.badge}</Badge>
                    )}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-card border-b border-border px-4 py-2 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-2 ml-auto">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
