
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ShoppingCart, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatBillingCycle = (cycle: string) => {
    switch (cycle) {
      case 'monthly':
        return 'per device/month';
      case 'annually':
        return 'per device/year';
      case 'quarterly':
        return 'per device/quarter';
      default:
        return '';
    }
  };

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
      // Create a purchase order
      const { data, error } = await supabase
        .from('purchase_orders')
        .insert({
          user_id: profile.id,
          // Only use org_id if it exists in the profile
          ...(profile.org_id && { org_id: profile.org_id }),
          product_plan_id: plan.id,
          amount: plan.price,
          billing_cycle: plan.billing_cycle
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // Create a purchase order item
      const { error: itemError } = await supabase
        .from('purchase_order_items')
        .insert({
          purchase_order_id: data.id,
          product_id: plan.product_id,
          product_plan_id: plan.id,
          quantity: 1,
          unit_price: plan.price,
          total_price: plan.price
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

  // Add annual savings badge text if plan is annual
  const getAnnualSavingsBadge = () => {
    if (plan.billing_cycle === 'annually') {
      return (
        <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
          Save 50%
        </Badge>
      );
    }
    return null;
  };

  return (
    <>
      <Card className={`overflow-hidden h-full flex flex-col ${plan.is_popular ? 'border-primary' : ''}`}>
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
          <div className="mb-4">
            <span className="text-3xl font-bold">{formatPrice(plan.price)}</span>
            <span className="text-muted-foreground ml-1">{formatBillingCycle(plan.billing_cycle)}</span>
            {getAnnualSavingsBadge()}
          </div>
          
          <div className="space-y-3">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
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

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogDescription>
              You are about to request purchase of the {plan.name} plan for {productName}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex justify-between mb-2">
              <span>Plan:</span>
              <span className="font-medium">{plan.name}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Price:</span>
              <span className="font-medium">{formatPrice(plan.price)} {formatBillingCycle(plan.billing_cycle)}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Your purchase request will be sent to an administrator for approval.
              You will be notified once your request has been processed.
            </p>
            {plan.billing_cycle === 'annually' && (
              <p className="text-sm text-green-600 mt-2">
                Annual billing saves 50% compared to monthly pricing.
              </p>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handlePurchase} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ShoppingCart className="h-4 w-4 mr-2" />}
              Confirm Purchase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PlanCard;
