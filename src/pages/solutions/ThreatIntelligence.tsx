
import FooterPageLayout from '@/components/FooterPageLayout';
import { AlertTriangle, Eye, Target } from 'lucide-react';

const ThreatIntelligence = () => {
  return (
    <FooterPageLayout 
      title="Threat Intelligence" 
      description="Real-time threat detection and prevention for mobile security"
      category="Solutions"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <AlertTriangle className="h-6 w-6 mr-2 text-primary" />
            Proactive Threat Monitoring
          </h2>
          <p>
            SecureGuardian's threat intelligence platform continuously monitors global threats targeting 
            mobile devices, networks, and applications. Our security operations center tracks emerging 
            attack vectors and vulnerabilities to provide real-time protection against evolving threats.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Eye className="h-6 w-6 mr-2 text-primary" />
            Advanced Threat Detection
          </h2>
          <p>
            Our comprehensive threat detection capabilities include:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Zero-day vulnerability monitoring and patching</li>
            <li>Behavioral anomaly detection using AI algorithms</li>
            <li>Network traffic analysis for suspicious patterns</li>
            <li>Application integrity verification</li>
            <li>Malicious code identification and blocking</li>
            <li>Rogue cell tower detection and prevention</li>
            <li>GPS spoofing protection</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Target className="h-6 w-6 mr-2 text-primary" />
            Targeted Threat Intelligence
          </h2>
          <p>
            We provide customized threat intelligence based on your organization's profile, industry, 
            and threat landscape. Our intelligence teams analyze specific threats targeting your sector 
            and adapt protections to address your unique security challenges.
          </p>
          <p className="mt-4">
            Clients receive regular intelligence briefings and threat assessments with actionable 
            recommendations to enhance their security posture. Our approach combines automated 
            systems with human intelligence analysis for comprehensive protection.
          </p>
        </section>
        
        <div className="bg-card/50 border border-border rounded-lg p-6 mt-8">
          <h3 className="text-xl font-semibold mb-2">Stay ahead of emerging threats</h3>
          <p className="mb-4">
            Contact our threat intelligence team to understand how our proactive monitoring 
            can protect your organization from sophisticated cyber threats.
          </p>
          <a href="#" className="text-primary hover:underline">Request a briefing →</a>
        </div>
      </div>
    </FooterPageLayout>
  );
};

export default ThreatIntelligence;
