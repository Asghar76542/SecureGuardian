
import FooterPageLayout from '@/components/FooterPageLayout';
import { Briefcase, Users, Heart } from 'lucide-react';

const Careers = () => {
  return (
    <FooterPageLayout 
      title="Careers" 
      description="Join our team of security experts protecting sensitive information worldwide"
      category="Company"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Users className="h-6 w-6 mr-2 text-primary" />
            Working at SecureGuardian
          </h2>
          <p>
            At SecureGuardian, we're building the future of secure communications and data protection 
            for the world's most sensitive information. Our team brings together experts from 
            cybersecurity, cryptography, software development, and threat intelligence to create 
            solutions that protect against the most sophisticated threats.
          </p>
          <p className="mt-4">
            We offer a challenging and rewarding environment where your work has direct impact on 
            the security of organizations and individuals around the world. Our team culture values 
            innovation, collaboration, and continuous learning in the rapidly evolving security landscape.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Heart className="h-6 w-6 mr-2 text-primary" />
            Benefits & Culture
          </h2>
          <p>
            We believe in taking care of our team members and fostering an environment where 
            everyone can do their best work:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Competitive compensation with equity options</li>
            <li>Comprehensive health, dental, and vision benefits</li>
            <li>Flexible remote work options with global team members</li>
            <li>Continuous education and professional development budget</li>
            <li>Regular security conferences and training opportunities</li>
            <li>State-of-the-art equipment and secure working environment</li>
            <li>Team retreats for collaboration and community building</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Briefcase className="h-6 w-6 mr-2 text-primary" />
            Open Positions
          </h2>
          <div className="space-y-6">
            <div className="border border-border rounded-lg p-5">
              <h3 className="text-xl font-medium mb-2">Senior Security Engineer</h3>
              <p className="text-muted-foreground mb-4">Remote (Americas or Europe) · Full Time</p>
              <p className="mb-4">
                Design and implement secure systems for our mobile security platform, focusing on 
                encryption, access controls, and secure communication protocols.
              </p>
              <a href="#" className="text-primary hover:underline">View Job Description →</a>
            </div>
            
            <div className="border border-border rounded-lg p-5">
              <h3 className="text-xl font-medium mb-2">Threat Intelligence Analyst</h3>
              <p className="text-muted-foreground mb-4">Washington DC, USA · Full Time</p>
              <p className="mb-4">
                Monitor and analyze emerging threats to mobile security, develop threat profiles, 
                and create actionable intelligence reports for our security teams.
              </p>
              <a href="#" className="text-primary hover:underline">View Job Description →</a>
            </div>
            
            <div className="border border-border rounded-lg p-5">
              <h3 className="text-xl font-medium mb-2">Mobile Application Developer</h3>
              <p className="text-muted-foreground mb-4">Remote (Global) · Full Time</p>
              <p className="mb-4">
                Develop secure mobile applications for iOS and Android with a focus on encryption, 
                secure messaging, and threat prevention features.
              </p>
              <a href="#" className="text-primary hover:underline">View Job Description →</a>
            </div>
          </div>
        </section>
        
        <div className="bg-card/50 border border-border rounded-lg p-6 mt-8">
          <h3 className="text-xl font-semibold mb-2">Don't see the right position?</h3>
          <p className="mb-4">
            We're always looking for exceptional talent to join our team. Send us your resume 
            and tell us how you can contribute to our mission of securing the world's most 
            sensitive information.
          </p>
          <a href="#" className="text-primary hover:underline">Send an Open Application →</a>
        </div>
      </div>
    </FooterPageLayout>
  );
};

export default Careers;
