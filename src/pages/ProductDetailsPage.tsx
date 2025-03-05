
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import PlanCard from '@/components/products/PlanCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Shield, Database, Lock, Package, Key, Tag } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

interface ProductFeature {
  name: string;
  description: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  type: string;
  features: ProductFeature[];
}

interface Plan {
  id: string;
  product_id: string;
  name: string;
  description: string;
  price: number;
  billing_cycle: string;
  features: string[];
  is_popular: boolean;
}

const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile } = useAuth();
  
  console.log('ProductDetailsPage - productId:', productId);

  const { 
    data: product, 
    isLoading: productLoading,
    error: productError 
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      if (!productId) throw new Error("Product ID is required");
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();
        
      if (error) throw error;
      
      return {
        ...data,
        features: data.features as unknown as ProductFeature[]
      } as Product;
    },
    enabled: !!productId
  });

  const { 
    data: plans, 
    isLoading: plansLoading,
    error: plansError 
  } = useQuery({
    queryKey: ['product-plans', productId],
    queryFn: async () => {
      if (!productId) throw new Error("Product ID is required");
      
      const { data, error } = await supabase
        .from('product_plans')
        .select('*')
        .eq('product_id', productId)
        .eq('is_active', true)
        .order('price', { ascending: true });
        
      if (error) throw error;
      
      console.log('Fetched plans:', data);
      
      const modifiedData = data.map(plan => {
        // Convert security product plans to per-device
        if (product?.type === 'security' && !plan.billing_cycle.includes('device')) {
          console.log('Modifying security plan to be a device plan:', plan.name);
          return { ...plan, billing_cycle: 'per-device' };
        }
        
        // Convert infrastructure product plans to per-device
        if (product?.type === 'infrastructure' && !plan.billing_cycle.includes('device')) {
          console.log('Modifying infrastructure plan to be a device plan:', plan.name);
          return { ...plan, billing_cycle: 'infrastructure-device' };
        }
        
        return plan;
      });
      
      return modifiedData as Plan[];
    },
    enabled: !!productId && !!product
  });

  const getIcon = () => {
    if (!product) return null;
    
    switch (product.type) {
      case 'security':
        return <Shield className="h-6 w-6 text-primary" />;
      case 'infrastructure':
        return <Database className="h-6 w-6 text-primary" />;
      case 'hardware':
        if (product.name.toLowerCase().includes('yubi')) {
          return <Key className="h-6 w-6 text-primary" />;
        } else if (product.name.toLowerCase().includes('faraday')) {
          return <Package className="h-6 w-6 text-primary" />;
        } else if (product.name.toLowerCase().includes('tag')) {
          return <Tag className="h-6 w-6 text-primary" />;
        } else {
          return <Lock className="h-6 w-6 text-primary" />;
        }
      default:
        return null;
    }
  };

  const isSecuritySuite = product?.name?.includes("Security Suite");

  const isLoading = productLoading || plansLoading;
  const error = productError || plansError;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !product) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center py-16">
          <p className="text-destructive mb-4">Error loading product details</p>
          <Button onClick={() => navigate('/products')}>Back to Products</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => navigate('/products')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center gap-2 mb-2">
          {getIcon()}
          <h1 className="text-3xl font-display font-semibold">{product.name}</h1>
        </div>
        <p className="text-muted-foreground">
          {product.description}
        </p>
      </div>

      {isSecuritySuite ? (
        <>
          {/* Security Suite Pillars */}
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">Key Security Features: A Triad of Protection</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-medium text-lg mb-3">Proactive Threat Prevention</h3>
                <p className="text-sm text-muted-foreground">
                  We go beyond reactive measures. Our suite is designed to identify and neutralize threats before they can impact your operations, minimizing risk and disruption.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-medium text-lg mb-3">Rapid Incident Response & Containment</h3>
                <p className="text-sm text-muted-foreground">
                  In the event of a security incident, speed is paramount. Our suite ensures swift detection, containment, and remediation, minimizing damage and downtime.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-medium text-lg mb-3">Data Protection & Compliance Assurance</h3>
                <p className="text-sm text-muted-foreground">
                  Data is the lifeblood of your organization. We provide robust tools and processes to protect sensitive information and meet stringent regulatory requirements.
                </p>
              </div>
            </div>
          </div>

          {/* Advanced Security Features */}
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">Advanced Security Features: Going Beyond the Basics</h2>
            <Accordion type="single" collapsible className="mb-6">
              <AccordionItem value="crypto-shredding">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">
                  Remote Crypto-Shredding: Military-Grade Data Erasure, Total Control
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p className="mb-4">
                    When devices are lost, stolen, or reach their end-of-life, the risk of data breach is significant. Our Remote Crypto-Shredding feature provides unparalleled control over sensitive data, allowing you to remotely and irrevocably wipe devices, ensuring data is unrecoverable.
                  </p>
                  <div className="bg-secondary/20 p-4 rounded-md mb-4">
                    <h4 className="font-medium mb-2">Key Benefits:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Beyond Deletion, True Destruction: Ensures data is forensically unrecoverable</li>
                      <li>Customizable Shredding Levels: Choose from various overwrite patterns</li>
                      <li>Centralized Management: Remotely initiate and manage crypto-shredding</li>
                      <li>Detailed Audit Logs & Reporting: Generate comprehensive reports</li>
                      <li>Proactive Data Breach Prevention: Reduces risk of data leaks</li>
                      <li>Supports Compliance Mandates: GDPR, CCPA, HIPAA compliance</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="duress-codes">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">
                  Duress Codes with Selective Data Wipe: Discreet Distress Signaling
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p className="mb-4">
                    In situations of duress, coercion, or forced access, employee safety is paramount. Our enhanced Duress Codes feature provides a covert method for employees to signal for help while also selectively wiping sensitive data from designated apps or locations on the device.
                  </p>
                  <div className="bg-secondary/20 p-4 rounded-md mb-4">
                    <h4 className="font-medium mb-2">Key Benefits:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Dual-Action Security: Combines distress signaling with data protection</li>
                      <li>Selective Data Wipe Customization: Define specific apps and locations</li>
                      <li>Immediate Data Protection in Crisis: Prevents unauthorized access</li>
                      <li>Enhanced Employee Safety: Empowers employees with discreet help signals</li>
                      <li>Customizable Response Protocols: Tailor to your organization's policies</li>
                      <li>Geo-Tracking Integration (Professional & Enterprise Plans)</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="soc-monitoring">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">
                  24/7 Security Operations Center (SOC) Monitoring: Always-On Vigilance
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p className="mb-4">
                    Our dedicated Security Operations Center (SOC) acts as your always-on security nerve center, providing continuous, 24/7 monitoring of your entire security environment. Staffed by highly skilled security analysts and threat hunters with advanced threat intelligence.
                  </p>
                  <div className="bg-secondary/20 p-4 rounded-md mb-4">
                    <h4 className="font-medium mb-2">Key Benefits:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Proactive Threat Hunting: Goes beyond reactive alerts</li>
                      <li>Real-Time Threat Intelligence: Leverages up-to-the-minute threat data</li>
                      <li>Expert Security Analyst Team: Access to experienced professionals</li>
                      <li>Reduced Dwell Time of Threats: Faster detection and response</li>
                      <li>Improved Security Posture: Strengthens overall security resilience</li>
                      <li>Compliance & Audit Readiness: Demonstrates security commitment</li>
                      <li>Scalable Security Solution: Adapts to your organization's growth</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </>
      ) : (
        // Standard product features section for non-Security Suite products
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((feature, index) => (
              <div key={index} className="bg-card p-4 rounded-lg border">
                <h3 className="font-medium mb-2">{feature.name}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-medium mb-2">Available Plans</h2>
        <p className="text-muted-foreground mb-6">
          {product.type === 'hardware' 
            ? 'Enterprise-grade security hardware with simple procurement options' 
            : product.type === 'security'
              ? 'Select the security plan that aligns with your organization\'s size, risk profile, and specific security requirements'
              : 'Enterprise-grade security with simple annual billing'}
        </p>
        
        {isSecuritySuite && (
          <div className="bg-secondary/20 p-4 rounded-md mb-6 text-sm text-muted-foreground">
            <p className="font-medium mb-2">Compliance Note:</p>
            <p>
              Our Security Suite is designed to be a powerful tool in assisting organizations to meet various compliance requirements. 
              However, achieving and maintaining full regulatory compliance is a shared responsibility. It depends not only on the 
              technology deployed but also on your specific implementation, internal policies, and organizational practices.
            </p>
          </div>
        )}
        
        {plans && plans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map(plan => (
              <PlanCard 
                key={plan.id} 
                plan={plan} 
                productName={product.name}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No plans available for this product at the moment.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProductDetailsPage;
