
import { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PlanPricingProps {
  price: number;
  billingCycle: string;
  onDeviceCountChange?: (count: number) => void;
  planName?: string;
}

const PlanPricing = ({ price, billingCycle, onDeviceCountChange, planName = '' }: PlanPricingProps) => {
  const [itemCount, setItemCount] = useState(1);
  const [tier, setTier] = useState<PriceTier>('standard');
  
  // Determine tier from plan name if not selected by user
  const determineTierFromName = (): PriceTier => {
    const planNameLower = planName.toLowerCase();
    if (planNameLower.includes('enterprise')) return 'enterprise';
    if (planNameLower.includes('pro') || planNameLower.includes('professional')) return 'pro';
    return 'standard';
  };
  
  // Use tier from plan name when component initializes
  useState(() => {
    const initialTier = determineTierFromName();
    setTier(initialTier);
  });
  
  // Check product types
  const devicePlan = isDevicePlan(billingCycle);
  const hardwareProduct = isHardwareProduct(billingCycle);
  
  console.log('PlanPricing - billingCycle:', billingCycle);
  console.log('PlanPricing - isDevicePlan:', devicePlan);
  console.log('PlanPricing - isHardwareProduct:', hardwareProduct);
  
  const monthlyEquivalent = getMonthlyEquivalent(price, billingCycle);
  
  // Calculate costs based on product type
  const deviceCosts = devicePlan 
    ? calculateMultiDeviceCost(itemCount, price, tier) 
    : null;
    
  const hardwareCosts = hardwareProduct
    ? calculateHardwareCost(itemCount, price)
    : null;

  const handleItemCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value);
    if (!isNaN(count) && count > 0 && count <= 100) {
      setItemCount(count);
      if (onDeviceCountChange) {
        onDeviceCountChange(count);
      }
    }
  };
  
  const handleTierChange = (value: string) => {
    setTier(value as PriceTier);
  };

  return (
    <div className="mb-4">
      {/* Device plan pricing */}
      {devicePlan && deviceCosts && (
        <div className="space-y-4">
          <div>
            <span className="text-3xl font-bold">{formatPrice(deviceCosts.firstDeviceYearlyPrice)}</span>
            <span className="text-muted-foreground ml-1">{formatBillingCycle(billingCycle)}</span>
          </div>
          
          <div className="border-t pt-3 mt-3">
            {!planName && (
              <div className="mb-4">
                <Label htmlFor="tierSelect">Pricing Tier:</Label>
                <Select 
                  value={tier} 
                  onValueChange={handleTierChange}
                >
                  <SelectTrigger id="tierSelect" className="w-full">
                    <SelectValue placeholder="Select Tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="pro">Professional (+30%)</SelectItem>
                    <SelectItem value="enterprise">Enterprise (+69%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="flex items-center gap-2 mb-2">
              <Label htmlFor="deviceCount">Number of devices:</Label>
              <Input
                id="deviceCount"
                type="number"
                min="1"
                max="100"
                value={itemCount}
                onChange={handleItemCountChange}
                className="w-20 h-8"
              />
            </div>
            
            <div className="space-y-1 mt-3 text-sm">
              <div className="flex justify-between">
                <span>One-time setup fee:</span>
                <span className="font-medium">{formatPrice(deviceCosts.setupFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>Annual subscription:</span>
                <span className="font-medium">{formatPrice(deviceCosts.yearlyPrice)}/year</span>
              </div>
              <div className="flex justify-between pt-2 border-t mt-2">
                <span>First payment:</span>
                <span className="font-semibold">{formatPrice(deviceCosts.totalFirstPayment)}</span>
              </div>
              
              {tier !== 'standard' && (
                <div className="mt-2 text-xs text-primary">
                  <p>{getTierDisplayName(tier)} tier pricing applied</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Hardware product pricing */}
      {hardwareProduct && (
        <div className="space-y-4">
          <div>
            <span className="text-3xl font-bold">{formatPrice(price)}</span>
            <span className="text-muted-foreground ml-1">{formatBillingCycle(billingCycle)}</span>
          </div>
          
          <div className="border-t pt-3 mt-3">
            <div className="flex items-center gap-2 mb-2">
              <Label htmlFor="unitCount">Quantity:</Label>
              <Input
                id="unitCount"
                type="number"
                min="1"
                max="100"
                value={itemCount}
                onChange={handleItemCountChange}
                className="w-20 h-8"
              />
            </div>
            
            {hardwareCosts && (
              <div className="space-y-1 mt-3 text-sm">
                <div className="flex justify-between">
                  <span>Unit price:</span>
                  <span className="font-medium">{formatPrice(hardwareCosts.unitPrice)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t mt-2">
                  <span>Total cost:</span>
                  <span className="font-semibold">{formatPrice(hardwareCosts.totalPrice)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Standard pricing (not device or hardware) */}
      {!devicePlan && !hardwareProduct && (
        <>
          <span className="text-3xl font-bold">{formatPrice(price)}</span>
          <span className="text-muted-foreground ml-1">{formatBillingCycle(billingCycle)}</span>
          
          {/* Show monthly equivalent for annual subscriptions */}
          {monthlyEquivalent && (
            <div className="mt-1 text-sm text-muted-foreground">
              (Only {monthlyEquivalent} per month, billed annually)
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PlanPricing;
