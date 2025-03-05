
import { Shield, Smartphone, Bell, Network, FileCheck } from "lucide-react";

const featureItems = [
  {
    icon: <Shield className="feature-icon" />,
    title: "Security First UI",
    description: "Professional, military-grade aesthetic with a dark, minimal interface that prioritizes usability in high-risk environments."
  },
  {
    icon: <Smartphone className="feature-icon" />,
    title: "Pre-Secured Devices",
    description: "Encrypted iPhones and GrapheneOS Pixels with built-in Signal, ProtonMail, and Tor for secure communication."
  },
  {
    icon: <Bell className="feature-icon" />,
    title: "Emergency Protocols",
    description: "Remote crypto-shredding, duress codes, and 24/7 SOC monitoring for rapid incident response."
  },
  {
    icon: <Network className="feature-icon" />,
    title: "Zero Trust Architecture",
    description: "Granular access controls, continuous validation, and multi-factor authentication via YubiKey."
  },
  {
    icon: <FileCheck className="feature-icon" />,
    title: "Regulatory Compliance",
    description: "NCSC, ISO 27001, and GDPR-certified, with ongoing audits for highest assurance."
  }
];

const Features = () => {
  return (
    <section id="features" className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background z-0" />
      
      <div className="section-container relative z-10">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/50 border border-border text-sm text-foreground/80 mx-auto mb-6">
          <span>Key Features</span>
        </div>
        
        <h2 className="section-title">
          Defense-Grade Security <span className="highlight-text">Features</span>
        </h2>
        
        <p className="section-description">
          SecureGuardian provides comprehensive security solutions to safeguard sensitive information and communications for high-risk professionals.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featureItems.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${(index * 200)}ms`, animationFillMode: 'forwards' }}
            >
              {feature.icon}
              <h3 className="text-xl font-display font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
