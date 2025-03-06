
/**
 * Utility functions for formatting prices and billing cycles
 */

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(price);
};

export const formatBillingCycle = (billingCycle?: string) => {
  if (!billingCycle) return '';
  
  if (billingCycle === 'per-device' || billingCycle.includes('device')) {
    return 'per device/year';
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
  
  // If it's a device plan, this is already the yearly price, no need to calculate monthly equivalent
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

// Tier price multipliers
export type PriceTier = 'standard' | 'pro' | 'enterprise';

const TIER_MULTIPLIERS = {
  standard: 1.0,
  pro: 1.3,      // 30% increase from standard
  enterprise: 1.69  // 30% increase from pro (1.3 * 1.3 = 1.69)
};

/**
 * Calculate the total cost for multi-device plans with tiered pricing
 */
export const calculateMultiDeviceCost = (
  deviceCount: number, 
  basePrice: number,
  tier: PriceTier = 'standard'
) => {
  // Base prices for standard tier
  const baseFirstDeviceSetupFee = 69;
  const baseFirstDeviceYearlyPrice = 199;
  const baseAdditionalSetupFee = 49;
  const baseAdditionalYearlyPrice = 99;
  
  // Apply tier multiplier
  const multiplier = TIER_MULTIPLIERS[tier];
  const firstDeviceSetupFee = Math.round((baseFirstDeviceSetupFee * multiplier) * 100) / 100;
  const firstDeviceYearlyPrice = Math.round((baseFirstDeviceYearlyPrice * multiplier) * 100) / 100;
  const additionalSetupFee = Math.round((baseAdditionalSetupFee * multiplier) * 100) / 100;
  const additionalYearlyPrice = Math.round((baseAdditionalYearlyPrice * multiplier) * 100) / 100;
  
  let totalSetupFee = firstDeviceSetupFee;
  let totalYearlyPrice = firstDeviceYearlyPrice;
  
  // Calculate additional devices cost if any
  if (deviceCount > 1) {
    const additionalDevices = deviceCount - 1;
    totalSetupFee += additionalSetupFee * additionalDevices;
    totalYearlyPrice += additionalYearlyPrice * additionalDevices;
  }
  
  return {
    tier,
    firstDeviceSetupFee,
    firstDeviceYearlyPrice,
    additionalSetupFee,
    additionalYearlyPrice,
    setupFee: totalSetupFee,
    yearlyPrice: totalYearlyPrice,
    totalFirstPayment: totalSetupFee + totalYearlyPrice,
  };
};

/**
 * Calculate the total cost for hardware products (per unit)
 */
export const calculateHardwareCost = (
  unitCount: number,
  unitPrice: number
) => {
  const totalPrice = unitPrice * unitCount;
  
  return {
    unitPrice,
    totalPrice,
  };
};

/**
 * Check if a plan is a device-based plan
 */
export const isDevicePlan = (billingCycle?: string): boolean => {
  if (!billingCycle) return false;
  
  // Consider infrastructure plans as device plans too
  return billingCycle === 'per-device' 
    || billingCycle.includes('device')
    || billingCycle === 'security-device'
    || billingCycle.includes('infrastructure');
};

/**
 * Check if a product is a hardware/unit-based product
 */
export const isHardwareProduct = (billingCycle?: string): boolean => {
  if (!billingCycle) return false;
  
  return billingCycle.includes('unit');
};

/**
 * Get the tier name for display
 */
export const getTierDisplayName = (tier: PriceTier): string => {
  switch (tier) {
    case 'standard': return 'Standard';
    case 'pro': return 'Professional';
    case 'enterprise': return 'Enterprise';
    default: return 'Standard';
  }
};
