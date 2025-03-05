
import React from 'react';
import { Shield, FileCheck, FileBadge, Download, Check, AlertTriangle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for compliance frameworks
const complianceFrameworks = [
  {
    id: 'iso27001',
    name: 'ISO 27001',
    status: 'compliant',
    lastAudit: '2023-10-15',
    nextAudit: '2024-04-15',
    score: 98,
    controls: 114,
    compliantControls: 112,
    nonCompliantControls: 2,
    inProgressControls: 0
  },
  {
    id: 'gdpr',
    name: 'GDPR',
    status: 'compliant',
    lastAudit: '2023-09-22',
    nextAudit: '2024-03-22',
    score: 96,
    controls: 87,
    compliantControls: 84,
    nonCompliantControls: 3,
    inProgressControls: 0
  },
  {
    id: 'nist',
    name: 'NIST 800-53',
    status: 'partial',
    lastAudit: '2023-11-01',
    nextAudit: '2024-05-01',
    score: 84,
    controls: 110,
    compliantControls: 92,
    nonCompliantControls: 8,
    inProgressControls: 10
  },
  {
    id: 'pci',
    name: 'PCI DSS',
    status: 'in-progress',
    lastAudit: '2023-08-10',
    nextAudit: '2024-02-10',
    score: 72,
    controls: 78,
    compliantControls: 56,
    nonCompliantControls: 12,
    inProgressControls: 10
  }
];

// Mock data for available reports
const availableReports = [
  {
    id: 'report-1',
    name: 'Annual Security Compliance Report',
    date: '2023-10-31',
    fileType: 'PDF',
    size: '4.2 MB'
  },
  {
    id: 'report-2',
    name: 'Q3 2023 Security Assessment',
    date: '2023-10-05',
    fileType: 'PDF',
    size: '3.8 MB'
  },
  {
    id: 'report-3',
    name: 'GDPR Compliance Audit',
    date: '2023-09-22',
    fileType: 'PDF',
    size: '5.1 MB'
  },
  {
    id: 'report-4',
    name: 'ISO 27001 Gap Analysis',
    date: '2023-08-15',
    fileType: 'XLSX',
    size: '2.3 MB'
  },
  {
    id: 'report-5',
    name: 'Security Controls Effectiveness Report',
    date: '2023-07-28',
    fileType: 'PDF',
    size: '3.5 MB'
  }
];

const ComplianceControls = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return <Badge className="bg-green-500">Compliant</Badge>;
      case 'partial':
        return <Badge className="bg-amber-500">Partially Compliant</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="text-blue-500 border-blue-500">In Progress</Badge>;
      case 'non-compliant':
        return <Badge variant="destructive">Non-Compliant</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-secondary/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Overall Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              87.5%
            </div>
            <Progress value={87.5} className="h-2 mt-2" />
            <p className="text-sm text-muted-foreground mt-2">Across all frameworks</p>
          </CardContent>
        </Card>

        <Card className="bg-secondary/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileCheck className="mr-2 h-5 w-5" />
              Frameworks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              4
            </div>
            <p className="text-sm text-muted-foreground mt-1">Active compliance frameworks</p>
          </CardContent>
        </Card>

        <Card className="bg-secondary/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Compliance Gaps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">
              25
            </div>
            <p className="text-sm text-muted-foreground mt-1">Controls requiring attention</p>
          </CardContent>
        </Card>

        <Card className="bg-secondary/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Next Audit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Feb 10, 2024
            </div>
            <p className="text-sm text-muted-foreground mt-1">PCI DSS compliance audit</p>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Frameworks */}
      <Card className="bg-secondary/30">
        <CardHeader>
          <CardTitle>Compliance Frameworks</CardTitle>
          <CardDescription>Status of regulatory and security standard compliance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceFrameworks.map((framework) => (
              <div key={framework.id} className="p-4 border border-border rounded-md">
                <div className="flex flex-col sm:flex-row justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{framework.name}</h3>
                    <div className="flex items-center mt-1">
                      {getStatusBadge(framework.status)}
                      <span className="text-sm text-muted-foreground ml-2">
                        Last audit: {formatDate(framework.lastAudit)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 sm:mt-0">
                    <div className="text-2xl font-bold mr-2">{framework.score}%</div>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-green-500/10 p-2 rounded">
                    <div className="text-lg font-semibold text-green-500">{framework.compliantControls}</div>
                    <div className="text-xs text-muted-foreground">Compliant</div>
                  </div>
                  <div className="bg-red-500/10 p-2 rounded">
                    <div className="text-lg font-semibold text-red-500">{framework.nonCompliantControls}</div>
                    <div className="text-xs text-muted-foreground">Non-Compliant</div>
                  </div>
                  <div className="bg-blue-500/10 p-2 rounded">
                    <div className="text-lg font-semibold text-blue-500">{framework.inProgressControls}</div>
                    <div className="text-xs text-muted-foreground">In Progress</div>
                  </div>
                </div>
                <Progress value={framework.score} className="h-2 mt-4" />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">View All Compliance Controls</Button>
        </CardFooter>
      </Card>

      {/* Available Reports */}
      <Card className="bg-secondary/30">
        <CardHeader>
          <CardTitle>Compliance Reports</CardTitle>
          <CardDescription>Download reports and documentation for audits</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="available">
            <TabsList className="mb-4">
              <TabsTrigger value="available">Available Reports</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled Audits</TabsTrigger>
              <TabsTrigger value="templates">Report Templates</TabsTrigger>
            </TabsList>
            <TabsContent value="available">
              <div className="divide-y divide-border">
                {availableReports.map((report) => (
                  <div key={report.id} className="py-3 first:pt-0 last:pb-0 flex justify-between items-center">
                    <div className="flex items-start">
                      <FileBadge className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                      <div>
                        <h4 className="font-medium">{report.name}</h4>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <span className="mr-2">{formatDate(report.date)}</span>
                          <Badge variant="outline" className="text-xs">{report.fileType}</Badge>
                          <span className="ml-2">{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="scheduled">
              <div className="p-4 text-center border border-dashed border-border rounded-md">
                <h4 className="text-lg font-medium">Upcoming Audits</h4>
                <p className="text-muted-foreground mt-2">View the schedule of upcoming compliance audits</p>
                <div className="mt-4 space-y-2">
                  <div className="p-3 bg-secondary/50 rounded-md flex justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      <span>PCI DSS Compliance</span>
                    </div>
                    <span className="text-sm">Feb 10, 2024</span>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-md flex justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      <span>GDPR Annual Review</span>
                    </div>
                    <span className="text-sm">Mar 22, 2024</span>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-md flex justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      <span>ISO 27001 Assessment</span>
                    </div>
                    <span className="text-sm">Apr 15, 2024</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="templates">
              <div className="p-4 text-center border border-dashed border-border rounded-md">
                <h4 className="text-lg font-medium">Report Templates</h4>
                <p className="text-muted-foreground mt-2">Standard templates for compliance reporting</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="p-3 bg-secondary/50 rounded-md">
                    <FileBadge className="h-10 w-10 mx-auto mb-2 text-primary" />
                    <h4 className="font-medium">ISO 27001 Template</h4>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-md">
                    <FileBadge className="h-10 w-10 mx-auto mb-2 text-primary" />
                    <h4 className="font-medium">GDPR Audit Template</h4>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-md">
                    <FileBadge className="h-10 w-10 mx-auto mb-2 text-primary" />
                    <h4 className="font-medium">NIST Assessment</h4>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-md">
                    <FileBadge className="h-10 w-10 mx-auto mb-2 text-primary" />
                    <h4 className="font-medium">PCI DSS Checklist</h4>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">Generate Custom Report</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ComplianceControls;
