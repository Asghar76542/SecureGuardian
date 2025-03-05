
import FooterPageLayout from '@/components/FooterPageLayout';
import { FileText, MessageSquare, Award } from 'lucide-react';

const PressMedia = () => {
  return (
    <FooterPageLayout 
      title="Press & Media" 
      description="Latest news, press releases and media resources about SecureGuardian"
      category="Company"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FileText className="h-6 w-6 mr-2 text-primary" />
            Press Releases
          </h2>
          <div className="space-y-6">
            <div className="border-b border-border pb-6">
              <span className="text-xs text-muted-foreground">June 12, 2023</span>
              <h3 className="text-xl font-medium mt-2 mb-2">SecureGuardian Launches Next-Generation Secure Mobile Platform</h3>
              <p className="mb-4">
                SecureGuardian today announced the release of its next-generation secure mobile 
                platform designed for government agencies, legal professionals, and journalists 
                handling sensitive information.
              </p>
              <a href="#" className="text-primary hover:underline">Read Full Release →</a>
            </div>
            
            <div className="border-b border-border pb-6">
              <span className="text-xs text-muted-foreground">April 3, 2023</span>
              <h3 className="text-xl font-medium mt-2 mb-2">SecureGuardian Partners with European Commission on Secure Communication Initiative</h3>
              <p className="mb-4">
                SecureGuardian has been selected as a key technology provider for the European 
                Commission's new secure communication initiative for diplomatic communications.
              </p>
              <a href="#" className="text-primary hover:underline">Read Full Release →</a>
            </div>
            
            <div className="border-b border-border pb-6">
              <span className="text-xs text-muted-foreground">January 17, 2023</span>
              <h3 className="text-xl font-medium mt-2 mb-2">SecureGuardian Achieves FIPS 140-2 Certification for Encryption Modules</h3>
              <p className="mb-4">
                SecureGuardian's core encryption modules have received FIPS 140-2 certification, 
                validating their security for use in government and regulated industries.
              </p>
              <a href="#" className="text-primary hover:underline">Read Full Release →</a>
            </div>
          </div>
          <div className="mt-6">
            <a href="#" className="text-primary hover:underline">View All Press Releases →</a>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Award className="h-6 w-6 mr-2 text-primary" />
            Awards & Recognition
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div className="bg-card/30 border border-border rounded-lg p-5">
              <h3 className="text-lg font-medium mb-2">Cybersecurity Excellence Awards</h3>
              <p className="text-sm text-muted-foreground mb-2">2023 Winner - Mobile Security Solution</p>
              <p className="text-sm">
                Recognized for innovation in secure mobile communications and advanced 
                threat protection for high-risk environments.
              </p>
            </div>
            
            <div className="bg-card/30 border border-border rounded-lg p-5">
              <h3 className="text-lg font-medium mb-2">Global InfoSec Awards</h3>
              <p className="text-sm text-muted-foreground mb-2">2022 Editor's Choice - Encryption</p>
              <p className="text-sm">
                Awarded for breakthrough advancements in end-to-end encryption technology 
                for mobile communications.
              </p>
            </div>
            
            <div className="bg-card/30 border border-border rounded-lg p-5">
              <h3 className="text-lg font-medium mb-2">SC Media Awards</h3>
              <p className="text-sm text-muted-foreground mb-2">2022 Finalist - Best Security Solution</p>
              <p className="text-sm">
                Recognized among the top security solutions for government and enterprise 
                organizations.
              </p>
            </div>
            
            <div className="bg-card/30 border border-border rounded-lg p-5">
              <h3 className="text-lg font-medium mb-2">Fortress Cyber Security Awards</h3>
              <p className="text-sm text-muted-foreground mb-2">2021 Winner - Threat Detection</p>
              <p className="text-sm">
                Honored for excellence in mobile threat detection and prevention technologies.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <MessageSquare className="h-6 w-6 mr-2 text-primary" />
            Media Inquiries
          </h2>
          <p>
            For press inquiries, interview requests, or additional information about SecureGuardian, 
            please contact our media relations team:
          </p>
          <div className="bg-card/30 border border-border rounded-lg p-5 mt-4">
            <p className="mb-1"><strong>Media Contact:</strong> Sarah Chen, Director of Communications</p>
            <p className="mb-1"><strong>Email:</strong> press@secureguardian.com</p>
            <p><strong>Phone:</strong> +1 (202) 555-0187</p>
          </div>
          <p className="mt-4">
            Our team is available to provide expert commentary on mobile security, encryption, 
            threat intelligence, and secure communications for government and enterprise organizations.
          </p>
        </section>
        
        <div className="bg-card/50 border border-border rounded-lg p-6 mt-8">
          <h3 className="text-xl font-semibold mb-2">Media Resources</h3>
          <p className="mb-4">
            Download SecureGuardian logos, product images, executive headshots, and fact sheets 
            for media use. All resources are available in high-resolution formats.
          </p>
          <a href="#" className="text-primary hover:underline">Access Media Kit →</a>
        </div>
      </div>
    </FooterPageLayout>
  );
};

export default PressMedia;
