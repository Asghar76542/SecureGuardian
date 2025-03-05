
import { Shield, Scale, FileText, CheckCircle } from 'lucide-react';

const caseStudies = [
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: "Government Agency",
    description: "Implemented secure communication channels for diplomatic missions in high-risk regions with zero compromises."
  },
  {
    icon: <Scale className="h-6 w-6 text-primary" />,
    title: "International Law Firm",
    description: "Provided end-to-end encrypted devices for attorneys handling sensitive corporate merger negotiations."
  },
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    title: "Investigative News Team",
    description: "Deployed secure field reporting equipment for journalists working in regions with aggressive surveillance."
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
    title: "Financial Institution",
    description: "Secure communications platform for executives managing sensitive acquisition discussions and trading strategies."
  }
];

const CaseStudies = () => {
  return (
    <section id="case-studies" className="py-16 bg-secondary/10">
      <div className="section-container">
        <div className="text-center mb-14">
          <h2 className="section-title">
            Case Studies
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {caseStudies.map((study, index) => (
            <div 
              key={index} 
              className="glass-panel bg-secondary/30 border border-white/5 rounded-lg p-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${(index * 200)}ms`, animationFillMode: 'forwards' }}
            >
              <div className="mb-4">
                {study.icon}
              </div>
              <h3 className="text-lg font-display font-semibold mb-3">{study.title}</h3>
              <p className="text-muted-foreground text-sm">{study.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
