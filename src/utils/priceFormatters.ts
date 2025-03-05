
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
  
  if (billingCycle === 'per-device' || billingCycle.includes('device')) {
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
  
  // If it's a device plan, this is already the monthly price
  if (billingCycle && (billingCycle === 'per-device' || billingCycle.includes('device'))) {
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

/**
 * Check if a plan is a device-based plan
 */
export const isDevicePlan = (billingCycle?: string): boolean => {
  if (!billingCycle) return false;
  
  // Check for exact match or contains 'device' or if it's a security plan (temporary fix)
  return billingCycle === 'per-device' 
    || billingCycle.includes('device')
    || billingCycle === 'security-device';
};

