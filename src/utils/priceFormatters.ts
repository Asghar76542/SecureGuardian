
/**
 * Utility functions for formatting prices and billing cycles
 */

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0
  }).format(price);
};

export const formatBillingCycle = (billingCycle?: string) => {
  if (billingCycle && billingCycle.includes('device')) {
    return 'per device';
  } else if (billingCycle && billingCycle.includes('unit')) {
    return 'per unit';
  } else {
    return 'per device/year';
  }
};

export const getMonthlyEquivalent = (price: number, billingCycle?: string) => {
  // If it's a hardware product that's billed per unit, just return the price
  if (billingCycle && (billingCycle.includes('device') || billingCycle.includes('unit'))) {
    return null;
  }
  
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0
  }).format(Math.round(price / 12));
};
