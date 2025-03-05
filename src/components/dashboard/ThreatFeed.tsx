
import React, { useState } from 'react';
import { AlertTriangle, Info, Calendar, ExternalLink, Filter, ChevronsUpDown, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data for threats
const allThreats = [
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
  {
    id: '6',
    title: 'Advanced Persistent Threat Group Targeting Defense Contractors',
    description: 'APT group using spear-phishing techniques to target defense industry employees.',
    severity: 'critical',
    date: '2023-10-30T13:25:00Z',
    source: 'FBI',
    link: '#',
  },
  {
    id: '7',
    title: 'Supply Chain Compromise Affecting Software Libraries',
    description: 'Malicious code inserted into popular open-source libraries used in government applications.',
    severity: 'high',
    date: '2023-10-28T09:40:00Z',
    source: 'CISA',
    link: '#',
  },
  {
    id: '8',
    title: 'Credential Stuffing Attacks on Government Portals',
    description: 'Increased credential stuffing attempts observed against multiple government web portals.',
    severity: 'medium',
    date: '2023-10-25T15:15:00Z',
    source: 'NCSC',
    link: '#',
  },
];

// Format date to a readable format
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

interface ThreatFeedProps {
  showAllThreats?: boolean;
}

const ThreatFeed = ({ showAllThreats = false }: ThreatFeedProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string[]>([]);
  const [sourceFilter, setSourceFilter] = useState<string[]>([]);

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

  // Filter and limit threats based on search, filters, and showAllThreats
  const filteredThreats = allThreats
    .filter(threat => {
      const matchesSearch = 
        threat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        threat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        threat.source.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSeverity = severityFilter.length === 0 || 
        severityFilter.includes(threat.severity);
      
      const matchesSource = sourceFilter.length === 0 || 
        sourceFilter.includes(threat.source);
      
      return matchesSearch && matchesSeverity && matchesSource;
    })
    .slice(0, showAllThreats ? undefined : 5);

  // Get unique sources for filter
  const sources = [...new Set(allThreats.map(threat => threat.source))];

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

      {/* Search and Filters */}
      {showAllThreats && (
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search threats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Severity
                  <ChevronsUpDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Severity</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={severityFilter.includes('critical')}
                  onCheckedChange={(checked) => {
                    checked 
                      ? setSeverityFilter([...severityFilter, 'critical'])
                      : setSeverityFilter(severityFilter.filter(sev => sev !== 'critical'));
                  }}
                >
                  Critical
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={severityFilter.includes('high')}
                  onCheckedChange={(checked) => {
                    checked 
                      ? setSeverityFilter([...severityFilter, 'high'])
                      : setSeverityFilter(severityFilter.filter(sev => sev !== 'high'));
                  }}
                >
                  High
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={severityFilter.includes('medium')}
                  onCheckedChange={(checked) => {
                    checked 
                      ? setSeverityFilter([...severityFilter, 'medium'])
                      : setSeverityFilter(severityFilter.filter(sev => sev !== 'medium'));
                  }}
                >
                  Medium
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={severityFilter.includes('low')}
                  onCheckedChange={(checked) => {
                    checked 
                      ? setSeverityFilter([...severityFilter, 'low'])
                      : setSeverityFilter(severityFilter.filter(sev => sev !== 'low'));
                  }}
                >
                  Low
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Source
                  <ChevronsUpDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Source</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {sources.map(source => (
                  <DropdownMenuCheckboxItem
                    key={source}
                    checked={sourceFilter.includes(source)}
                    onCheckedChange={(checked) => {
                      checked 
                        ? setSourceFilter([...sourceFilter, source])
                        : setSourceFilter(sourceFilter.filter(src => src !== source));
                    }}
                  >
                    {source}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {filteredThreats.length > 0 ? (
          filteredThreats.map((threat) => (
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
          ))
        ) : (
          <div className="text-center py-6 border border-dashed border-border rounded-lg">
            <AlertTriangle className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
            <h3 className="font-medium">No Threats Found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              No threats matching your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreatFeed;
