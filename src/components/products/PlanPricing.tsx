
import { formatPrice, formatBillingCycle, getMonthlyEquivalent } from '@/utils/priceFormatters';

interface PlanPricingProps {
  price: number;
  billingCycle: string;
}

const PlanPricing = ({ price, billingCycle }: PlanPricingProps) => {
  return (
    <div className="mb-4">
      <span className="text-3xl font-bold">{formatPrice(price)}</span>
      <span className="text-muted-foreground ml-1">{formatBillingCycle()}</span>
      <div className="mt-1 text-sm text-muted-foreground">
        (Only {getMonthlyEquivalent(price)} per month, billed annually)
      </div>
    </div>
  );
};

export default PlanPricing;
