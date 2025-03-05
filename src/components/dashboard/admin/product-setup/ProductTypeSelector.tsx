
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Server, HardDrive, KeyRound } from 'lucide-react';

interface ProductTypeSelectorProps {
  selectedType: string;
  onSelectType: (type: string) => void;
}

const ProductTypeSelector: React.FC<ProductTypeSelectorProps> = ({ 
  selectedType, 
  onSelectType 
}) => {
  const productTypes = [
    {
      id: 'security-suite',
      name: 'Security Suite',
      description: 'Software security products and solutions',
      icon: <ShieldCheck className="h-8 w-8 text-primary" />
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure',
      description: 'Network and server infrastructure products',
      icon: <Server className="h-8 w-8 text-primary" />
    },
    {
      id: 'hardware',
      name: 'Hardware',
      description: 'Physical security devices and tokens',
      icon: <KeyRound className="h-8 w-8 text-primary" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {productTypes.map(type => (
        <Card 
          key={type.id}
          className={`cursor-pointer transition-all ${selectedType === type.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
          onClick={() => onSelectType(type.id)}
        >
          <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
            <div className="p-3 bg-primary/10 rounded-full mb-2">
              {type.icon}
            </div>
            <h3 className="font-medium text-lg">{type.name}</h3>
            <p className="text-sm text-muted-foreground">{type.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductTypeSelector;
