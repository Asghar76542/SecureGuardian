
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Shield, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NavItem } from './navigationItems';
import { useAuth } from '@/contexts/AuthContext';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  menuItems: NavItem[];
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  handleSignOut: () => Promise<void>;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  menuItems, 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  handleSignOut 
}) => {
  const navigate = useNavigate();
  const { profile } = useAuth();

  return (
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
                  variant={item.active ? "default" : "ghost"}
                  className={`w-full justify-start hover:bg-primary/10 h-auto py-3 ${item.active ? 'bg-primary/10 text-primary' : ''}`}
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
  );
};

export default Sidebar;
