
import { Shield, Lock, Bell, Network } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const modules = [
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: "Secure Device Management",
    description: "Remotely manage device security policies, enforce updates, and monitor security compliance across your fleet.",
    features: [
      "Remote policy enforcement",
      "Auto-update management",
      "Security baseline verification",
      "Tamper detection alerts"
    ]
  },
  {
    icon: <Lock className="h-6 w-6 text-primary" />,
    title: "Advanced Encryption Module",
    description: "Military-grade encryption for all stored data and communications with quantum-resistant algorithms.",
    features: [
      "End-to-end encryption",
      "Post-quantum cryptography",
      "Secure key management",
      "Perfect forward secrecy"
    ]
  },
  {
    icon: <Bell className="h-6 w-6 text-primary" />,
    title: "Threat Intelligence Network",
    description: "Real-time threat detection and alerting with global intelligence sharing among trusted organizations.",
    features: [
      "Real-time threat detection",
      "Behavioral anomaly analysis",
      "Global threat intelligence",
      "Automated blocking responses"
    ]
  },
  {
    icon: <Network className="h-6 w-6 text-primary" />,
    title: "Secure Communications",
    description: "Encrypted voice, messaging, and video conferencing with verification and anti-surveillance features.",
    features: [
      "Voice/video encryption",
      "Secure messaging",
      "Metadata minimization",
      "Anti-eavesdropping measures"
    ]
  }
];

const SecurityModules = () => {
  return (
    <section id="modules" className="py-16">
      <div className="section-container">
        <div className="text-center mb-14">
          <h2 className="section-title">
            Secure Module Applications
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {modules.map((module, index) => (
            <Card 
              key={index} 
              className="glass-panel bg-secondary/30 border border-white/5 overflow-hidden relative opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${(index * 200)}ms`, animationFillMode: 'forwards' }}
            >
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="mr-4 p-2 rounded-lg bg-primary/10">
                    {module.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-semibold">{module.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{module.description}</p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  {module.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityModules;
