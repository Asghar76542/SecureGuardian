
import React from 'react';
import { Shield } from 'lucide-react';

interface SecurityHeaderProps {
  lastScan: string;
}

const SecurityHeader = ({ lastScan }: SecurityHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
      <div className="flex items-center space-x-3 mb-4 md:mb-0">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-semibold">Security Status</h2>
          <p className="text-muted-foreground">Overview of your security posture</p>
        </div>
      </div>
      <div className="px-4 py-2 bg-card rounded-md border border-border">
        <span className="text-sm text-muted-foreground">Last scan: </span>
        <span className="font-medium">{lastScan}</span>
      </div>
    </div>
  );
};

export default SecurityHeader;
