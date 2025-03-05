
import { Shield, Activity, BarChart } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Secure Deployment",
    description: "Our experts conduct a thorough security assessment of your organization to create a tailored deployment strategy"
  },
  {
    number: 2,
    icon: <Activity className="h-8 w-8 text-primary" />,
    title: "Continuous Monitoring",
    description: "Our security operations center provides 24/7 monitoring to detect and respond to threats in real-time"
  },
  {
    number: 3,
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: "Rapid Response",
    description: "Immediate remediation protocols are activated when potential security incidents are detected"
  }
];

const HowItWorks = () => {
  return (
    <section className="relative py-20">
      <div className="section-container">
        <div className="section-tag">
          <span>Our Process</span>
        </div>
        
        <h2 className="section-title">
          How SecureGuardian Works
        </h2>
        
        <p className="section-description">
          Our comprehensive security platform protects your organization at every level
        </p>
        
        <div className="relative mt-16">
          {/* Connector Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="relative opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${(index * 200)}ms`, animationFillMode: 'forwards' }}
              >
                <div className="glass-panel rounded-lg p-6 border border-border/50 flex flex-col items-center text-center relative">
                  {/* Step Number Circle */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-background border border-primary flex items-center justify-center z-10">
                    <span className="text-primary font-bold">{step.number}</span>
                  </div>
                  
                  <div className="mt-6 mb-4">
                    {step.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
