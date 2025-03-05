
import React from 'react';
import { AlertTriangle, Clock, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SecurityHeaderProps {
  lastScan: string;
  criticalThreats?: number;
  highThreats?: number;
}

const SecurityHeader = ({ lastScan, criticalThreats = 0, highThreats = 0 }: SecurityHeaderProps) => {
  const hasUrgentThreats = criticalThreats > 0 || highThreats > 0;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Security Dashboard</h2>
        <div className="flex items-center text-muted-foreground text-sm">
          <Clock className="h-4 w-4 mr-1" />
          <span>Last scan: {lastScan}</span>
          
          {hasUrgentThreats && (
            <div className="ml-4 flex items-center text-red-500">
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span>
                {criticalThreats > 0 && `${criticalThreats} critical`}
                {criticalThreats > 0 && highThreats > 0 && ', '}
                {highThreats > 0 && `${highThreats} high priority`} threat{(criticalThreats + highThreats) !== 1 ? 's' : ''} detected
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex space-x-2 mt-4 md:mt-0">
        {hasUrgentThreats && (
          <Button variant="destructive" size="sm" className="flex items-center">
            <ShieldAlert className="h-4 w-4 mr-1" />
            Resolve Threats
          </Button>
        )}
        <Button variant="outline" size="sm">
          Run Scan
        </Button>
      </div>
    </div>
  );
};

export default SecurityHeader;
