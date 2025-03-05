
import FooterPageLayout from '@/components/FooterPageLayout';
import { Shield, Alarm, Trash2 } from 'lucide-react';

const EmergencyProtocols = () => {
  return (
    <FooterPageLayout 
      title="Emergency Protocols" 
      description="Immediate response mechanisms for critical security situations"
      category="Solutions"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Shield className="h-6 w-6 mr-2 text-primary" />
            Rapid Response System
          </h2>
          <p>
            SecureGuardian's emergency protocols provide immediate protection when security is 
            compromised. Our system allows for instant activation of security measures through 
            multiple channels, ensuring that data remains protected even in the most critical situations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Alarm className="h-6 w-6 mr-2 text-primary" />
            Emergency Access Controls
          </h2>
          <p>
            Our comprehensive emergency protocols include:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Duress codes that appear to unlock the device while actually triggering silent alarms</li>
            <li>Geo-fencing alerts when devices leave authorized areas</li>
            <li>Timed check-in requirements with automatic lockdown if missed</li>
            <li>Remote device isolation from networks and services</li>
            <li>Emergency-only communication channels</li>
            <li>Secure panic button with silent alert capabilities</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Trash2 className="h-6 w-6 mr-2 text-primary" />
            Data Destruction Protocols
          </h2>
          <p>
            In critical situations, our secure data destruction protocols can be activated to prevent 
            unauthorized access to sensitive information:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Remote wipe capability with verification</li>
            <li>Cryptographic key destruction rendering encrypted data unrecoverable</li>
            <li>Selective data wiping based on sensitivity levels</li>
            <li>Sequential wipe procedures for comprehensive data elimination</li>
            <li>Physical tamper detection triggering automatic data protection</li>
          </ul>
          <p className="mt-4">
            All emergency protocols are customizable to meet specific organizational requirements 
            and compliance standards. Protocols can be activated via secure dashboard, emergency 
            codes, physical triggers, or automated security rule violations.
          </p>
        </section>
        
        <div className="bg-card/50 border border-border rounded-lg p-6 mt-8">
          <h3 className="text-xl font-semibold mb-2">Prepare for high-risk scenarios</h3>
          <p className="mb-4">
            Contact our security team to develop customized emergency protocols tailored to your
            organization's needs and threat profile.
          </p>
          <a href="#" className="text-primary hover:underline">Request a consultation →</a>
        </div>
      </div>
    </FooterPageLayout>
  );
};

export default EmergencyProtocols;
