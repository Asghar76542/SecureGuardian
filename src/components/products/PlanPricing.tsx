
import { formatPrice, formatBillingCycle, getMonthlyEquivalent } from '@/utils/priceFormatters';

interface PlanPricingProps {
  price: number;
  billingCycle: string;
}

const PlanPricing = ({ price, billingCycle }: PlanPricingProps) => {
  const monthlyEquivalent = getMonthlyEquivalent(price, billingCycle);

  return (
    <div className="mb-4">
      <span className="text-3xl font-bold">{formatPrice(price)}</span>
      <span className="text-muted-foreground ml-1">{formatBillingCycle(billingCycle)}</span>
      {monthlyEquivalent && (
        <div className="mt-1 text-sm text-muted-foreground">
          (Only {monthlyEquivalent} per month, billed annually)
        </div>
      )}
    </div>
  );
};

export default PlanPricing;
