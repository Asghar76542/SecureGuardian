
import { Check, Key, Usb, Shield, Globe, Lock, WifiOff, Smartphone, Laptop, Package, CreditCard } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface PlanFeaturesProps {
  features: string[];
  productType?: string;
}

const PlanFeatures = ({ features, productType }: PlanFeaturesProps) => {
  // Choose appropriate icon based on feature text
  const getFeatureIcon = (feature: string) => {
    const lowerFeature = feature.toLowerCase();
    
    // Faraday Bag related icons
    if (lowerFeature.includes('signal') || lowerFeature.includes('wifi') || lowerFeature.includes('bluetooth') || lowerFeature.includes('cellular')) {
      return <WifiOff className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('phone') || lowerFeature.includes('smartphone')) {
      return <Smartphone className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('laptop') || lowerFeature.includes('tablet')) {
      return <Laptop className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('key fob') || lowerFeature.includes('mini-pouch')) {
      return <Key className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('rfid') || lowerFeature.includes('wallet') || lowerFeature.includes('card')) {
      return <CreditCard className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('kit') || lowerFeature.includes('set')) {
      return <Package className="h-3 w-3 text-primary" />;
    }
    // YubiKey related icons
    else if (lowerFeature.includes('yubikey') || lowerFeature.includes('key') || lowerFeature.includes('authentication')) {
      return <Key className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('usb') || lowerFeature.includes('connector') || lowerFeature.includes('nfc')) {
      return <Usb className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('water') || lowerFeature.includes('resistant') || lowerFeature.includes('durable')) {
      return <Shield className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('security') || lowerFeature.includes('protection') || lowerFeature.includes('phishing')) {
      return <Shield className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('military') || lowerFeature.includes('secure') || lowerFeature.includes('shielding')) {
      return <Lock className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('service') || lowerFeature.includes('compatibility') || lowerFeature.includes('enterprise')) {
      return <Globe className="h-3 w-3 text-primary" />;
    } else {
      return <Check className="h-3 w-3 text-primary" />;
    }
  };

  // Use amber colors for Faraday Bag / hardware protection products
  const isFaradayProduct = productType === 'hardware' && (features.some(f => 
    f.toLowerCase().includes('faraday') || 
    f.toLowerCase().includes('signal') || 
    f.toLowerCase().includes('blocking') || 
    f.toLowerCase().includes('shield')
  ));
  
  // Determine the background color for feature icons based on product type
  const getBgColorClass = () => {
    if (isFaradayProduct) {
      return 'bg-amber-100'; // Amber background for Faraday products
    } else if (productType === 'hardware') {
      return 'bg-amber-50';  // Light amber for other hardware
    } else {
      return 'bg-primary/10'; // Default for software products
    }
  };
  
  return (
    <div className="space-y-3 mt-4">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-medium">Plan Features</h3>
        <Separator className="flex-grow" />
      </div>
      
      {features.map((feature, index) => (
        <div key={index} className="flex items-start gap-2">
          <div className={`h-5 w-5 rounded-full ${getBgColorClass()} flex items-center justify-center mt-0.5 flex-shrink-0`}>
            {getFeatureIcon(feature)}
          </div>
          <span className="text-sm">{feature}</span>
        </div>
      ))}
    </div>
  );
};

export default PlanFeatures;
