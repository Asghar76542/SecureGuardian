
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
  getTierDisplayName,
  getTierPercentageIncrease
} from '@/utils/priceFormatters';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronsUpDown, InfoIcon, Wrench, Calendar, PlusCircle, Settings } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PlanPricingProps {
  price: number;
  billingCycle: string;
  onDeviceCountChange?: (count: number) => void;
  planName?: string;
}

const PlanPricing = ({ price, billingCycle, onDeviceCountChange, planName = '' }: PlanPricingProps) => {
  const [itemCount, setItemCount] = useState(1);
  const [tier, setTier] = useState<PriceTier>('standard');
  const [isExpanded, setIsExpanded] = useState(false);
  
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
            
            <TooltipProvider>
              <div className="space-y-3 mt-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-base">Summary</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-60">This is a summary of your costs. Click 'View Breakdown' for detailed itemized costs.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                    <span>One-time setup fee:</span>
                  </span>
                  <span className="font-medium">{formatPrice(deviceCosts.setupFee)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Annual subscription:</span>
                  </span>
                  <span className="font-medium">{formatPrice(deviceCosts.yearlyPrice)}/year</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between pt-2 mt-2">
                  <span className="font-semibold">First payment:</span>
                  <span className="font-semibold">{formatPrice(deviceCosts.totalFirstPayment)}</span>
                </div>
                
                {tier !== 'standard' && (
                  <div className="mt-2 text-xs text-primary">
                    <p>{getTierDisplayName(tier)} tier pricing applied ({getTierPercentageIncrease(tier)})</p>
                  </div>
                )}
                
                <Collapsible
                  open={isExpanded}
                  onOpenChange={setIsExpanded}
                  className="mt-4 space-y-2"
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm font-medium">
                    <span>View Detailed Breakdown</span>
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 rounded-md border p-3 bg-muted/20">
                    <div>
                      <h4 className="font-medium text-sm mb-2">
                        Device 1 (Primary Device)
                      </h4>
                      <div className="space-y-1 ml-2 text-sm">
                        <div className="flex justify-between">
                          <span className="flex items-center gap-1.5">
                            <Settings className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-muted-foreground">Setup fee:</span>
                          </span>
                          <span className="font-medium">{formatPrice(deviceCosts.firstDeviceSetupFee)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-muted-foreground">Annual subscription:</span>
                          </span>
                          <span className="font-medium">{formatPrice(deviceCosts.firstDeviceYearlyPrice)}</span>
                        </div>
                        <div className="flex justify-between pt-1">
                          <span className="text-muted-foreground">Device 1 Total:</span>
                          <span className="font-medium">{formatPrice(deviceCosts.firstDeviceSetupFee + deviceCosts.firstDeviceYearlyPrice)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {itemCount > 1 && (
                      <div>
                        <h4 className="font-medium text-sm mb-2">
                          Additional Devices (x{itemCount - 1})
                        </h4>
                        <div className="space-y-1 ml-2 text-sm">
                          <div className="flex justify-between">
                            <span className="flex items-center gap-1.5">
                              <Settings className="h-3.5 w-3.5 text-muted-foreground" />
                              <span className="text-muted-foreground">Setup fee per device:</span>
                            </span>
                            <span className="font-medium">{formatPrice(deviceCosts.additionalSetupFee)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                              <span className="text-muted-foreground">Annual subscription per device:</span>
                            </span>
                            <span className="font-medium">{formatPrice(deviceCosts.additionalYearlyPrice)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Setup fee (all additional):</span>
                            <span className="font-medium">{formatPrice(deviceCosts.additionalSetupFee * (itemCount - 1))}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Annual (all additional):</span>
                            <span className="font-medium">{formatPrice(deviceCosts.additionalYearlyPrice * (itemCount - 1))}</span>
                          </div>
                          <div className="flex justify-between pt-1">
                            <span className="text-muted-foreground">Additional Devices Total:</span>
                            <span className="font-medium">
                              {formatPrice((deviceCosts.additionalSetupFee + deviceCosts.additionalYearlyPrice) * (itemCount - 1))}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {tier !== 'standard' && (
                      <div>
                        <h4 className="font-medium text-sm mb-2">
                          {getTierDisplayName(tier)} Tier Pricing ({getTierPercentageIncrease(tier)})
                        </h4>
                        <div className="space-y-1 ml-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Base cost (Standard tier):</span>
                            <span className="font-medium">
                              {formatPrice(
                                deviceCosts.baseFirstDeviceSetupFee + 
                                deviceCosts.baseFirstDeviceYearlyPrice + 
                                (itemCount > 1 ? (deviceCosts.baseAdditionalSetupFee + deviceCosts.baseAdditionalYearlyPrice) * (itemCount - 1) : 0)
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tier multiplier:</span>
                            <span className="font-medium">x{deviceCosts.tierMultiplier.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between pt-1">
                            <span className="text-muted-foreground">Additional cost due to tier:</span>
                            <span className="font-medium text-primary">
                              {formatPrice(deviceCosts.totalFirstPayment - (
                                deviceCosts.baseFirstDeviceSetupFee + 
                                deviceCosts.baseFirstDeviceYearlyPrice + 
                                (itemCount > 1 ? (deviceCosts.baseAdditionalSetupFee + deviceCosts.baseAdditionalYearlyPrice) * (itemCount - 1) : 0)
                              ))}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div className="pt-1">
                      <div className="flex justify-between">
                        <span className="font-medium">Total Setup Fees:</span>
                        <span className="font-medium">{formatPrice(deviceCosts.setupFee)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Total Annual Subscription:</span>
                        <span className="font-medium">{formatPrice(deviceCosts.yearlyPrice)}</span>
                      </div>
                      <div className="flex justify-between pt-2 mt-1 border-t">
                        <span className="font-semibold">First Payment Total:</span>
                        <span className="font-semibold">{formatPrice(deviceCosts.totalFirstPayment)}</span>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </TooltipProvider>
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
                
                <Collapsible
                  open={isExpanded}
                  onOpenChange={setIsExpanded}
                  className="mt-4 space-y-2"
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm font-medium">
                    <span>View Detailed Breakdown</span>
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 rounded-md border p-3 bg-muted/20">
                    <div>
                      <h4 className="font-medium text-sm mb-2">
                        Item Cost Breakdown
                      </h4>
                      <div className="space-y-1 ml-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Unit price:</span>
                          <span className="font-medium">{formatPrice(hardwareCosts.unitPrice)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Quantity:</span>
                          <span className="font-medium">x{itemCount}</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t mt-1">
                          <span className="font-medium">Total cost:</span>
                          <span className="font-medium">{formatPrice(hardwareCosts.totalPrice)}</span>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
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
