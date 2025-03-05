
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
    <section id="security" className="py-16 bg-secondary/10">
      <div className="section-container">
        <div className="text-center mb-14">
          <h2 className="section-title">
            Military Performance & Encryption
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityMeasures.map((measure, index) => (
            <div 
              key={index} 
              className="feature-card bg-secondary/30 border border-white/5 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${(index * 200)}ms`, animationFillMode: 'forwards' }}
            >
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <div className="text-primary">{measure.icon}</div>
                </div>
                
                <div>
                  <h3 className="text-lg font-display font-semibold mb-2">{measure.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{measure.description}</p>
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
