
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
    <section id="features" className="relative py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background z-0" />
      
      <div className="section-container relative z-10">
        <div className="text-center mb-14">
          <h2 className="section-title">
            Advanced Security Features
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureItems.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card bg-secondary/30 border border-white/5 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${(index * 200)}ms`, animationFillMode: 'forwards' }}
            >
              <div className="flex flex-col items-start">
                <div className="mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-display font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
