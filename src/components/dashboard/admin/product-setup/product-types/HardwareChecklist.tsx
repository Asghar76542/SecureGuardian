
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SetupChecklistItem from '../SetupChecklistItem';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { KeyRound, Download, FileCheck, UploadCloud } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const HardwareChecklist = () => {
  const [checklist, setChecklist] = useState([
    { id: 'hw-1', title: 'Hardware Verification', description: 'Verify hardware authenticity and integrity', completed: false, required: true },
    { id: 'hw-2', title: 'Firmware Update', description: 'Apply latest firmware and security updates', completed: false, required: true },
    { id: 'hw-3', title: 'Physical Security Setup', description: 'Configure tamper protection and physical security features', completed: false, required: true },
    { id: 'hw-4', title: 'Key Management Process', description: 'Establish secure key management procedures', completed: false, required: true },
    { id: 'hw-5', title: 'Integration Testing', description: 'Test integration with existing security infrastructure', completed: false, required: true },
    { id: 'hw-6', title: 'User Enrollment Process', description: 'Configure user enrollment and provisioning workflow', completed: false, required: true },
    { id: 'hw-7', title: 'Backup Hardware Configuration', description: 'Set up backup/failover hardware devices', completed: false, required: false },
    { id: 'hw-8', title: 'Documentation Preparation', description: 'Prepare user guides and administrative documentation', completed: false, required: true },
    { id: 'hw-9', title: 'Security Testing', description: 'Conduct security validation and penetration testing', completed: false, required: true },
    { id: 'hw-10', title: 'Inventory Management', description: 'Enter devices into inventory management system', completed: false, required: true },
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
            <KeyRound className="h-5 w-5 text-primary" />
            Hardware Security Setup
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
        <div className="mb-4 p-3 border rounded-md bg-muted/50">
          <h3 className="font-medium">Product-Specific Instructions</h3>
          <p className="text-sm mt-1">Select a specific hardware product to view detailed setup instructions.</p>
          
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            <Button variant="outline" className="justify-start">YubiKey Security Key</Button>
            <Button variant="outline" className="justify-start">SmartCard Reader</Button>
            <Button variant="outline" className="justify-start">Hardware Security Module (HSM)</Button>
            <Button variant="outline" className="justify-start">Biometric Scanner</Button>
            <Button variant="outline" className="justify-start">Secure USB Drive</Button>
            <Button variant="outline" className="justify-start">Hardware Firewall</Button>
          </div>
        </div>
        
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
        
        <Separator className="my-6" />
        
        <div className="border rounded-md p-4 mb-6">
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <UploadCloud className="h-5 w-5 text-primary" />
            Required Documentation
          </h3>
          <p className="text-sm mb-4">Upload the following documentation to complete the setup process:</p>
          
          <ul className="list-disc list-inside text-sm space-y-2 mb-4 pl-2">
            <li>Hardware verification certificates</li>
            <li>Firmware update confirmation</li>
            <li>Security test results</li>
            <li>Device inventory records</li>
          </ul>
          
          <Button>Upload Documentation</Button>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            All required steps must be completed before hardware deployment
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

export default HardwareChecklist;
