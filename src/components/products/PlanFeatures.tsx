
import { Check, Key, Usb, Shield, Globe, Lock, WifiOff, Smartphone, Laptop, Package, CreditCard, Tag, Barcode, QrCode, List, MapPin, AlertTriangle, Search } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface PlanFeaturesProps {
  features: string[];
  productType?: string;
}

const PlanFeatures = ({ features, productType }: PlanFeaturesProps) => {
  // Choose appropriate icon based on feature text
  const getFeatureIcon = (feature: string) => {
    const lowerFeature = feature.toLowerCase();
    
    // Security Tag System related icons
    if (lowerFeature.includes('tag') || lowerFeature.includes('security tag')) {
      return <Tag className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('barcode') || lowerFeature.includes('scanning')) {
      return <Barcode className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('qr code') || lowerFeature.includes('qr')) {
      return <QrCode className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('tracking') || lowerFeature.includes('location')) {
      return <MapPin className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('inventory') || lowerFeature.includes('asset') || lowerFeature.includes('spreadsheet')) {
      return <List className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('tamper') || lowerFeature.includes('void')) {
      return <AlertTriangle className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('find') || lowerFeature.includes('visibility')) {
      return <Search className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('rfid')) {
      return <CreditCard className="h-3 w-3 text-primary" />;
    }
    // Faraday Bag related icons
    else if (lowerFeature.includes('signal') || lowerFeature.includes('wifi') || lowerFeature.includes('bluetooth') || lowerFeature.includes('cellular')) {
      return <WifiOff className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('phone') || lowerFeature.includes('smartphone')) {
      return <Smartphone className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('laptop') || lowerFeature.includes('tablet')) {
      return <Laptop className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('key fob') || lowerFeature.includes('mini-pouch')) {
      return <Key className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('wallet') || lowerFeature.includes('card')) {
      return <CreditCard className="h-3 w-3 text-primary" />;
    } else if (lowerFeature.includes('kit') || lowerFeature.includes('set') || lowerFeature.includes('pack')) {
      return <Package className="h-3 w-3 text-primary" />;
    }
    // YubiKey related icons
    else if (lowerFeature.includes('yubikey') || lowerFeature.includes('authentication')) {
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

  // Use amber colors for hardware protection products
  const isSecurityTagProduct = productType === 'hardware' && (features.some(f => 
    f.toLowerCase().includes('tag') || 
    f.toLowerCase().includes('barcode') || 
    f.toLowerCase().includes('qr code') || 
    f.toLowerCase().includes('tracking')
  ));
  
  const isFaradayProduct = productType === 'hardware' && (features.some(f => 
    f.toLowerCase().includes('faraday') || 
    f.toLowerCase().includes('signal') || 
    f.toLowerCase().includes('blocking') || 
    f.toLowerCase().includes('shield')
  ));
  
  // Determine the background color for feature icons based on product type
  const getBgColorClass = () => {
    if (isSecurityTagProduct) {
      return 'bg-neutral-100'; // Neutral gray background for security tags
    } else if (isFaradayProduct) {
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
