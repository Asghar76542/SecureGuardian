
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShieldCheck, 
  Server, 
  HardDrive, 
  FileCheck, 
  KeyRound,
  Shield,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import SetupChecklistItem from './SetupChecklistItem';
import ProductTypeSelector from './ProductTypeSelector';
import SecuritySuiteChecklist from './product-types/SecuritySuiteChecklist';
import InfrastructureChecklist from './product-types/InfrastructureChecklist';
import HardwareChecklist from './product-types/HardwareChecklist';

const ProductSetupChecklists = () => {
  const [selectedProductType, setSelectedProductType] = useState<string>('security-suite');
  
  // Fetch products from the database to populate product selector
  const { data: products, isLoading } = useQuery({
    queryKey: ['products-for-setup'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');
        
      if (error) throw error;
      
      return data || [];
    }
  });

  // Render the appropriate checklist based on the selected product type
  const renderChecklist = () => {
    switch(selectedProductType) {
      case 'security-suite':
        return <SecuritySuiteChecklist />;
      case 'infrastructure':
        return <InfrastructureChecklist />;
      case 'hardware':
        return <HardwareChecklist />;
      default:
        return <div className="py-12 text-center text-muted-foreground">Select a product type to view setup instructions</div>;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-xl">
            <FileCheck className="h-5 w-5 text-primary" />
            Product Setup Guide
          </CardTitle>
          <CardDescription>
            Follow these checklists to properly configure products for deployment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            These checklists ensure that all products are set up according to our security standards and compliance requirements.
            Complete all required steps before approving product deployment or customer orders.
          </p>
          
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-md mb-4">
            <div className="flex gap-2 text-amber-800">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Important Notice</h4>
                <p className="text-sm">All setup steps must be completed and documented before products can be deployed to customers. Incomplete setups may result in security vulnerabilities or compliance issues.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="product-types" className="space-y-4">
        <TabsList>
          <TabsTrigger value="product-types" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Product Types</span>
          </TabsTrigger>
          <TabsTrigger value="recent-setups" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span>Recent Setups</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="product-types" className="space-y-4">
          <ProductTypeSelector 
            selectedType={selectedProductType}
            onSelectType={setSelectedProductType}
          />
          
          {renderChecklist()}
        </TabsContent>
        
        <TabsContent value="recent-setups">
          <Card>
            <CardHeader>
              <CardTitle>Recent Product Setups</CardTitle>
              <CardDescription>
                View and continue recently started product setup processes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">YubiKey Hardware Token Setup</h3>
                    <p className="text-sm text-muted-foreground">Started 2 days ago - 60% complete</p>
                  </div>
                  <Button>Continue Setup</Button>
                </div>
                
                <div className="border rounded-md p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Enterprise Security Suite</h3>
                    <p className="text-sm text-muted-foreground">Started yesterday - 30% complete</p>
                  </div>
                  <Button>Continue Setup</Button>
                </div>
                
                <div className="border rounded-md p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Network Infrastructure</h3>
                    <p className="text-sm text-muted-foreground">Started today - 10% complete</p>
                  </div>
                  <Button>Continue Setup</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductSetupChecklists;
