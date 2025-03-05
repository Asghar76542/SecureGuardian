
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Database, ArrowRight } from 'lucide-react';

interface ProductFeature {
  name: string;
  description: string;
}

interface ProductProps {
  product: {
    id: string;
    name: string;
    description: string;
    type: string;
    features: ProductFeature[];
  };
}

const ProductCard = ({ product }: ProductProps) => {
  const navigate = useNavigate();
  
  const getIcon = () => {
    switch (product.type) {
      case 'security':
        return <Shield className="h-6 w-6 text-primary" />;
      case 'infrastructure':
        return <Database className="h-6 w-6 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:border-primary/50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2">
          {getIcon()}
          <CardTitle>{product.name}</CardTitle>
        </div>
        <CardDescription className="text-sm">{product.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <h4 className="font-medium text-sm mb-2">Key Features</h4>
        <ul className="space-y-2">
          {product.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                <span className="text-primary text-xs">✓</span>
              </div>
              <div>
                <span className="font-medium">{feature.name}</span>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button 
          variant="outline"
          className="w-full"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          View Plans
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
