
import { Shield, Lock, CheckCircle, Zap, AlertTriangle, Database } from "lucide-react";

const featureItems = [
  {
    icon: <Shield className="feature-icon" />,
    title: "Zero Trust Architecture",
    description: "Our advanced security model operates on the principle that no one is trusted by default, regardless of location."
  },
  {
    icon: <Lock className="feature-icon" />,
    title: "Multi-Factor Authentication",
    description: "Additional security layers beyond passwords for comprehensive identity protection."
  },
  {
    icon: <Zap className="feature-icon" />,
    title: "Secure Communications",
    description: "End-to-end encrypted channels ensuring communications remain private globally."
  },
  {
    icon: <AlertTriangle className="feature-icon" />,
    title: "Real-time Threat Intelligence",
    description: "Continuous monitoring of global threats to proactively protect your network."
  },
  {
    icon: <CheckCircle className="feature-icon" />,
    title: "Third-Party Access Control",
    description: "Monitor and restrict third-party access to sensitive data and systems."
  },
  {
    icon: <Database className="feature-icon" />,
    title: "Remote Device Management",
    description: "Centralized control for monitoring, wiping, and managing remote devices."
  }
];

const Features = () => {
  return (
    <section id="features" className="relative bg-card py-20">
      <div className="section-container">
        <div className="section-tag">
          <span>Advanced Security</span>
        </div>
        
        <h2 className="section-title">
          Advanced Security Features
        </h2>
        
        <p className="section-description">
          Military-grade security solutions designed to handle the most sensitive information in a complex environment
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureItems.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${(index * 100)}ms`, animationFillMode: 'forwards' }}
            >
              <div className="flex items-start">
                <div className="bg-secondary p-3 rounded-md mr-4">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-0 bottom-0 max-w-lg p-8 hidden lg:block">
        <div className="glass-panel rounded-xl p-8 border border-primary/20">
          <h3 className="text-xl font-semibold mb-4 text-center">Zero Trust Authentication</h3>
          <p className="text-sm text-muted-foreground mb-4 text-center">
            Continuous verification and strict access controls for all resources regardless of location
          </p>
          <div className="flex justify-center">
            <button className="bg-primary text-white px-4 py-2 rounded text-sm">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
