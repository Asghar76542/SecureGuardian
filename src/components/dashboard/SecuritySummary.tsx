
import React from 'react';
import { Shield, AlertTriangle, Laptop, CheckCircle, XCircle } from 'lucide-react';

const SecuritySummary = () => {
  // Demo data - in a real app, this would come from the backend
  const securityStats = {
    securityScore: 85,
    activeThreats: 3,
    devicesAtRisk: 2,
    totalDevices: 5,
    lastScan: "2 hours ago",
  };

  // Calculate the security color based on the score
  const getSecurityColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const securityScoreColor = getSecurityColor(securityStats.securityScore);

  return (
    <div className="glass-panel rounded-xl p-6 mb-8">
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
          <span className="font-medium">{securityStats.lastScan}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Security Score */}
        <div className="bg-secondary/50 rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Security Score</span>
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div className="flex items-end">
            <span className={`text-3xl font-bold ${securityScoreColor}`}>
              {securityStats.securityScore}%
            </span>
          </div>
          <div className="w-full bg-background/50 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full bg-primary`} 
              style={{ width: `${securityStats.securityScore}%` }}
            ></div>
          </div>
        </div>

        {/* Active Threats */}
        <div className="bg-secondary/50 rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Active Threats</span>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </div>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-amber-500">
              {securityStats.activeThreats}
            </span>
            <span className="text-muted-foreground ml-2 mb-1">detected</span>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            {securityStats.activeThreats > 0 ? 'Immediate action recommended' : 'No threats detected'}
          </div>
        </div>

        {/* Devices at Risk */}
        <div className="bg-secondary/50 rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Devices at Risk</span>
            <Laptop className="h-5 w-5 text-red-500" />
          </div>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-red-500">
              {securityStats.devicesAtRisk}
            </span>
            <span className="text-muted-foreground ml-2 mb-1">of {securityStats.totalDevices}</span>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            {securityStats.devicesAtRisk === 0 ? 'All devices secure' : 'Some devices need attention'}
          </div>
        </div>

        {/* Compliance Status */}
        <div className="bg-secondary/50 rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Compliance Status</span>
            {securityStats.securityScore >= 80 ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
          <div className="flex items-end">
            <span className={`text-xl font-bold ${securityStats.securityScore >= 80 ? 'text-green-500' : 'text-red-500'}`}>
              {securityStats.securityScore >= 80 ? 'Compliant' : 'Non-Compliant'}
            </span>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            {securityStats.securityScore >= 80 
              ? 'All security requirements met' 
              : 'Action required to meet compliance'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySummary;
