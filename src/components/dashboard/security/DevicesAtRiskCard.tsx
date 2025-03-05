
import React from 'react';
import { Laptop } from 'lucide-react';
import SecurityStatCard from './SecurityStatCard';

interface DevicesAtRiskCardProps {
  devicesAtRisk: number;
  totalDevices: number;
}

const DevicesAtRiskCard = ({ devicesAtRisk, totalDevices }: DevicesAtRiskCardProps) => {
  return (
    <SecurityStatCard
      title="Devices at Risk"
      value={devicesAtRisk}
      icon={<Laptop className="h-5 w-5 text-red-500" />}
      subtitle={`of ${totalDevices}`}
      colorClass="text-red-500"
    />
  );
};

export default DevicesAtRiskCard;
