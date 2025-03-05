
import FooterPageLayout from '@/components/FooterPageLayout';
import { Shield, Smartphone, Server } from 'lucide-react';

const SecureDevices = () => {
  return (
    <FooterPageLayout 
      title="Secure Devices" 
      description="Military-grade encryption and hardware security for your mobile devices"
      category="Solutions"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Shield className="h-6 w-6 mr-2 text-primary" />
            Enterprise-Grade Device Security
          </h2>
          <p>
            SecureGuardian provides custom-hardened mobile devices built on specialized secure operating 
            systems that eliminate common attack vectors. Our devices are designed from the ground up 
            with security as the primary focus, not as an afterthought.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Smartphone className="h-6 w-6 mr-2 text-primary" />
            Tamper-Resistant Hardware
          </h2>
          <p>
            Our devices include specialized hardware security modules that detect and respond to physical 
            tampering attempts. Any unauthorized attempt to access the internal components of the device 
            triggers immediate data protection protocols.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Encrypted storage with hardware-backed key management</li>
            <li>Secure boot process that verifies system integrity</li>
            <li>Biometric authentication with liveness detection</li>
            <li>Physical tamper-evident seals and sensors</li>
            <li>Remote wipe capability for compromised devices</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Server className="h-6 w-6 mr-2 text-primary" />
            Secure Supply Chain
          </h2>
          <p>
            We maintain complete control over our supply chain to eliminate the risk of hardware 
            backdoors or compromised components. Each device is assembled in secure facilities 
            and undergoes rigorous security testing before deployment.
          </p>
        </section>
        
        <div className="bg-card/50 border border-border rounded-lg p-6 mt-8">
          <h3 className="text-xl font-semibold mb-2">Ready to secure your organization?</h3>
          <p className="mb-4">
            Contact our security specialists for a personalized consultation on implementing
            secure device solutions for your organization.
          </p>
          <a href="#" className="text-primary hover:underline">Request a consultation →</a>
        </div>
      </div>
    </FooterPageLayout>
  );
};

export default SecureDevices;
