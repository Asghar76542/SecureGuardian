
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import SecurityHeader from './security/SecurityHeader';
import SecurityScoreCard from './security/SecurityScoreCard';
import ActiveThreatsCard from './security/ActiveThreatsCard';
import DevicesAtRiskCard from './security/DevicesAtRiskCard';
import ComplianceStatusCard from './security/ComplianceStatusCard';
import SecuritySummarySkeleton from './security/SecuritySummarySkeleton';
import SecuritySummaryError from './security/SecuritySummaryError';

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
      
      // Ensure all numeric values are properly handled as numbers
      return {
        total_devices: Number(data[0].total_devices) || 0,
        active_devices: Number(data[0].active_devices) || 0,
        devices_at_risk: Number(data[0].devices_at_risk) || 0,
        active_threats: Number(data[0].active_threats) || 0,
        security_score: Number(data[0].security_score) || 0,
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
      } else if (interval.includes('minutes')) {
        const minutes = parseInt(interval);
        return minutes <= 1 ? "Just now" : `${minutes} minutes ago`;
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

  // Use a loading state while fetching data
  if (isLoading) {
    return <SecuritySummarySkeleton />;
  }

  // Show error UI if there's an issue
  if (error) {
    return <SecuritySummaryError />;
  }

  // Use defaults if data is unavailable
  const stats = securityStats || {
    security_score: 0,
    active_threats: 0,
    devices_at_risk: 0,
    total_devices: 0,
  };
  
  const lastScan = getLastScanText();

  return (
    <div className="glass-panel rounded-xl p-6 mb-8">
      <SecurityHeader lastScan={lastScan} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SecurityScoreCard score={stats.security_score} />
        <ActiveThreatsCard threatCount={stats.active_threats} />
        <DevicesAtRiskCard 
          devicesAtRisk={stats.devices_at_risk} 
          totalDevices={stats.total_devices} 
        />
        <ComplianceStatusCard securityScore={stats.security_score} />
      </div>
    </div>
  );
};

export default SecuritySummary;
