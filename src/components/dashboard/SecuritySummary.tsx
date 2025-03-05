
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import SecurityHeader from './security/SecurityHeader';
import SecurityScoreCard from './security/SecurityScoreCard';
import ActiveThreatsCard from './security/ActiveThreatsCard';
import DevicesAtRiskCard from './security/DevicesAtRiskCard';
import ComplianceStatusCard from './security/ComplianceStatusCard';
import SecuritySummarySkeleton from './security/SecuritySummarySkeleton';
import SecuritySummaryError from './security/SecuritySummaryError';
import { getLastScanText } from '@/utils/securityDataHelpers';

interface EnhancedSecuritySummaryData {
  total_devices: number;
  active_devices: number;
  devices_at_risk: number;
  active_threats: number;
  security_score: number;
  last_scan_time: string | null;
  time_since_scan: string | null;
  critical_threats: number;
  high_threats: number;
  medium_threats: number;
  low_threats: number;
  latest_threat_time: string | null;
}

const SecuritySummary = () => {
  const { toast } = useToast();

  const { 
    data: securityStats, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['securitySummary'],
    queryFn: async (): Promise<EnhancedSecuritySummaryData> => {
      const { data, error } = await supabase.rpc('get_enhanced_security_summary');
      
      if (error) {
        console.error('Error fetching enhanced security summary:', error);
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
          critical_threats: 0,
          high_threats: 0,
          medium_threats: 0,
          low_threats: 0,
          latest_threat_time: null,
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
        time_since_scan: data[0].time_since_scan ? String(data[0].time_since_scan) : null,
        critical_threats: Number(data[0].critical_threats) || 0,
        high_threats: Number(data[0].high_threats) || 0,
        medium_threats: Number(data[0].medium_threats) || 0,
        low_threats: Number(data[0].low_threats) || 0,
        latest_threat_time: data[0].latest_threat_time,
      };
    },
  });

  // Setup realtime subscription for security incidents
  useEffect(() => {
    // Subscribe to realtime updates for security incidents
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen for all events: INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'security_incidents'
        },
        (payload) => {
          console.log('Security incident updated:', payload);
          // Refetch security summary when incidents change
          refetch();
          
          // Show toast notification for new incidents
          if (payload.eventType === 'INSERT') {
            toast({
              title: 'New Security Incident',
              description: `A new security incident has been detected.`,
              variant: 'destructive',
            });
          }
        }
      )
      .subscribe();
      
    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch, toast]);

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
    last_scan_time: null,
    time_since_scan: null,
    critical_threats: 0,
    high_threats: 0,
    medium_threats: 0,
    low_threats: 0,
    latest_threat_time: null,
  };
  
  const lastScan = getLastScanText(stats.last_scan_time, stats.time_since_scan);

  return (
    <div className="glass-panel rounded-xl p-6 mb-8">
      <SecurityHeader 
        lastScan={lastScan} 
        criticalThreats={stats.critical_threats}
        highThreats={stats.high_threats}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SecurityScoreCard score={stats.security_score} />
        <ActiveThreatsCard 
          threatCount={stats.active_threats} 
          criticalCount={stats.critical_threats}
          highCount={stats.high_threats}
        />
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
