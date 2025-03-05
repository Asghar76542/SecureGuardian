
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface PlanCardHeaderProps {
  name: string;
  description: string;
  isPopular: boolean;
}

const PlanCardHeader = ({ name, description, isPopular }: PlanCardHeaderProps) => {
  return (
    <>
      {isPopular && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
          Most Popular
        </div>
      )}
      
      <CardHeader className={`pb-2 ${isPopular ? 'pt-4' : ''}`}>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </>
  );
};

export default PlanCardHeader;
