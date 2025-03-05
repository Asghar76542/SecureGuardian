
import React from 'react';
import { Shield, AlertTriangle, Laptop, CheckCircle, XCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface SecuritySummaryData {
  total_devices: number;
  active_devices: number;
  devices_at_risk: number;
  active_threats: number;
  security_score: number;
  last_scan_time: string | null;
  time_since_scan: string | null;
}

const SecuritySummary = () => {
  const { toast } = useToast();

  const { data: securityStats, isLoading, error } = useQuery({
    queryKey: ['securitySummary'],
    queryFn: async (): Promise<SecuritySummaryData> => {
      const { data, error } = await supabase.rpc('get_user_security_summary');
      
      if (error) {
        console.error('Error fetching security summary:', error);
        toast({
          title: 'Error',
          description: 'Failed to load security data',
          variant: 'destructive',
        });
        throw error;
      }
      
      // If no data was returned, provide default values
      if (!data || data.length === 0) {
        return {
          total_devices: 0,
          active_devices: 0,
          devices_at_risk: 0,
          active_threats: 0,
          security_score: 0,
          last_scan_time: null,
          time_since_scan: null,
        };
      }
      
      return {
        total_devices: data[0].total_devices || 0,
        active_devices: data[0].active_devices || 0,
        devices_at_risk: data[0].devices_at_risk || 0,
        active_threats: data[0].active_threats || 0,
        security_score: data[0].security_score || 0,
        last_scan_time: data[0].last_scan_time,
        // Convert the interval to a string representation
        time_since_scan: data[0].time_since_scan ? String(data[0].time_since_scan) : null,
      };
    },
  });

  // Get a user-friendly time since last scan
  const getLastScanText = () => {
    if (!securityStats?.last_scan_time) return "Never";
    
    // If we have the formatted interval from Postgres
    if (securityStats.time_since_scan) {
      const interval = securityStats.time_since_scan;
      if (interval.includes('days')) {
        const days = parseInt(interval);
        return days > 1 ? `${days} days ago` : "Yesterday";
      } else if (interval.includes('hours')) {
        const hours = parseInt(interval);
        return `${hours} hours ago`;
      } else {
        return "Recently";
      }
    }
    
    // Fallback to formatting the timestamp
    try {
      const scanDate = new Date(securityStats.last_scan_time);
      return format(scanDate, "h:mm a, MMM d");
    } catch (e) {
      return "Unknown";
    }
  };

  // Calculate the security color based on the score
  const getSecurityColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  // Use a loading state while fetching data
  if (isLoading) {
    return (
      <div className="glass-panel rounded-xl p-6 mb-8 animate-pulse">
        <div className="h-24 bg-secondary/30 rounded-md mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-secondary/30 rounded-lg h-32"></div>
          ))}
        </div>
      </div>
    );
  }

  // Show error UI if there's an issue
  if (error) {
    return (
      <div className="glass-panel rounded-xl p-6 mb-8 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900">
        <div className="flex items-center justify-center h-40">
          <div className="text-center">
            <XCircle className="mx-auto mb-2 h-10 w-10 text-red-500" />
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-400">Failed to load security data</h3>
            <p className="text-sm text-red-600 dark:text-red-300">Please refresh the page or contact support</p>
          </div>
        </div>
      </div>
    );
  }

  // Use defaults if data is unavailable
  const stats = securityStats || {
    security_score: 0,
    active_threats: 0,
    devices_at_risk: 0,
    total_devices: 0,
  };
  
  const securityScoreColor = getSecurityColor(stats.security_score);
  const lastScan = getLastScanText();

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
          <span className="font-medium">{lastScan}</span>
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
              {stats.security_score}%
            </span>
          </div>
          <div className="w-full bg-background/50 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full bg-primary`} 
              style={{ width: `${stats.security_score}%` }}
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
              {stats.active_threats}
            </span>
            <span className="text-muted-foreground ml-2 mb-1">detected</span>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            {stats.active_threats > 0 ? 'Immediate action recommended' : 'No threats detected'}
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
              {stats.devices_at_risk}
            </span>
            <span className="text-muted-foreground ml-2 mb-1">of {stats.total_devices}</span>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            {stats.devices_at_risk === 0 ? 'All devices secure' : 'Some devices need attention'}
          </div>
        </div>

        {/* Compliance Status */}
        <div className="bg-secondary/50 rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Compliance Status</span>
            {stats.security_score >= 80 ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
          <div className="flex items-end">
            <span className={`text-xl font-bold ${stats.security_score >= 80 ? 'text-green-500' : 'text-red-500'}`}>
              {stats.security_score >= 80 ? 'Compliant' : 'Non-Compliant'}
            </span>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            {stats.security_score >= 80 
              ? 'All security requirements met' 
              : 'Action required to meet compliance'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySummary;

