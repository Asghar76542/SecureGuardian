
/**
 * Utility functions for handling security data formatting and transformations
 */

/**
 * Safely converts a value to a number, handling null, undefined, and strings
 * @param value Value to convert
 * @param defaultValue Default value if conversion fails
 * @returns Converted number or default value
 */
export const safeNumberConversion = (value: any, defaultValue: number = 0): number => {
  if (value === null || value === undefined) return defaultValue;
  
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
};

/**
 * Formats a security score with appropriate color class
 * @param score Security score (0-100)
 * @returns Object with text color class and status description
 */
export const getSecurityScoreStatus = (score: number) => {
  if (score >= 80) return { color: "text-green-500", status: "Strong" };
  if (score >= 60) return { color: "text-yellow-500", status: "Moderate" };
  return { color: "text-red-500", status: "Weak" };
};

/**
 * Formats a time interval from Postgres into a user-friendly string
 * @param interval Postgres interval as string
 * @returns Formatted time string
 */
export const formatTimeInterval = (interval: string | null): string => {
  if (!interval) return "Unknown";
  
  if (interval.includes('days')) {
    const days = parseInt(interval);
    return days > 1 ? `${days} days ago` : "Yesterday";
  } else if (interval.includes('hours')) {
    const hours = parseInt(interval);
    return `${hours} hours ago`;
  } else if (interval.includes('minutes')) {
    const minutes = parseInt(interval);
    return minutes <= 1 ? "Just now" : `${minutes} minutes ago`;
  } else if (interval.includes('seconds')) {
    return "Just now";
  }
  
  return "Recently";
};
