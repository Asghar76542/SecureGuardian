
import { Shield, Lock, CheckCircle, Zap, AlertTriangle, Database, Globe, Key } from "lucide-react";

const featureItems = [
  {
    icon: <Shield className="feature-icon" />,
    title: "Zero Trust Architecture",
    description: "Our advanced security model operates on the principle that no one is trusted by default, regardless of location or network."
  },
  {
    icon: <Lock className="feature-icon" />,
    title: "Multi-Factor Authentication",
    description: "Additional security layers beyond passwords including biometrics, hardware keys, and time-based tokens."
  },
  {
    icon: <Zap className="feature-icon" />,
    title: "Secure Communications",
    description: "End-to-end encrypted channels ensuring communications remain private and cannot be intercepted."
  },
  {
    icon: <Globe className="feature-icon" />,
    title: "Global Threat Intelligence",
    description: "Continuous monitoring of global threats to proactively protect your network from emerging vulnerabilities."
  },
  {
    icon: <Key className="feature-icon" />,
    title: "Advanced Access Control",
    description: "Monitor and restrict third-party access to sensitive data with fine-grained permissions and audit trails."
  },
  {
    icon: <Database className="feature-icon" />,
    title: "Secure Data Management",
    description: "Centralized control for protecting, encrypting, and managing sensitive data across your organization."
  }
];

const Features = () => {
  return (
    <section id="features" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-background to-background z-0"></div>
      
      <div className="section-container relative z-10">
        <div className="flex justify-center">
          <div className="section-tag">
            <span>Advanced Security</span>
          </div>
        </div>
        
        <h2 className="section-title">
          Enterprise-Grade Security Features
        </h2>
        
        <p className="section-description">
          Military-grade security solutions designed for organizations that handle sensitive information in complex environments
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {featureItems.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${(index * 100)}ms`, animationFillMode: 'forwards' }}
            >
              <div className="bg-primary/10 p-3 rounded-lg w-14 h-14 flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-0 bottom-0 max-w-lg p-8 hidden lg:block">
        <div className="card-highlight rounded-2xl p-8 border shadow-glow">
          <h3 className="text-xl font-semibold mb-4 text-center">Zero Trust Security</h3>
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Continuous verification and strict access controls for all resources regardless of location
          </p>
          <div className="flex justify-center">
            <button className="bg-primary text-white px-5 py-2 rounded-md text-sm hover:bg-primary/90 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
