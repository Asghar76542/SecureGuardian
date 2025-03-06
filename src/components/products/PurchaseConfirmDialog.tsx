
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Loader2, ChevronDown, Settings, Calendar, Check, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  formatPrice, 
  formatBillingCycle, 
  getMonthlyEquivalent, 
  calculateMultiDeviceCost, 
  calculateHardwareCost,
  isDevicePlan, 
  isHardwareProduct,
  PriceTier,
  getTierDisplayName,
  getTierPercentageIncrease
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
  const [isDetailExpanded, setIsDetailExpanded] = useState(false);
  
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
  const tierPercentage = getTierPercentageIncrease(tier);
  
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
                <span className="font-medium">{tierName} {tier !== 'standard' && `(${tierPercentage})`}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Number of devices:</span>
                <span className="font-medium">{deviceCount}</span>
              </div>
              
              <div className="bg-muted/30 p-3 rounded-md my-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Summary</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsDetailExpanded(!isDetailExpanded)}
                    className="h-7 px-2 text-xs"
                  >
                    {isDetailExpanded ? 'Hide details' : 'Show details'}
                    <ChevronDown 
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDetailExpanded ? 'rotate-180' : ''}`}
                    />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <span>One-time setup fee:</span>
                  </span>
                  <span className="font-medium">{formatPrice(deviceCosts.setupFee)}</span>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Annual subscription:</span>
                  </span>
                  <span className="font-medium">{formatPrice(deviceCosts.yearlyPrice)}/year</span>
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex justify-between">
                  <span className="font-semibold">First payment total:</span>
                  <span className="font-bold">{formatPrice(deviceCosts.totalFirstPayment)}</span>
                </div>

                <Collapsible
                  open={isDetailExpanded}
                  onOpenChange={setIsDetailExpanded}
                  className="mt-4"
                >
                  <CollapsibleContent className="space-y-4 pt-3 border-t mt-2">
                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                        <Check className="h-3.5 w-3.5 text-primary" />
                        Device 1 (Primary Device)
                      </h4>
                      <div className="space-y-1 ml-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Setup fee:</span>
                          <span>{formatPrice(deviceCosts.firstDeviceSetupFee)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Annual subscription:</span>
                          <span>{formatPrice(deviceCosts.firstDeviceYearlyPrice)}</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t mt-1">
                          <span className="text-muted-foreground">Device 1 Total:</span>
                          <span className="font-medium">{formatPrice(deviceCosts.firstDeviceSetupFee + deviceCosts.firstDeviceYearlyPrice)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {deviceCount > 1 && (
                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                          <Check className="h-3.5 w-3.5 text-primary" />
                          Additional Devices (x{deviceCount - 1})
                        </h4>
                        <div className="space-y-1 ml-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Setup fee per device:</span>
                            <span>{formatPrice(deviceCosts.additionalSetupFee)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Annual subscription per device:</span>
                            <span>{formatPrice(deviceCosts.additionalYearlyPrice)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total setup fee ({deviceCount - 1} devices):</span>
                            <span>{formatPrice(deviceCosts.additionalSetupFee * (deviceCount - 1))}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total annual ({deviceCount - 1} devices):</span>
                            <span>{formatPrice(deviceCosts.additionalYearlyPrice * (deviceCount - 1))}</span>
                          </div>
                          <div className="flex justify-between pt-1 border-t mt-1">
                            <span className="text-muted-foreground">Additional Devices Total:</span>
                            <span className="font-medium">
                              {formatPrice((deviceCosts.additionalSetupFee + deviceCosts.additionalYearlyPrice) * (deviceCount - 1))}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {tier !== 'standard' && (
                      <div className="bg-primary/5 p-2 rounded border border-primary/20 mt-2">
                        <h4 className="font-medium text-sm mb-1 flex items-center gap-1">
                          <Info className="h-3.5 w-3.5 text-primary" />
                          {tierName} Tier Pricing Applied ({tierPercentage})
                        </h4>
                        <p className="text-xs text-muted-foreground ml-4">
                          A {tierPercentage} price increase has been applied to the base price for the {tierName.toLowerCase()} tier plan.
                        </p>
                      </div>
                    )}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </>
          )}
          
          {hardwareProduct && hardwareCosts && (
            <>
              <div className="flex justify-between mb-2">
                <span>Quantity:</span>
                <span className="font-medium">{deviceCount}</span>
              </div>
              
              <div className="bg-muted/30 p-3 rounded-md my-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Summary</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsDetailExpanded(!isDetailExpanded)}
                    className="h-7 px-2 text-xs"
                  >
                    {isDetailExpanded ? 'Hide details' : 'Show details'}
                    <ChevronDown 
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDetailExpanded ? 'rotate-180' : ''}`}
                    />
                  </Button>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span>Unit price:</span>
                  <span className="font-medium">{formatPrice(hardwareCosts.unitPrice)}</span>
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex justify-between">
                  <span className="font-semibold">Total cost:</span>
                  <span className="font-bold">{formatPrice(hardwareCosts.totalPrice)}</span>
                </div>
                
                <Collapsible
                  open={isDetailExpanded}
                  onOpenChange={setIsDetailExpanded}
                  className="mt-4"
                >
                  <CollapsibleContent className="space-y-2 pt-3 border-t mt-2">
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Product:</span>
                        <span>{productName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Unit price:</span>
                        <span>{formatPrice(hardwareCosts.unitPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Quantity:</span>
                        <span>x{deviceCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Calculation:</span>
                        <span>{formatPrice(hardwareCosts.unitPrice)} × {deviceCount}</span>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
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
