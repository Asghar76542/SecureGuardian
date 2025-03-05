
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import PlanFeatures from './PlanFeatures';
import PlanPricing from './PlanPricing';
import PurchaseConfirmDialog from './PurchaseConfirmDialog';
import { 
  calculateMultiDeviceCost, 
  calculateHardwareCost, 
  isDevicePlan, 
  isHardwareProduct 
} from '@/utils/priceFormatters';

interface PlanProps {
  plan: {
    id: string;
    product_id: string;
    name: string;
    description: string;
    price: number;
    billing_cycle: string;
    features: string[];
    is_popular: boolean;
  };
  productName: string;
}

const PlanCard = ({ plan, productName }: PlanProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [itemCount, setItemCount] = useState(1);
  
  console.log('PlanCard - billing_cycle:', plan.billing_cycle);
  
  const devicePlan = isDevicePlan(plan.billing_cycle);
  const hardwareProduct = isHardwareProduct(plan.billing_cycle);
  const isSecuritySuite = productName.includes("Security Suite");
  
  console.log('PlanCard - isDevicePlan:', devicePlan);
  console.log('PlanCard - isHardwareProduct:', hardwareProduct);
  
  // Get pricing details for device-based plans
  const deviceCosts = devicePlan 
    ? calculateMultiDeviceCost(itemCount, plan.price) 
    : null;
    
  // Get pricing details for hardware products
  const hardwareCosts = hardwareProduct
    ? calculateHardwareCost(itemCount, plan.price)
    : null;
  
  const handlePurchase = async () => {
    if (!profile) {
      toast({
        title: "Authentication Required",
        description: "Please log in to purchase this plan.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let orderAmount = plan.price;
      let orderNotes = null;
      
      // Calculate order amount based on product type
      if (devicePlan && deviceCosts) {
        orderAmount = deviceCosts.totalFirstPayment;
        orderNotes = JSON.stringify({
          itemCount,
          setupFee: deviceCosts.setupFee,
          monthlyPrice: deviceCosts.monthlyPrice
        });
      } else if (hardwareProduct && hardwareCosts) {
        orderAmount = hardwareCosts.totalPrice;
        orderNotes = JSON.stringify({
          itemCount,
          unitPrice: hardwareCosts.unitPrice
        });
      }
      
      const { data, error } = await supabase
        .from('purchase_orders')
        .insert({
          user_id: profile.id,
          ...(profile.org_id && { org_id: profile.org_id }),
          product_plan_id: plan.id,
          amount: orderAmount,
          billing_cycle: plan.billing_cycle,
          ...(orderNotes && { notes: orderNotes })
        })
        .select()
        .single();
        
      if (error) throw error;
      
      const { error: itemError } = await supabase
        .from('purchase_order_items')
        .insert({
          purchase_order_id: data.id,
          product_id: plan.product_id,
          product_plan_id: plan.id,
          quantity: devicePlan || hardwareProduct ? itemCount : 1,
          unit_price: plan.price,
          total_price: orderAmount
        });
        
      if (itemError) throw itemError;
      
      toast({
        title: "Order Submitted",
        description: "Your purchase request has been submitted for approval.",
      });
      
      setShowConfirmDialog(false);
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Error creating purchase order:', error);
      toast({
        title: "Error",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleItemCountChange = (count: number) => {
    console.log('Item count changed to:', count);
    setItemCount(count);
  };

  // Additional classes for security suite plan cards to make them more prominent
  const cardClasses = `overflow-hidden h-full flex flex-col ${plan.is_popular ? 'border-primary' : ''} ${isSecuritySuite ? 'shadow-md' : ''}`;

  return (
    <>
      <Card className={cardClasses}>
        {plan.is_popular && (
          <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
            Most Popular
          </div>
        )}
        
        <CardHeader className={`pb-2 ${plan.is_popular ? 'pt-4' : ''}`}>
          <CardTitle>{plan.name}</CardTitle>
          <CardDescription>{plan.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="pb-0 flex-grow">
          <PlanPricing 
            price={plan.price} 
            billingCycle={plan.billing_cycle}
            onDeviceCountChange={handleItemCountChange}
          />
          
          <PlanFeatures features={plan.features} />
        </CardContent>
        
        <CardFooter className="pt-6 mt-auto">
          <Button 
            className="w-full"
            variant={plan.is_popular ? "default" : "outline"}
            onClick={() => setShowConfirmDialog(true)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Purchase
          </Button>
        </CardFooter>
      </Card>

      <PurchaseConfirmDialog 
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        planName={plan.name}
        productName={productName}
        price={plan.price}
        billingCycle={plan.billing_cycle}
        onConfirm={handlePurchase}
        isSubmitting={isSubmitting}
        deviceCount={itemCount}
      />
    </>
  );
};

export default PlanCard;
