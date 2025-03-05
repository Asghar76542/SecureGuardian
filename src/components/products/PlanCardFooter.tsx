
import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface PlanCardFooterProps {
  isPopular: boolean;
  onPurchaseClick: () => void;
}

const PlanCardFooter = ({ isPopular, onPurchaseClick }: PlanCardFooterProps) => {
  return (
    <CardFooter className="pt-6 mt-auto">
      <Button 
        className="w-full"
        variant={isPopular ? "default" : "outline"}
        onClick={onPurchaseClick}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Purchase
      </Button>
    </CardFooter>
  );
};

export default PlanCardFooter;
