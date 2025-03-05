
import { formatPrice, formatBillingCycle, getMonthlyEquivalent, getMonthlyPriceText } from '@/utils/priceFormatters';

interface PlanPricingProps {
  price: number;
  billingCycle: string;
}

const PlanPricing = ({ price, billingCycle }: PlanPricingProps) => {
  const isHardware = billingCycle.includes('unit');
  const monthlyEquivalent = getMonthlyEquivalent(price, billingCycle);

  return (
    <div className="mb-4">
      {/* Main price display */}
      <span className="text-3xl font-bold">{formatPrice(price)}</span>
      <span className="text-muted-foreground ml-1">{formatBillingCycle(billingCycle)}</span>
      
      {/* Show monthly equivalent for annual subscriptions */}
      {monthlyEquivalent && (
        <div className="mt-1 text-sm text-muted-foreground">
          (Only {monthlyEquivalent} per month, billed annually)
        </div>
      )}
    </div>
  );
};

export default PlanPricing;
