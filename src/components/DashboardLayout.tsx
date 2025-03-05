
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from './dashboard/navigation/Sidebar';
import Navbar from './dashboard/navigation/Navbar';
import { getNavigationItems } from './dashboard/navigation/navigationItems';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Get navigation items based on location and user role
  const { userNavItems, adminNavItems, commonNavItems } = getNavigationItems(location.pathname, isAdmin);

  // Combine navigation items based on user role
  const menuItems = [
    ...(isAdmin ? adminNavItems : []),
    ...userNavItems,
    ...commonNavItems
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Component */}
      <Sidebar 
        menuItems={menuItems}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        handleSignOut={handleSignOut}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Navbar Component */}
        <Navbar setMobileMenuOpen={setMobileMenuOpen} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
