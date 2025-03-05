
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FileText, CheckCircle2, AlertCircle, Upload, ExternalLink } from 'lucide-react';

interface SetupChecklistItemProps {
  id: string;
  title: string;
  description: string;
  required?: boolean;
  docLink?: string;
  completed?: boolean;
  onToggle: (id: string, completed: boolean) => void;
  children?: React.ReactNode;
}

const SetupChecklistItem: React.FC<SetupChecklistItemProps> = ({
  id,
  title,
  description,
  required = true,
  docLink,
  completed = false,
  onToggle,
  children
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(completed);

  const handleToggle = (checked: boolean) => {
    setIsChecked(checked);
    onToggle(id, checked);
  };

  return (
    <>
      <div className="p-4 border rounded-md mb-4">
        <div className="flex items-start gap-3">
          <Checkbox 
            id={`check-${id}`} 
            checked={isChecked}
            onCheckedChange={handleToggle}
            className="mt-1"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <label 
                htmlFor={`check-${id}`}
                className="font-medium cursor-pointer"
              >
                {title} {required && <span className="text-red-500">*</span>}
              </label>
              <div className="flex gap-2">
                {docLink && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 px-2 text-xs" 
                    onClick={() => window.open(docLink, '_blank')}
                  >
                    <FileText className="h-3.5 w-3.5 mr-1" />
                    Docs
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 px-2 text-xs"
                  onClick={() => setDialogOpen(true)}
                >
                  Details
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
            
            {children && (
              <div className="mt-3 pt-3 border-t">
                {children}
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="instructions">
                <AccordionTrigger>Detailed Instructions</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 p-2">
                    <p>Follow these steps to complete this setup task:</p>
                    <ol className="space-y-2 list-decimal list-inside">
                      <li>Log in to the admin portal for the product</li>
                      <li>Navigate to the Security Configuration section</li> 
                      <li>Enable all required security features as listed in the compliance documentation</li>
                      <li>Save the configuration and generate a compliance report</li>
                      <li>Upload the report to verify completion</li>
                    </ol>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="requirements">
                <AccordionTrigger>Requirements & Compliance</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 p-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">NIST Compliance Required</p>
                        <p className="text-sm text-muted-foreground">
                          This setup meets NIST SP 800-53 security controls
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">ISO 27001 Compliance</p>
                        <p className="text-sm text-muted-foreground">
                          Satisfies ISO 27001 control requirements for secure implementation
                        </p>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Documentation Required</p>
                        <p className="text-sm text-muted-foreground">
                          Upload evidence of completion for audit purposes
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="verification">
                <AccordionTrigger>Verification & Documentation</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 p-2">
                    <p className="text-sm">Upload verification documents or screenshots to confirm this step has been completed:</p>
                    
                    <div className="border-2 border-dashed rounded-md p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="mt-2 font-medium">Drop files here or click to upload</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, PNG, JPG up to 10MB
                      </p>
                      <Button size="sm" className="mt-4">Select Files</Button>
                    </div>
                    
                    <div className="bg-muted/50 p-3 rounded-md">
                      <p className="text-sm font-medium flex items-center">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Related Documentation
                      </p>
                      <ul className="text-sm mt-2 space-y-1">
                        <li className="text-primary hover:underline cursor-pointer">
                          Product Security Guide
                        </li>
                        <li className="text-primary hover:underline cursor-pointer">
                          Compliance Checklist Template
                        </li>
                        <li className="text-primary hover:underline cursor-pointer">
                          Configuration Best Practices
                        </li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              handleToggle(!isChecked);
              setDialogOpen(false);
            }}>
              {isChecked ? 'Mark as Incomplete' : 'Mark as Complete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SetupChecklistItem;
