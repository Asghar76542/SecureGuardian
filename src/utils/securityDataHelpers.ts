
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

/**
 * Gets a user-friendly text representation of the last security scan time
 * @param lastScanTime ISO timestamp of the last scan
 * @param timeSinceScan PostgreSQL interval string 
 * @returns User-friendly last scan text
 */
export const getLastScanText = (lastScanTime: string | null, timeSinceScan: string | null): string => {
  if (!lastScanTime) return "Never";
  
  // If we have the formatted interval from Postgres
  if (timeSinceScan) {
    return formatTimeInterval(timeSinceScan);
  }
  
  // Fallback to formatting the timestamp
  try {
    const scanDate = new Date(lastScanTime);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      month: 'short',
      day: 'numeric'
    }).format(scanDate);
  } catch (e) {
    return "Unknown";
  }
};

/**
 * Determines the threat level color based on critical and high threat counts
 * @param criticalCount Number of critical threats
 * @param highCount Number of high priority threats
 * @returns CSS color class
 */
export const getThreatLevelColor = (criticalCount: number, highCount: number): string => {
  if (criticalCount > 0) return "text-red-500";
  if (highCount > 0) return "text-amber-500";
  return "text-green-500";
};

/**
 * Formats the threat counts into a user-friendly summary
 * @param criticalCount Number of critical threats
 * @param highCount Number of high priority threats
 * @param mediumCount Number of medium priority threats
 * @param lowCount Number of low priority threats
 * @returns Formatted threat summary
 */
export const formatThreatSummary = (
  criticalCount: number, 
  highCount: number,
  mediumCount: number,
  lowCount: number
): string => {
  const total = criticalCount + highCount + mediumCount + lowCount;
  
  if (total === 0) return "No active threats";
  
  const parts = [];
  if (criticalCount > 0) parts.push(`${criticalCount} critical`);
  if (highCount > 0) parts.push(`${highCount} high`);
  if (mediumCount > 0) parts.push(`${mediumCount} medium`);
  if (lowCount > 0) parts.push(`${lowCount} low`);
  
  return parts.join(', ');
};
