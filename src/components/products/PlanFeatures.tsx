
import { Check } from 'lucide-react';

interface PlanFeaturesProps {
  features: string[];
}

const PlanFeatures = ({ features }: PlanFeaturesProps) => {
  return (
    <div className="space-y-3">
      {features.map((feature, index) => (
        <div key={index} className="flex items-start gap-2">
          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
            <Check className="h-3 w-3 text-primary" />
          </div>
          <span className="text-sm">{feature}</span>
        </div>
      ))}
    </div>
  );
};

export default PlanFeatures;
