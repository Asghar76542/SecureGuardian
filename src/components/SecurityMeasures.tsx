
import { Fingerprint, Key, Database, Cloud } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const securityMeasures = [
  {
    icon: <Key className="h-6 w-6" />,
    title: "End-to-End Encryption",
    description: "All communications are protected with AES-256, RSA-4096, and ChaCha20-Poly1305 encryption technologies.",
    badges: ["AES-256", "RSA-4096", "ChaCha20-Poly1305"]
  },
  {
    icon: <Fingerprint className="h-6 w-6" />,
    title: "Biometric Authentication",
    description: "Multi-factor authentication including fingerprint, facial recognition, and YubiKey hardware security.",
    badges: ["Fingerprint", "Facial Recognition", "YubiKey"]
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "Secure Data Storage",
    description: "Zero-knowledge architecture ensures even we cannot access your encrypted data without proper authorization.",
    badges: ["Zero-Knowledge", "Encrypted Storage", "No Backdoors"]
  },
  {
    icon: <Cloud className="h-6 w-6" />,
    title: "Secure Cloud Infrastructure",
    description: "TEMPEST-certified infrastructure with Faraday protection against electromagnetic surveillance.",
    badges: ["TEMPEST-certified", "Faraday Protection", "Air-gapped Options"]
  }
];

const SecurityMeasures = () => {
  return (
    <section id="security" className="relative">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-secondary/10 to-background z-0" />
      
      <div className="section-container relative z-10">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/50 border border-border text-sm text-foreground/80 mx-auto mb-6">
          <span>Security Measures</span>
        </div>
        
        <h2 className="section-title">
          Advanced <span className="highlight-text">Security</span> Technology
        </h2>
        
        <p className="section-description">
          Our platform incorporates military-grade encryption and security protocols to provide the highest level of protection for sensitive information.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {securityMeasures.map((measure, index) => (
            <div 
              key={index} 
              className="feature-card opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${(index * 200)}ms`, animationFillMode: 'forwards' }}
            >
              <div className="flex items-start">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <div className="text-primary">{measure.icon}</div>
                </div>
                
                <div>
                  <h3 className="text-xl font-display font-semibold mb-2">{measure.title}</h3>
                  <p className="text-muted-foreground mb-4">{measure.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {measure.badges.map((badge, badgeIndex) => (
                      <Badge key={badgeIndex} variant="secondary" className="bg-secondary/50 text-foreground/90 backdrop-blur-sm">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityMeasures;
