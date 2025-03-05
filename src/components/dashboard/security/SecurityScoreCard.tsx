
import React from 'react';
import { Shield } from 'lucide-react';
import SecurityStatCard from './SecurityStatCard';
import { getSecurityScoreStatus } from '@/utils/securityDataHelpers';

interface SecurityScoreCardProps {
  score: number;
}

const SecurityScoreCard = ({ score }: SecurityScoreCardProps) => {
  const { color } = getSecurityScoreStatus(score);
  
  return (
    <SecurityStatCard
      title="Security Score"
      value={`${score}%`}
      icon={<Shield className="h-5 w-5 text-primary" />}
      colorClass={color}
      progressBar={{ value: score }}
    />
  );
};

export default SecurityScoreCard;
