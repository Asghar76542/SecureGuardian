
import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import SecurityStatCard from './SecurityStatCard';

interface ComplianceStatusCardProps {
  securityScore: number;
}

const ComplianceStatusCard = ({ securityScore }: ComplianceStatusCardProps) => {
  const getComplianceStatus = () => {
    if (securityScore >= 80) {
      return { text: 'Compliant', color: 'text-green-500', icon: <CheckCircle className="h-5 w-5 text-green-500" /> };
    } else if (securityScore >= 60) {
      return { text: 'At Risk', color: 'text-yellow-500', icon: <XCircle className="h-5 w-5 text-yellow-500" /> };
    } else {
      return { text: 'Non-Compliant', color: 'text-red-500', icon: <XCircle className="h-5 w-5 text-red-500" /> };
    }
  };

  const compliance = getComplianceStatus();

  return (
    <SecurityStatCard
      title="Compliance Status"
      value={compliance.text}
      icon={compliance.icon}
      colorClass={compliance.color}
    />
  );
};

export default ComplianceStatusCard;
