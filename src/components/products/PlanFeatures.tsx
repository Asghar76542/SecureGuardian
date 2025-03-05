
import { Check, Key, Usb, Shield, Globe } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface PlanFeaturesProps {
  features: string[];
  productType?: string;
}

const PlanFeatures = ({ features, productType }: PlanFeaturesProps) => {
  // Choose appropriate icon based on feature text
  const getFeatureIcon = (feature: string) => {
    const lowerFeature = feature.toLowerCase();
    
    if (lowerFeature.includes('yubikey') || lowerFeature.includes('key') || lowerFeature.includes('authentication')) {
      return <Key className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('usb') || lowerFeature.includes('connector') || lowerFeature.includes('nfc')) {
      return <Usb className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('security') || lowerFeature.includes('protection') || lowerFeature.includes('phishing')) {
      return <Shield className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('service') || lowerFeature.includes('compatibility') || lowerFeature.includes('enterprise')) {
      return <Globe className="h-3 w-3 text-primary" />;
    } else {
      return <Check className="h-3 w-3 text-primary" />;
    }
  };

  // Use a different background color for hardware product features
  const isHardware = productType === 'hardware';
  
  return (
    <div className="space-y-3 mt-4">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-medium">Plan Features</h3>
        <Separator className="flex-grow" />
      </div>
      
      {features.map((feature, index) => (
        <div key={index} className="flex items-start gap-2">
          <div className={`h-5 w-5 rounded-full ${isHardware ? 'bg-amber-100' : 'bg-primary/10'} flex items-center justify-center mt-0.5 flex-shrink-0`}>
            {getFeatureIcon(feature)}
          </div>
          <span className="text-sm">{feature}</span>
        </div>
      ))}
    </div>
  );
};

export default PlanFeatures;
