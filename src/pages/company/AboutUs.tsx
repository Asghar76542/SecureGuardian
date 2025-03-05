
import FooterPageLayout from '@/components/FooterPageLayout';
import { Shield, Globe, Star } from 'lucide-react';

const AboutUs = () => {
  return (
    <FooterPageLayout 
      title="About Us" 
      description="Securing sensitive information for those who protect the world's secrets"
      category="Company"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Shield className="h-6 w-6 mr-2 text-primary" />
            Our Mission
          </h2>
          <p>
            At SecureGuardian, our mission is to provide uncompromising security solutions for 
            individuals and organizations that handle the world's most sensitive information. 
            We believe that secure communication should be accessible and user-friendly without 
            sacrificing protection against sophisticated threats.
          </p>
          <p className="mt-4">
            Founded by cybersecurity veterans with backgrounds in defense and intelligence, 
            SecureGuardian was built to address the growing threat landscape targeting high-value 
            individuals and organizations. We combine cutting-edge technology with proven security 
            methodologies to create comprehensive protection systems.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Star className="h-6 w-6 mr-2 text-primary" />
            Our Values
          </h2>
          <ul className="list-disc pl-6 mt-4 space-y-4">
            <li>
              <strong>Security Above All:</strong> We never compromise on security principles 
              or take shortcuts that could put our users at risk.
            </li>
            <li>
              <strong>Privacy by Design:</strong> We build privacy protections into every aspect 
              of our products and services from the ground up.
            </li>
            <li>
              <strong>Transparency:</strong> We are open about our security practices and technologies, 
              allowing independent verification of our claims.
            </li>
            <li>
              <strong>Continuous Innovation:</strong> We constantly adapt our solutions to address 
              emerging threats and technological changes.
            </li>
            <li>
              <strong>User Empowerment:</strong> We create tools that give users control over their 
              security without requiring deep technical expertise.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Globe className="h-6 w-6 mr-2 text-primary" />
            Global Presence
          </h2>
          <p>
            SecureGuardian serves clients in over 35 countries, with security specialists deployed 
            across major regions. Our global threat monitoring centers operate 24/7 to provide 
            continuous protection and support for our users worldwide.
          </p>
          <p className="mt-4">
            We maintain strategic partnerships with leading security organizations and researchers 
            to ensure our solutions incorporate the latest advancements in cybersecurity. Our 
            distributed team structure allows us to respond quickly to regional threats and provide 
            localized support when needed.
          </p>
        </section>
        
        <div className="bg-card/50 border border-border rounded-lg p-6 mt-8">
          <h3 className="text-xl font-semibold mb-2">Join Our Mission</h3>
          <p className="mb-4">
            We're always looking for talented individuals who share our passion for security 
            and privacy. Explore career opportunities with SecureGuardian and help us build 
            a more secure digital future.
          </p>
          <a href="/company/careers" className="text-primary hover:underline">View Open Positions →</a>
        </div>
      </div>
    </FooterPageLayout>
  );
};

export default AboutUs;
