
import { useState } from 'react';
import { formatPrice, formatBillingCycle, getMonthlyEquivalent, calculateMultiDeviceCost, isDevicePlan } from '@/utils/priceFormatters';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PlanPricingProps {
  price: number;
  billingCycle: string;
  onDeviceCountChange?: (count: number) => void;
}

const PlanPricing = ({ price, billingCycle, onDeviceCountChange }: PlanPricingProps) => {
  const [deviceCount, setDeviceCount] = useState(1);
  const isHardware = billingCycle.includes('unit');
  const devicePlan = isDevicePlan(billingCycle);
  const monthlyEquivalent = getMonthlyEquivalent(price, billingCycle);
  
  // Calculate multi-device costs if it's a device plan
  const costs = devicePlan 
    ? calculateMultiDeviceCost(deviceCount, price) 
    : null;

  const handleDeviceCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value);
    if (!isNaN(count) && count > 0 && count <= 100) {
      setDeviceCount(count);
      if (onDeviceCountChange) {
        onDeviceCountChange(count);
      }
    }
  };

  return (
    <div className="mb-4">
      {/* Main price display */}
      {devicePlan ? (
        <div className="space-y-4">
          <div>
            <span className="text-3xl font-bold">{formatPrice(price)}</span>
            <span className="text-muted-foreground ml-1">{formatBillingCycle(billingCycle)}</span>
          </div>
          
          <div className="border-t pt-3 mt-3">
            <div className="flex items-center gap-2 mb-2">
              <Label htmlFor="deviceCount">Number of devices:</Label>
              <Input
                id="deviceCount"
                type="number"
                min="1"
                max="100"
                value={deviceCount}
                onChange={handleDeviceCountChange}
                className="w-20 h-8"
              />
            </div>
            
            {costs && (
              <div className="space-y-1 mt-3 text-sm">
                <div className="flex justify-between">
                  <span>One-time setup fee:</span>
                  <span className="font-medium">{formatPrice(costs.setupFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly subscription:</span>
                  <span className="font-medium">{formatPrice(costs.monthlyPrice)}/month</span>
                </div>
                <div className="flex justify-between pt-2 border-t mt-2">
                  <span>First payment:</span>
                  <span className="font-semibold">{formatPrice(costs.totalFirstPayment)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
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
