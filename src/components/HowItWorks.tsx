
import { ShieldCheck, Activity, BarChart3 } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Security Assessment",
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
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
    title: "Rapid Response",
    description: "Immediate remediation protocols are activated when potential security incidents are detected"
  }
];

const HowItWorks = () => {
  return (
    <section className="relative py-24 mt-12 bg-card/30">
      <div className="section-container">
        <div className="flex justify-center">
          <div className="section-tag">
            <span>Our Process</span>
          </div>
        </div>
        
        <h2 className="section-title">
          How SecureGuardian Works
        </h2>
        
        <p className="section-description">
          Our comprehensive security platform protects your organization at every level
        </p>
        
        <div className="relative mt-20">
          {/* Connector Line */}
          <div className="absolute left-1/2 top-12 bottom-12 w-0.5 bg-primary/20 -translate-x-1/2 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="relative opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${(index * 200)}ms`, animationFillMode: 'forwards' }}
              >
                <div className="card-highlight rounded-xl p-8 border flex flex-col items-center text-center relative h-full">
                  {/* Step Number Circle */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-primary/10 border border-primary flex items-center justify-center z-10 shadow-glow">
                    <span className="text-primary font-bold">{step.number}</span>
                  </div>
                  
                  <div className="mt-6 mb-5">
                    <div className="bg-primary/10 p-3 rounded-full">
                      {step.icon}
                    </div>
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
