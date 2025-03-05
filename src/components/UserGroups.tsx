
import { Shield, Scale, FileText } from 'lucide-react';

const userGroups = [
  {
    icon: <Shield />,
    title: "Government Officials",
    description: "Secure diplomatic communications and protect classified information while maintaining operational security in various security contexts.",
    color: "from-blue-500/20 to-blue-600/20"
  },
  {
    icon: <Scale />,
    title: "Legal Professionals",
    description: "Safeguard attorney-client privilege and ensure confidential case information remains protected from unauthorized access or surveillance.",
    color: "from-amber-500/20 to-amber-600/20"
  },
  {
    icon: <FileText />,
    title: "Investigative Journalists",
    description: "Prevent source exposure in high-risk regions and protect sensitive information while conducting investigations in hostile environments.",
    color: "from-emerald-500/20 to-emerald-600/20"
  }
];

const UserGroups = () => {
  return (
    <section id="users" className="py-16">
      <div className="section-container">
        <div className="text-center mb-14">
          <h2 className="section-title">
            Security Standards & Protocols
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userGroups.map((group, index) => (
            <div 
              key={index} 
              className="glass-panel bg-secondary/30 border border-white/5 rounded-xl p-6 relative overflow-hidden opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${(index * 200)}ms`, animationFillMode: 'forwards' }}
            >
              {/* Icon */}
              <div className="relative z-10 mb-5 h-8 w-8 text-primary flex items-center justify-start">
                {group.icon}
              </div>
              
              <h3 className="relative z-10 text-lg font-display font-semibold mb-3">{group.title}</h3>
              
              <p className="relative z-10 text-muted-foreground text-sm">{group.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserGroups;
