
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { 
  formatPrice, 
  formatBillingCycle, 
  getMonthlyEquivalent, 
  calculateMultiDeviceCost, 
  calculateHardwareCost,
  isDevicePlan, 
  isHardwareProduct,
  PriceTier,
  getTierDisplayName
} from '@/utils/priceFormatters';

interface PurchaseConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  productName: string;
  price: number;
  billingCycle: string;
  onConfirm: () => void;
  isSubmitting: boolean;
  deviceCount?: number;
}

const PurchaseConfirmDialog = ({ 
  open, 
  onOpenChange, 
  planName, 
  productName, 
  price, 
  billingCycle, 
  onConfirm, 
  isSubmitting,
  deviceCount = 1
}: PurchaseConfirmDialogProps) => {
  console.log('PurchaseConfirmDialog - billingCycle:', billingCycle);
  console.log('PurchaseConfirmDialog - deviceCount:', deviceCount);
  
  // Determine tier from plan name
  const determineTierFromName = (): PriceTier => {
    const planNameLower = planName.toLowerCase();
    if (planNameLower.includes('enterprise')) return 'enterprise';
    if (planNameLower.includes('pro') || planNameLower.includes('professional')) return 'pro';
    return 'standard';
  };
  
  const tier = determineTierFromName();
  const tierName = getTierDisplayName(tier);
  
  const devicePlan = isDevicePlan(billingCycle);
  const hardwareProduct = isHardwareProduct(billingCycle);
  
  console.log('PurchaseConfirmDialog - isDevicePlan:', devicePlan);
  console.log('PurchaseConfirmDialog - isHardwareProduct:', hardwareProduct);
  console.log('PurchaseConfirmDialog - tier:', tier);
  
  const monthlyEquivalent = getMonthlyEquivalent(price, billingCycle);
  
  // Calculate costs for device plans
  const deviceCosts = devicePlan 
    ? calculateMultiDeviceCost(deviceCount, price, tier) 
    : null;
    
  // Calculate costs for hardware products
  const hardwareCosts = hardwareProduct
    ? calculateHardwareCost(deviceCount, price)
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Purchase</DialogTitle>
          <DialogDescription>
            You are about to request purchase of the {planName} plan for {productName}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex justify-between mb-2">
            <span>Plan:</span>
            <span className="font-medium">{planName}</span>
          </div>
          
          {devicePlan && deviceCosts && (
            <>
              <div className="flex justify-between mb-2">
                <span>Pricing tier:</span>
                <span className="font-medium">{tierName}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Number of devices:</span>
                <span className="font-medium">{deviceCount}</span>
              </div>
              {deviceCount === 1 ? (
                <>
                  <div className="flex justify-between mb-2">
                    <span>Setup fee (first device):</span>
                    <span className="font-medium">{formatPrice(deviceCosts.firstDeviceSetupFee)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Annual subscription (first device):</span>
                    <span className="font-medium">{formatPrice(deviceCosts.firstDeviceYearlyPrice)}/year</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between mb-2">
                    <span>Setup fee (first device):</span>
                    <span className="font-medium">{formatPrice(deviceCosts.firstDeviceSetupFee)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Setup fee ({deviceCount - 1} additional {deviceCount - 1 === 1 ? 'device' : 'devices'}):</span>
                    <span className="font-medium">{formatPrice(deviceCosts.additionalSetupFee * (deviceCount - 1))}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Annual subscription (first device):</span>
                    <span className="font-medium">{formatPrice(deviceCosts.firstDeviceYearlyPrice)}/year</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Annual subscription ({deviceCount - 1} additional {deviceCount - 1 === 1 ? 'device' : 'devices'}):</span>
                    <span className="font-medium">{formatPrice(deviceCosts.additionalYearlyPrice * (deviceCount - 1))}/year</span>
                  </div>
                </>
              )}
              <div className="flex justify-between border-t pt-2 mt-2">
                <span>First payment total:</span>
                <span className="font-bold">{formatPrice(deviceCosts.totalFirstPayment)}</span>
              </div>
            </>
          )}
          
          {hardwareProduct && hardwareCosts && (
            <>
              <div className="flex justify-between mb-2">
                <span>Quantity:</span>
                <span className="font-medium">{deviceCount}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Unit price:</span>
                <span className="font-medium">{formatPrice(hardwareCosts.unitPrice)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2">
                <span>Total cost:</span>
                <span className="font-bold">{formatPrice(hardwareCosts.totalPrice)}</span>
              </div>
            </>
          )}
          
          {!devicePlan && !hardwareProduct && (
            <>
              <div className="flex justify-between mb-2">
                <span>Price:</span>
                <span className="font-medium">{formatPrice(price)} {formatBillingCycle(billingCycle)}</span>
              </div>
              {monthlyEquivalent && (
                <div className="flex justify-between">
                  <span>Monthly equivalent:</span>
                  <span>{monthlyEquivalent} per month</span>
                </div>
              )}
            </>
          )}

          <p className="text-sm text-muted-foreground mt-4">
            {hardwareProduct 
              ? `Your hardware purchase request (${deviceCount} ${deviceCount > 1 ? 'units' : 'unit'}) will be sent to an administrator for approval.`
              : devicePlan
                ? `Your ${tierName.toLowerCase()} tier security plan request (${deviceCount} ${deviceCount > 1 ? 'devices' : 'device'}) will be sent to an administrator for approval.`
                : 'Your subscription purchase request will be sent to an administrator for approval.'}
            You will be notified once your request has been processed.
          </p>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ShoppingCart className="h-4 w-4 mr-2" />}
            Confirm Purchase
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseConfirmDialog;
