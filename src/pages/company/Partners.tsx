
import FooterPageLayout from '@/components/FooterPageLayout';
import { Handshake, Globe, Award } from 'lucide-react';

const Partners = () => {
  return (
    <FooterPageLayout 
      title="Partners" 
      description="Strategic alliances to deliver comprehensive security solutions"
      category="Company"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Handshake className="h-6 w-6 mr-2 text-primary" />
            Partnership Program
          </h2>
          <p>
            SecureGuardian's partner program brings together leading organizations in cybersecurity, 
            technology, and specialized services to deliver comprehensive security solutions for 
            our clients. We collaborate with partners who share our commitment to uncompromising 
            security and privacy protection.
          </p>
          <p className="mt-4">
            Our partnerships extend our capabilities across technology integration, implementation 
            services, threat intelligence sharing, and specialized industry solutions. Together 
            with our partners, we create security ecosystems that address the complex needs of 
            government agencies, legal firms, and organizations handling sensitive information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Award className="h-6 w-6 mr-2 text-primary" />
            Partner Categories
          </h2>
          <div className="space-y-6 mt-6">
            <div className="border border-border rounded-lg p-5">
              <h3 className="text-xl font-medium mb-2">Technology Partners</h3>
              <p>
                We work with leading technology providers to integrate best-in-class security 
                components into our solutions. These partnerships include hardware manufacturers, 
                cryptography specialists, and secure communication protocol developers.
              </p>
            </div>
            
            <div className="border border-border rounded-lg p-5">
              <h3 className="text-xl font-medium mb-2">Implementation Partners</h3>
              <p>
                Our global network of certified implementation partners helps organizations deploy 
                and maintain SecureGuardian solutions. These partners provide local support, 
                training, and customization services for our clients worldwide.
              </p>
            </div>
            
            <div className="border border-border rounded-lg p-5">
              <h3 className="text-xl font-medium mb-2">Threat Intelligence Partners</h3>
              <p>
                We collaborate with specialized threat intelligence providers to enhance our 
                threat detection capabilities and provide early warning of emerging threats 
                to our clients.
              </p>
            </div>
            
            <div className="border border-border rounded-lg p-5">
              <h3 className="text-xl font-medium mb-2">Industry Solution Partners</h3>
              <p>
                We partner with industry-specific solution providers to address the unique 
                security challenges in government, legal, healthcare, and financial sectors.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Globe className="h-6 w-6 mr-2 text-primary" />
            Featured Partners
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div className="bg-card/30 border border-border rounded-lg p-6 flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-foreground/10 rounded-full mb-4"></div>
              <h3 className="text-lg font-medium">Quantum Shield Technologies</h3>
              <p className="text-sm text-muted-foreground my-2">Hardware Security Partner</p>
              <p className="text-sm mt-2">
                Providing advanced hardware security modules and tamper-resistant components 
                for our secure device platform.
              </p>
            </div>
            
            <div className="bg-card/30 border border-border rounded-lg p-6 flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-foreground/10 rounded-full mb-4"></div>
              <h3 className="text-lg font-medium">CipherTrust Solutions</h3>
              <p className="text-sm text-muted-foreground my-2">Encryption Technology Partner</p>
              <p className="text-sm mt-2">
                Delivering advanced encryption algorithms and key management systems for our 
                secure communication platform.
              </p>
            </div>
            
            <div className="bg-card/30 border border-border rounded-lg p-6 flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-foreground/10 rounded-full mb-4"></div>
              <h3 className="text-lg font-medium">Global Security Partners</h3>
              <p className="text-sm text-muted-foreground my-2">Implementation Partner</p>
              <p className="text-sm mt-2">
                Providing deployment and ongoing support services for SecureGuardian 
                solutions across Europe and the Middle East.
              </p>
            </div>
            
            <div className="bg-card/30 border border-border rounded-lg p-6 flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-foreground/10 rounded-full mb-4"></div>
              <h3 className="text-lg font-medium">ThreatWatch Intelligence</h3>
              <p className="text-sm text-muted-foreground my-2">Threat Intelligence Partner</p>
              <p className="text-sm mt-2">
                Collaborating on advanced threat detection and monitoring systems for 
                mobile security threats.
              </p>
            </div>
          </div>
        </section>
        
        <div className="bg-card/50 border border-border rounded-lg p-6 mt-8">
          <h3 className="text-xl font-semibold mb-2">Become a Partner</h3>
          <p className="mb-4">
            Interested in becoming a SecureGuardian partner? We're always looking to expand 
            our partner ecosystem with organizations that share our commitment to security 
            excellence.
          </p>
          <a href="#" className="text-primary hover:underline">Apply to Partner Program →</a>
        </div>
      </div>
    </FooterPageLayout>
  );
};

export default Partners;
