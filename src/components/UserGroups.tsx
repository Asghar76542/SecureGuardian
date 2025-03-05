
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
    <section id="users" className="bg-card">
      <div className="section-container">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/50 border border-border text-sm text-foreground/80 mx-auto mb-6">
          <span>Target Users</span>
        </div>
        
        <h2 className="section-title">
          Who <span className="highlight-text">It's For</span>
        </h2>
        
        <p className="section-description">
          SecureGuardian is designed exclusively for verified professionals who handle sensitive information in high-risk environments.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {userGroups.map((group, index) => (
            <div 
              key={index} 
              className="glass-panel rounded-xl p-8 relative overflow-hidden opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${(index * 200)}ms`, animationFillMode: 'forwards' }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${group.color} opacity-30 z-0`}></div>
              
              {/* Icon circle */}
              <div className="relative z-10 mb-6 h-14 w-14 rounded-full bg-secondary flex items-center justify-center">
                <div className="text-primary">
                  {group.icon}
                </div>
              </div>
              
              <h3 className="relative z-10 text-xl font-display font-semibold mb-4">{group.title}</h3>
              
              <p className="relative z-10 text-muted-foreground">{group.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserGroups;
