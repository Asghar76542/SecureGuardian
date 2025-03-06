
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

/**
 * Calculate the total cost for multi-device plans with tiered pricing
 * 
 * First device: £70 setup fee, £240/year
 * Additional devices: £40 setup fee each, £10/year each
 */
export const calculateMultiDeviceCost = (
  deviceCount: number, 
  basePrice: number
) => {
  // First device cost
  const firstDeviceSetupFee = 70;
  const firstDeviceYearlyPrice = 240;
  
  // Additional device costs
  const additionalSetupFee = 40;
  const additionalYearlyPrice = 10;
  
  let totalSetupFee = firstDeviceSetupFee;
  let totalYearlyPrice = firstDeviceYearlyPrice;
  
  // Calculate additional devices cost if any
  if (deviceCount > 1) {
    const additionalDevices = deviceCount - 1;
    totalSetupFee += additionalSetupFee * additionalDevices;
    totalYearlyPrice += additionalYearlyPrice * additionalDevices;
  }
  
  return {
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
