
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
  if (!billingCycle) return '';
  
  if (billingCycle.includes('device')) {
    return 'per device/month';
  } else if (billingCycle.includes('unit')) {
    return 'per unit';
  } else {
    return 'per year';
  }
};

export const getMonthlyEquivalent = (price: number, billingCycle?: string) => {
  // If it's a hardware product that's billed per unit, just return null
  if (billingCycle && billingCycle.includes('unit')) {
    return null;
  }
  
  // Calculate the monthly equivalent (rounded to nearest pound)
  const monthlyPrice = Math.round(price / 12);
  
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0
  }).format(monthlyPrice);
};

/**
 * Get a user-friendly text for the monthly price
 */
export const getMonthlyPriceText = (price: number) => {
  const monthlyPrice = Math.round(price / 12);
  return formatPrice(monthlyPrice);
};

/**
 * Calculate the total cost for multi-device plans
 */
export const calculateMultiDeviceCost = (
  deviceCount: number, 
  monthlyPrice: number, 
  setupFeePerDevice: number = 80
) => {
  const totalSetupFee = setupFeePerDevice * deviceCount;
  const totalMonthlyPrice = monthlyPrice * deviceCount;
  
  return {
    setupFee: totalSetupFee,
    monthlyPrice: totalMonthlyPrice,
    totalFirstPayment: totalSetupFee + totalMonthlyPrice,
  };
};
