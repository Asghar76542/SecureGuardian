
import { Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface PlanFeaturesProps {
  features: string[];
}

const PlanFeatures = ({ features }: PlanFeaturesProps) => {
  return (
    <div className="space-y-3 mt-4">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-medium">Plan Features</h3>
        <Separator className="flex-grow" />
      </div>
      
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
