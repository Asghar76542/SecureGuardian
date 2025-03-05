
import React from 'react';
import { 
  Shield, 
  Laptop,
  AlertTriangle,
  Lock,
  FileText,
  Cog,
  LayoutDashboard,
  DatabaseZap
} from 'lucide-react';

// Define the type for navigation items
export interface NavItem {
  name: string;
  icon: React.ReactNode;
  href: string;
  active: boolean;
  adminOnly?: boolean;
  badge?: number;
}

// Function to get navigation items based on path and user role
export const getNavigationItems = (pathname: string, isAdmin: boolean): {
  userNavItems: NavItem[];
  adminNavItems: NavItem[];
  commonNavItems: NavItem[];
} => {
  // Regular user navigation items
  const userNavItems: NavItem[] = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: '/dashboard',
      active: pathname === '/dashboard' || pathname === '/dashboard/'
    },
    {
      name: 'Devices',
      icon: <Laptop className="h-5 w-5" />,
      href: '/dashboard/devices',
      active: pathname.includes('/dashboard/devices'),
      badge: 3
    },
    {
      name: 'Threats',
      icon: <AlertTriangle className="h-5 w-5" />,
      href: '/dashboard/threats',
      active: pathname.includes('/dashboard/threats'),
      badge: 2
    },
    {
      name: 'Communications',
      icon: <Lock className="h-5 w-5" />,
      href: '/dashboard/communications',
      active: pathname.includes('/dashboard/communications')
    },
    {
      name: 'Reports',
      icon: <FileText className="h-5 w-5" />,
      href: '/dashboard/reports',
      active: pathname.includes('/dashboard/reports')
    }
  ];

  // Admin navigation items
  const adminNavItems: NavItem[] = [
    {
      name: 'Admin Dashboard',
      icon: <Shield className="h-5 w-5" />,
      href: '/admin',
      active: pathname === '/admin' || pathname === '/admin/',
      adminOnly: true
    },
    {
      name: 'System Management',
      icon: <DatabaseZap className="h-5 w-5" />,
      href: '/admin/system',
      active: pathname.includes('/admin/users') || 
              pathname.includes('/admin/approvals') || 
              pathname.includes('/admin/global-threats') || 
              pathname.includes('/admin/audit') || 
              pathname.includes('/admin/logs'),
      adminOnly: true,
      badge: 1
    }
  ];

  // Common navigation items for all users
  const commonNavItems: NavItem[] = [
    {
      name: 'Settings & Support',
      icon: <Cog className="h-5 w-5" />,
      href: '/settings',
      active: pathname.includes('/settings') || pathname.includes('/dashboard/support')
    }
  ];

  return { userNavItems, adminNavItems, commonNavItems };
};
