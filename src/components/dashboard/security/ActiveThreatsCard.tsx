
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import SecurityStatCard from './SecurityStatCard';

interface ActiveThreatsCardProps {
  threatCount: number;
  criticalCount?: number;
  highCount?: number;
}

const ActiveThreatsCard = ({ threatCount, criticalCount = 0, highCount = 0 }: ActiveThreatsCardProps) => {
  // Determine subtitle based on critical and high priority threats
  const getSubtitle = () => {
    if (criticalCount > 0 && highCount > 0) {
      return `${criticalCount} critical, ${highCount} high`;
    } else if (criticalCount > 0) {
      return `${criticalCount} critical`;
    } else if (highCount > 0) {
      return `${highCount} high priority`;
    }
    return "detected";
  };

  // Determine color based on threat severity
  const getColor = () => {
    if (criticalCount > 0) return "text-red-500";
    if (highCount > 0) return "text-amber-500";
    return "text-amber-400";
  };

  return (
    <SecurityStatCard
      title="Active Threats"
      value={threatCount}
      icon={<AlertTriangle className={`h-5 w-5 ${criticalCount > 0 ? 'text-red-500' : 'text-amber-500'}`} />}
      subtitle={getSubtitle()}
      colorClass={getColor()}
    />
  );
};

export default ActiveThreatsCard;
