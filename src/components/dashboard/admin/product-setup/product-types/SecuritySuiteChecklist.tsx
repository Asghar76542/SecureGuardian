
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SetupChecklistItem from '../SetupChecklistItem';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ShieldCheck, Download, FileCheck } from 'lucide-react';

const SecuritySuiteChecklist = () => {
  const [checklist, setChecklist] = useState([
    { id: 'sec-1', title: 'Initial Security Configuration', description: 'Set up base security parameters and access controls', completed: false, required: true },
    { id: 'sec-2', title: 'Integration with Identity Provider', description: 'Configure SSO and identity management settings', completed: false, required: true },
    { id: 'sec-3', title: 'Database Encryption Setup', description: 'Implement encryption for all sensitive data storage', completed: false, required: true },
    { id: 'sec-4', title: 'Firewall Rules Configuration', description: 'Set up network security and access rules', completed: false, required: true },
    { id: 'sec-5', title: 'Security Event Logging', description: 'Configure comprehensive logging and monitoring', completed: false, required: true },
    { id: 'sec-6', title: 'Data Loss Prevention Setup', description: 'Configure DLP policies and controls', completed: false, required: true },
    { id: 'sec-7', title: 'Backup and Recovery Configuration', description: 'Set up automated backup and disaster recovery processes', completed: false, required: true },
    { id: 'sec-8', title: 'Compliance Settings', description: 'Configure settings to meet regulatory requirements', completed: false, required: true },
    { id: 'sec-9', title: 'User Role Configuration', description: 'Define access roles and permissions', completed: false, required: true },
    { id: 'sec-10', title: 'Security Testing', description: 'Perform vulnerability scanning and penetration testing', completed: false, required: true },
  ]);
  
  const handleToggleItem = (id: string, completed: boolean) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, completed } : item
    ));
  };
  
  const completedCount = checklist.filter(item => item.completed).length;
  const progressPercentage = (completedCount / checklist.length) * 100;
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Security Suite Setup
          </CardTitle>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export Checklist
          </Button>
        </div>
        
        <div className="flex items-center gap-4 mt-4">
          <div className="flex-1">
            <Progress value={progressPercentage} className="h-2" />
          </div>
          <div className="text-sm font-medium whitespace-nowrap">
            {completedCount} of {checklist.length} tasks complete
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-1">
          {checklist.map(item => (
            <SetupChecklistItem
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              required={item.required}
              completed={item.completed}
              onToggle={handleToggleItem}
              docLink="#"
            />
          ))}
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            All required steps must be completed before product deployment
          </p>
          <div className="flex gap-2">
            <Button variant="outline">
              Save Progress
            </Button>
            <Button disabled={completedCount < checklist.length}>
              <FileCheck className="h-4 w-4 mr-2" />
              Mark Setup as Complete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySuiteChecklist;
