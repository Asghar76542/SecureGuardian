
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

// Default fallback data when no data is available from the database
const DEFAULT_SECURITY_DATA: EnhancedSecuritySummaryData = {
  total_devices: 0,
  active_devices: 0,
  devices_at_risk: 0,
  active_threats: 0,
  security_score: 70, // Default reasonable score
  last_scan_time: new Date().toISOString(), // Current time as default
  time_since_scan: "0 minutes", // Just now
  critical_threats: 0,
  high_threats: 0,
  medium_threats: 0,
  low_threats: 0,
  latest_threat_time: null,
};

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
      try {
        // First try to get the enhanced security summary
        const { data: enhancedData, error: enhancedError } = await supabase.rpc('get_enhanced_security_summary');
        
        if (enhancedError) {
          console.error('Error fetching enhanced security summary:', enhancedError);
          
          // Fall back to the basic security summary if enhanced fails
          const { data: basicData, error: basicError } = await supabase.rpc('get_user_security_summary');
          
          if (basicError) {
            console.error('Error fetching basic security summary:', basicError);
            // If both fail, try direct table query as last resort
            const { data: tableData, error: tableError } = await supabase
              .from('enhanced_security_summary')
              .select('*')
              .limit(1);
              
            if (tableError) {
              console.error('Error querying security summary table:', tableError);
              throw new Error('All security data sources failed');
            }
            
            if (!tableData || tableData.length === 0) {
              console.warn('No security data available in direct table query');
              return { ...DEFAULT_SECURITY_DATA };
            }
            
            return transformSecurityData(tableData[0]);
          }
          
          if (!basicData || basicData.length === 0) {
            console.warn('No basic security data available');
            return { ...DEFAULT_SECURITY_DATA };
          }
          
          // Transform basic data to enhanced format
          return {
            ...basicData[0],
            critical_threats: 0,
            high_threats: 0,
            medium_threats: 0,
            low_threats: 0,
            latest_threat_time: null
          };
        }
        
        if (!enhancedData || enhancedData.length === 0) {
          console.warn('No enhanced security data available');
          return { ...DEFAULT_SECURITY_DATA };
        }
        
        return transformSecurityData(enhancedData[0]);
      } catch (error) {
        console.error('Unhandled error in security data fetching:', error);
        toast({
          title: 'Error',
          description: 'Failed to load security data, using fallback values',
          variant: 'destructive',
        });
        return { ...DEFAULT_SECURITY_DATA };
      }
    },
    retry: 1, // Only retry once to avoid too many failed attempts
    refetchOnWindowFocus: false, // Don't refetch when window gets focus to reduce load
  });

  // Helper function to transform and sanitize security data
  const transformSecurityData = (data: any): EnhancedSecuritySummaryData => {
    return {
      total_devices: Number(data.total_devices) || 0,
      active_devices: Number(data.active_devices) || 0,
      devices_at_risk: Number(data.devices_at_risk) || 0,
      active_threats: Number(data.active_threats) || 0,
      security_score: Number(data.security_score) || DEFAULT_SECURITY_DATA.security_score,
      last_scan_time: data.last_scan_time || DEFAULT_SECURITY_DATA.last_scan_time,
      time_since_scan: data.time_since_scan ? String(data.time_since_scan) : DEFAULT_SECURITY_DATA.time_since_scan,
      critical_threats: Number(data.critical_threats) || 0,
      high_threats: Number(data.high_threats) || 0,
      medium_threats: Number(data.medium_threats) || 0,
      low_threats: Number(data.low_threats) || 0,
      latest_threat_time: data.latest_threat_time,
    };
  };

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

  // Only show error UI for major failures where we couldn't get fallback data
  if (error && !securityStats) {
    return <SecuritySummaryError refetch={refetch} />;
  }

  // Use defaults if data is unavailable
  const stats = securityStats || DEFAULT_SECURITY_DATA;
  
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
