
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import SecurityStatCard from './SecurityStatCard';

interface ActiveThreatsCardProps {
  threatCount: number;
}

const ActiveThreatsCard = ({ threatCount }: ActiveThreatsCardProps) => {
  return (
    <SecurityStatCard
      title="Active Threats"
      value={threatCount}
      icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
      subtitle="detected"
      colorClass="text-amber-500"
    />
  );
};

export default ActiveThreatsCard;
