
import React, { useState } from 'react';
import { Activity, Search, Filter, Download, AlertCircle, UserCheck, ShieldAlert, ServerCrash } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Mock data for system logs
const mockLogs = [
  {
    id: 'log-001',
    timestamp: '2023-11-15T14:32:18Z',
    user: 'alice.johnson@example.gov',
    action: 'user.login',
    status: 'success',
    details: 'Successful login with YubiKey 2FA',
    ip: '192.168.1.45',
    severity: 'info'
  },
  {
    id: 'log-002',
    timestamp: '2023-11-15T14:28:05Z',
    user: 'bob.smith@example.gov',
    action: 'device.wipe',
    status: 'success',
    details: 'Remote wipe initiated for device DEV-423',
    ip: '192.168.1.22',
    severity: 'warning'
  },
  {
    id: 'log-003',
    timestamp: '2023-11-15T14:15:32Z',
    user: 'system',
    action: 'threat.detected',
    status: 'alert',
    details: 'Potential phishing attempt blocked',
    ip: '203.0.113.45',
    severity: 'critical'
  },
  {
    id: 'log-004',
    timestamp: '2023-11-15T14:12:47Z',
    user: 'carol.white@example.gov',
    action: 'user.failed_login',
    status: 'failure',
    details: 'Failed login attempt (3rd attempt)',
    ip: '192.168.1.56',
    severity: 'warning'
  },
  {
    id: 'log-005',
    timestamp: '2023-11-15T14:05:12Z',
    user: 'admin',
    action: 'user.approve',
    status: 'success',
    details: 'Approved new user david.miller@example.gov',
    ip: '192.168.1.10',
    severity: 'info'
  },
  {
    id: 'log-006',
    timestamp: '2023-11-15T13:58:33Z',
    user: 'system',
    action: 'system.update',
    status: 'success',
    details: 'Security definitions updated to version 2.4.5',
    ip: '192.168.1.1',
    severity: 'info'
  },
  {
    id: 'log-007',
    timestamp: '2023-11-15T13:45:22Z',
    user: 'eve.anderson@example.gov',
    action: 'document.access',
    status: 'success',
    details: 'Accessed classified document DOC-8712',
    ip: '192.168.1.78',
    severity: 'info'
  },
  {
    id: 'log-008',
    timestamp: '2023-11-15T13:32:08Z',
    user: 'system',
    action: 'anomaly.detected',
    status: 'alert',
    details: 'Unusual access pattern detected for user frank.wilson@example.gov',
    ip: '192.168.1.92',
    severity: 'high'
  },
  {
    id: 'log-009',
    timestamp: '2023-11-15T13:18:45Z',
    user: 'grace.hall@example.gov',
    action: 'config.change',
    status: 'success',
    details: 'Modified security policy for department Alpha',
    ip: '192.168.1.65',
    severity: 'info'
  },
  {
    id: 'log-010',
    timestamp: '2023-11-15T13:05:32Z',
    user: 'system',
    action: 'backup.complete',
    status: 'success',
    details: 'Daily encrypted backup completed successfully',
    ip: '192.168.1.2',
    severity: 'info'
  }
];

const SystemLogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');

  // Fetch audit logs from Supabase
  const { data: auditLogs, isLoading, error } = useQuery({
    queryKey: ['auditLogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('audit_logs')
        .select(`
          id, 
          action, 
          entity_type, 
          entity_id, 
          created_at, 
          ip_address,
          user_id,
          changes
        `)
        .order('created_at', { ascending: false })
        .limit(30);
      
      if (error) throw error;
      return data;
    },
  });

  // Use either real data or mock data based on what's available
  const logs = auditLogs && auditLogs.length > 0 ? auditLogs.map(log => ({
    id: log.id,
    timestamp: log.created_at,
    user: log.user_id || 'system',
    action: `${log.entity_type}.${log.action}`.toLowerCase(),
    status: 'success',
    details: `${log.action} on ${log.entity_type} ${log.entity_id}`,
    ip: log.ip_address || 'N/A',
    severity: log.action === 'DELETE' ? 'warning' : 'info'
  })) : mockLogs;

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return <Badge className="bg-red-600">Critical</Badge>;
      case 'high':
        return <Badge className="bg-red-500">High</Badge>;
      case 'warning':
        return <Badge className="bg-amber-500">Warning</Badge>;
      case 'info':
        return <Badge variant="outline" className="text-blue-500 border-blue-500">Info</Badge>;
      default:
        return <Badge variant="secondary">{severity}</Badge>;
    }
  };

  const getActionIcon = (action: string) => {
    if (action.includes('user') || action.includes('login')) {
      return <UserCheck className="h-4 w-4" />;
    } else if (action.includes('threat') || action.includes('anomaly')) {
      return <ShieldAlert className="h-4 w-4" />;
    } else if (action.includes('system')) {
      return <ServerCrash className="h-4 w-4" />;
    } else {
      return <Activity className="h-4 w-4" />;
    }
  };

  // Filter logs based on search and filters
  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ip.includes(searchQuery);
    
    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
    
    const matchesAction = actionFilter === 'all' || 
      (actionFilter === 'user' && log.action.includes('user')) ||
      (actionFilter === 'system' && log.action.includes('system')) ||
      (actionFilter === 'security' && (log.action.includes('threat') || log.action.includes('anomaly'))) ||
      (actionFilter === 'device' && log.action.includes('device'));
    
    return matchesSearch && matchesSeverity && matchesAction;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  return (
    <Card className="bg-secondary/30">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2 h-5 w-5" />
          System Audit Logs
        </CardTitle>
        <CardDescription>Security and activity monitoring logs</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Action Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="user">User Actions</SelectItem>
                <SelectItem value="system">System Actions</SelectItem>
                <SelectItem value="security">Security Alerts</SelectItem>
                <SelectItem value="device">Device Actions</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Logs Table */}
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin mr-2">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <span>Loading logs...</span>
          </div>
        ) : error ? (
          <div className="p-6 text-center text-destructive">
            <AlertCircle className="h-10 w-10 mx-auto mb-2" />
            <h3 className="font-medium text-lg">Error Loading Logs</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {(error as Error).message || 'There was an error fetching the audit logs.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="whitespace-nowrap">
                        {formatDate(log.timestamp)}
                      </TableCell>
                      <TableCell className="max-w-[150px] truncate">
                        {log.user}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getActionIcon(log.action)}
                          <span className="ml-2">{log.action}</span>
                        </div>
                      </TableCell>
                      <TableCell>{log.ip}</TableCell>
                      <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                      <TableCell className="max-w-[250px] truncate">
                        {log.details}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No logs matching your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
        <Button>
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SystemLogs;
