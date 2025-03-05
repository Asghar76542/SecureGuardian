
import React from 'react';
import { AlertTriangle, Info, Calendar, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Mock data for threats
const mockThreats = [
  {
    id: '1',
    title: 'Phishing Campaign Targeting Government Employees',
    description: 'New sophisticated phishing emails impersonating IT department requesting password resets.',
    severity: 'high',
    date: '2023-11-10T14:30:00Z',
    source: 'CISA',
    link: '#',
  },
  {
    id: '2',
    title: 'Zero-day Vulnerability in VPN Software',
    description: 'Critical vulnerability discovered in Enterprise VPN solution allowing remote code execution.',
    severity: 'critical',
    date: '2023-11-09T09:15:00Z',
    source: 'NCSC',
    link: '#',
  },
  {
    id: '3',
    title: 'DDoS Attack Against Financial Institutions',
    description: 'Multiple financial institutions reporting distributed denial of service attacks.',
    severity: 'medium',
    date: '2023-11-07T18:45:00Z',
    source: 'FS-ISAC',
    link: '#',
  },
  {
    id: '4',
    title: 'New Ransomware Variant Detected',
    description: 'Ransomware utilizing novel encryption method and targeting healthcare organizations.',
    severity: 'high',
    date: '2023-11-05T11:20:00Z',
    source: 'FBI',
    link: '#',
  },
  {
    id: '5',
    title: 'Bluetooth Protocol Vulnerability',
    description: 'Security researchers have identified a vulnerability in Bluetooth protocol affecting mobile devices.',
    severity: 'medium',
    date: '2023-11-02T16:10:00Z',
    source: 'CERT',
    link: '#',
  },
];

// Format date to a readable format
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const ThreatFeed = () => {
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

  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-display font-semibold">Threat Intelligence Feed</h2>
          <p className="text-muted-foreground">Latest security threats and advisories</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Info className="h-4 w-4" />
          View All Threats
        </Button>
      </div>

      <div className="space-y-4">
        {mockThreats.map((threat) => (
          <div 
            key={threat.id}
            className={`bg-secondary/30 rounded-lg p-4 border-l-4 ${
              threat.severity === 'critical' ? 'border-red-600' : 
              threat.severity === 'high' ? 'border-red-500' : 
              threat.severity === 'medium' ? 'border-amber-500' :
              'border-green-500'
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className={`h-4 w-4 ${
                    threat.severity === 'critical' || threat.severity === 'high' ? 'text-red-500' : 'text-amber-500'
                  }`} />
                  <h3 className="font-medium">{threat.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{threat.description}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  {getSeverityBadge(threat.severity)}
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(threat.date)}
                  </div>
                  <Badge variant="outline">{threat.source}</Badge>
                </div>
              </div>
              <div className="flex items-center mt-2 md:mt-0">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" />
                  Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreatFeed;
