
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { formatPrice, formatBillingCycle, getMonthlyEquivalent, calculateMultiDeviceCost } from '@/utils/priceFormatters';

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
  const isHardware = billingCycle.includes('unit');
  const isDevicePlan = billingCycle.includes('device');
  const monthlyEquivalent = getMonthlyEquivalent(price, billingCycle);
  
  // Calculate costs for device plans
  const costs = isDevicePlan 
    ? calculateMultiDeviceCost(deviceCount, price) 
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
          
          {isDevicePlan ? (
            <>
              <div className="flex justify-between mb-2">
                <span>Number of devices:</span>
                <span className="font-medium">{deviceCount}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Setup fee:</span>
                <span className="font-medium">{formatPrice(costs?.setupFee || 0)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Monthly subscription:</span>
                <span className="font-medium">{formatPrice(costs?.monthlyPrice || 0)}/month</span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2">
                <span>First payment total:</span>
                <span className="font-bold">{formatPrice(costs?.totalFirstPayment || 0)}</span>
              </div>
            </>
          ) : (
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
            {isHardware 
              ? 'Your hardware purchase request will be sent to an administrator for approval.'
              : isDevicePlan
                ? 'Your multi-device security plan request will be sent to an administrator for approval.'
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
