
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SetupChecklistItem from '../SetupChecklistItem';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Server, Download, FileCheck } from 'lucide-react';

const InfrastructureChecklist = () => {
  const [checklist, setChecklist] = useState([
    { id: 'infra-1', title: 'Network Topology Setup', description: 'Configure network architecture and segmentation', completed: false, required: true },
    { id: 'infra-2', title: 'Server Hardening', description: 'Apply security hardening to all server infrastructure', completed: false, required: true },
    { id: 'infra-3', title: 'Load Balancer Configuration', description: 'Set up and optimize load balancing for high availability', completed: false, required: true },
    { id: 'infra-4', title: 'SSL/TLS Implementation', description: 'Configure encryption for all network communications', completed: false, required: true },
    { id: 'infra-5', title: 'Monitoring Systems Setup', description: 'Deploy monitoring and alerting infrastructure', completed: false, required: true },
    { id: 'infra-6', title: 'Backup Infrastructure', description: 'Implement backup systems and verify functionality', completed: false, required: true },
    { id: 'infra-7', title: 'Disaster Recovery Configuration', description: 'Set up and test disaster recovery procedures', completed: false, required: true },
    { id: 'infra-8', title: 'Patch Management System', description: 'Configure automated patching and update processes', completed: false, required: true },
    { id: 'infra-9', title: 'Network Access Controls', description: 'Implement network security and access policies', completed: false, required: true },
    { id: 'infra-10', title: 'Performance Testing', description: 'Conduct load testing and performance verification', completed: false, required: false },
  ]);
  
  const handleToggleItem = (id: string, completed: boolean) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, completed } : item
    ));
  };
  
  const completedCount = checklist.filter(item => item.completed).length;
  const requiredItems = checklist.filter(item => item.required);
  const completedRequiredCount = requiredItems.filter(item => item.completed).length;
  const progressPercentage = (completedCount / checklist.length) * 100;
  const allRequiredCompleted = completedRequiredCount === requiredItems.length;
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            Infrastructure Setup
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
            All required steps must be completed before infrastructure deployment
          </p>
          <div className="flex gap-2">
            <Button variant="outline">
              Save Progress
            </Button>
            <Button disabled={!allRequiredCompleted}>
              <FileCheck className="h-4 w-4 mr-2" />
              Mark Setup as Complete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfrastructureChecklist;
