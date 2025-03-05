
import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, Globe, Bell, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for threat levels
const threatLevels = {
  global: 'elevated',
  regional: {
    northAmerica: 'elevated',
    europe: 'severe',
    asia: 'moderate',
    other: 'low'
  },
  categories: {
    phishing: 75,
    malware: 62,
    ransomware: 80,
    ddos: 45,
    zeroDay: 58
  }
};

// Mock data for active incidents
const activeIncidents = [
  {
    id: 'inc-001',
    title: 'Large-Scale Phishing Campaign',
    severity: 'high',
    region: 'Global',
    affectedUsers: 42,
    status: 'investigating',
    timestamp: '2023-11-15T08:32:15Z'
  },
  {
    id: 'inc-002',
    title: 'Zero-Day Vulnerability in VPN Software',
    severity: 'critical',
    region: 'Europe',
    affectedUsers: 18,
    status: 'mitigating',
    timestamp: '2023-11-15T10:17:42Z'
  },
  {
    id: 'inc-003',
    title: 'Suspected Insider Threat Activity',
    severity: 'medium',
    region: 'North America',
    affectedUsers: 3,
    status: 'investigating',
    timestamp: '2023-11-15T12:05:23Z'
  }
];

const GlobalThreatMonitor = () => {
  const [isEmergencyDialogOpen, setIsEmergencyDialogOpen] = useState(false);
  
  const getThreatColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600';
      case 'severe': return 'text-red-500';
      case 'high':
      case 'elevated': return 'text-amber-500';
      case 'moderate': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-green-500';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge className="bg-red-600 text-white">Critical</Badge>;
      case 'high':
        return <Badge className="bg-red-500 text-white">High</Badge>;
      case 'medium':
        return <Badge className="bg-amber-500 text-white">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-500 text-white">Low</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'investigating':
        return <Badge variant="outline" className="bg-blue-500/10 border-blue-500 text-blue-500">Investigating</Badge>;
      case 'mitigating':
        return <Badge variant="outline" className="bg-purple-500/10 border-purple-500 text-purple-500">Mitigating</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-500/10 border-green-500 text-green-500">Resolved</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Threat Level Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-secondary/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Globe className="mr-2 h-5 w-5" />
              Global Threat Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold capitalize ${getThreatColor(threatLevels.global)}`}>
              {threatLevels.global}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Last updated 15 minutes ago</p>
          </CardContent>
        </Card>

        <Card className="bg-secondary/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Active Incidents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">
              {activeIncidents.length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Across all regions</p>
          </CardContent>
        </Card>

        <Card className="bg-secondary/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <ShieldAlert className="mr-2 h-5 w-5" />
              Highest Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              Ransomware
            </div>
            <p className="text-sm text-muted-foreground mt-1">80% threat probability</p>
          </CardContent>
        </Card>

        <Card className="bg-secondary/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Emergency Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <AlertDialog open={isEmergencyDialogOpen} onOpenChange={setIsEmergencyDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full mt-2">
                  <Zap className="h-4 w-4 mr-2" />
                  Emergency Protocol
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Activate Emergency Protocol</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will trigger emergency measures including mass notifications and device security lockdowns. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
                    Confirm Emergency Protocol
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>

      {/* Threat Categories */}
      <Card className="bg-secondary/30">
        <CardHeader>
          <CardTitle>Threat Categories Analysis</CardTitle>
          <CardDescription>Current risk levels by attack vector</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Phishing Attacks</span>
                <span className="text-sm text-muted-foreground">{threatLevels.categories.phishing}%</span>
              </div>
              <Progress value={threatLevels.categories.phishing} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Malware Infections</span>
                <span className="text-sm text-muted-foreground">{threatLevels.categories.malware}%</span>
              </div>
              <Progress value={threatLevels.categories.malware} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Ransomware</span>
                <span className="text-sm text-muted-foreground">{threatLevels.categories.ransomware}%</span>
              </div>
              <Progress value={threatLevels.categories.ransomware} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">DDoS Attacks</span>
                <span className="text-sm text-muted-foreground">{threatLevels.categories.ddos}%</span>
              </div>
              <Progress value={threatLevels.categories.ddos} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Zero-Day Vulnerabilities</span>
                <span className="text-sm text-muted-foreground">{threatLevels.categories.zeroDay}%</span>
              </div>
              <Progress value={threatLevels.categories.zeroDay} className="h-2" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View Detailed Analysis</Button>
        </CardFooter>
      </Card>

      {/* Regional Monitoring */}
      <Card className="bg-secondary/30">
        <CardHeader>
          <CardTitle>Active Security Incidents</CardTitle>
          <CardDescription>Real-time monitoring of security events</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Incidents</TabsTrigger>
              <TabsTrigger value="critical">Critical</TabsTrigger>
              <TabsTrigger value="investigating">Investigating</TabsTrigger>
              <TabsTrigger value="mitigating">Mitigating</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="divide-y divide-border">
                {activeIncidents.map((incident) => (
                  <div key={incident.id} className="py-4 first:pt-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium flex items-center">
                          <AlertTriangle className={`h-4 w-4 mr-2 ${getThreatColor(incident.severity)}`} />
                          {incident.title}
                        </h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {getSeverityBadge(incident.severity)}
                          {getStatusBadge(incident.status)}
                          <Badge variant="outline">{incident.region}</Badge>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(incident.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Affecting {incident.affectedUsers} users. Incident response team is actively {incident.status} this threat.
                    </p>
                    <div className="mt-3">
                      <Button variant="outline" size="sm" className="mr-2">View Details</Button>
                      <Button size="sm">Manage Response</Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="critical">
              <div className="divide-y divide-border">
                {activeIncidents
                  .filter(incident => incident.severity === 'critical')
                  .map((incident) => (
                    <div key={incident.id} className="py-4 first:pt-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
                            {incident.title}
                          </h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {getSeverityBadge(incident.severity)}
                            {getStatusBadge(incident.status)}
                            <Badge variant="outline">{incident.region}</Badge>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(incident.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Affecting {incident.affectedUsers} users. Incident response team is actively {incident.status} this threat.
                      </p>
                      <div className="mt-3">
                        <Button variant="outline" size="sm" className="mr-2">View Details</Button>
                        <Button size="sm">Manage Response</Button>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="investigating">
              <div className="divide-y divide-border">
                {activeIncidents
                  .filter(incident => incident.status === 'investigating')
                  .map((incident) => (
                    <div key={incident.id} className="py-4 first:pt-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium flex items-center">
                            <AlertTriangle className={`h-4 w-4 mr-2 ${getThreatColor(incident.severity)}`} />
                            {incident.title}
                          </h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {getSeverityBadge(incident.severity)}
                            {getStatusBadge(incident.status)}
                            <Badge variant="outline">{incident.region}</Badge>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(incident.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Affecting {incident.affectedUsers} users. Incident response team is actively investigating this threat.
                      </p>
                      <div className="mt-3">
                        <Button variant="outline" size="sm" className="mr-2">View Details</Button>
                        <Button size="sm">Manage Response</Button>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="mitigating">
              <div className="divide-y divide-border">
                {activeIncidents
                  .filter(incident => incident.status === 'mitigating')
                  .map((incident) => (
                    <div key={incident.id} className="py-4 first:pt-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium flex items-center">
                            <AlertTriangle className={`h-4 w-4 mr-2 ${getThreatColor(incident.severity)}`} />
                            {incident.title}
                          </h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {getSeverityBadge(incident.severity)}
                            {getStatusBadge(incident.status)}
                            <Badge variant="outline">{incident.region}</Badge>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(incident.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Affecting {incident.affectedUsers} users. Incident response team is actively mitigating this threat.
                      </p>
                      <div className="mt-3">
                        <Button variant="outline" size="sm" className="mr-2">View Details</Button>
                        <Button size="sm">Manage Response</Button>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button className="w-full">View All Incidents</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GlobalThreatMonitor;
