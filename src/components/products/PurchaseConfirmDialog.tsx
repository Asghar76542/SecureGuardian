
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { formatPrice, formatBillingCycle, getMonthlyEquivalent } from '@/utils/priceFormatters';

interface PurchaseConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  productName: string;
  price: number;
  billingCycle: string;
  onConfirm: () => void;
  isSubmitting: boolean;
}

const PurchaseConfirmDialog = ({ 
  open, 
  onOpenChange, 
  planName, 
  productName, 
  price, 
  billingCycle, 
  onConfirm, 
  isSubmitting 
}: PurchaseConfirmDialogProps) => {
  const isHardware = billingCycle.includes('device') || billingCycle.includes('unit');
  const monthlyEquivalent = getMonthlyEquivalent(price, billingCycle);

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
          <p className="text-sm text-muted-foreground mt-4">
            {isHardware 
              ? 'Your hardware purchase request will be sent to an administrator for approval.'
              : 'Your purchase request will be sent to an administrator for approval.'}
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
