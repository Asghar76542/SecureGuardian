
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import PlanFeatures from './PlanFeatures';
import PlanPricing from './PlanPricing';
import PurchaseConfirmDialog from './PurchaseConfirmDialog';
import PlanCardHeader from './PlanCardHeader';
import PlanCardFooter from './PlanCardFooter';
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
  productType?: string;
}

const PlanCard = ({ plan, productName, productType }: PlanProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [itemCount, setItemCount] = useState(1);
  
  const devicePlan = isDevicePlan(plan.billing_cycle);
  const hardwareProduct = isHardwareProduct(plan.billing_cycle);
  const isSecuritySuite = productName.includes("Security Suite");
  
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
      // Calculate order details based on product type
      let orderAmount = plan.price;
      let orderNotes = null;
      
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
      
      // Create purchase order
      await createPurchaseOrder(orderAmount, orderNotes);
      
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

  // Helper function to create purchase order
  const createPurchaseOrder = async (orderAmount: number, orderNotes: string | null) => {
    // Create the purchase order record
    const { data, error } = await supabase
      .from('purchase_orders')
      .insert({
        user_id: profile!.id,
        ...(profile!.org_id && { org_id: profile!.org_id }),
        product_plan_id: plan.id,
        amount: orderAmount,
        billing_cycle: plan.billing_cycle,
        ...(orderNotes && { notes: orderNotes })
      })
      .select()
      .single();
      
    if (error) throw error;
    
    // Create the purchase order item
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
  };

  const handleItemCountChange = (count: number) => {
    setItemCount(count);
  };

  // Card classes for styling
  const cardClasses = `overflow-hidden h-full flex flex-col ${plan.is_popular ? 'border-primary' : ''} ${isSecuritySuite ? 'shadow-md' : ''}`;

  return (
    <>
      <Card className={cardClasses}>
        <PlanCardHeader 
          name={plan.name}
          description={plan.description}
          isPopular={plan.is_popular}
        />
        
        <CardContent className="pb-0 flex-grow">
          <PlanPricing 
            price={plan.price} 
            billingCycle={plan.billing_cycle}
            onDeviceCountChange={handleItemCountChange}
          />
          
          <PlanFeatures features={plan.features} productType={productType} />
        </CardContent>
        
        <PlanCardFooter 
          isPopular={plan.is_popular}
          onPurchaseClick={() => setShowConfirmDialog(true)}
        />
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
