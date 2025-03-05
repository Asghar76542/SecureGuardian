
import FooterPageLayout from '@/components/FooterPageLayout';
import { ClipboardCheck, FileText, ShieldCheck } from 'lucide-react';

const ComplianceSolutions = () => {
  return (
    <FooterPageLayout 
      title="Compliance Solutions" 
      description="Meeting regulatory requirements for data security and privacy"
      category="Solutions"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <ClipboardCheck className="h-6 w-6 mr-2 text-primary" />
            Regulatory Compliance Framework
          </h2>
          <p>
            SecureGuardian's compliance solutions provide a comprehensive framework to help organizations 
            meet their regulatory obligations across multiple jurisdictions and standards. Our platform 
            is designed to address the most stringent requirements in government, legal, financial, 
            and healthcare sectors.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <ShieldCheck className="h-6 w-6 mr-2 text-primary" />
            Compliance Certifications
          </h2>
          <p>
            Our solutions are certified to meet key regulatory standards and frameworks, including:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>GDPR (General Data Protection Regulation)</li>
            <li>HIPAA (Health Insurance Portability and Accountability Act)</li>
            <li>FIPS 140-2 (Federal Information Processing Standard)</li>
            <li>CMMC (Cybersecurity Maturity Model Certification)</li>
            <li>SOC 2 Type II (Service Organization Control)</li>
            <li>PCI DSS (Payment Card Industry Data Security Standard)</li>
            <li>NIST 800-53 (National Institute of Standards and Technology)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FileText className="h-6 w-6 mr-2 text-primary" />
            Audit and Reporting
          </h2>
          <p>
            Our compliance solutions include comprehensive auditing and reporting capabilities:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Detailed compliance audit logs with tamper-evident storage</li>
            <li>Automated compliance reporting with customizable templates</li>
            <li>Real-time compliance monitoring and alerts</li>
            <li>Chain of custody documentation for sensitive data</li>
            <li>Data residency controls for geographic compliance</li>
            <li>Retention policy enforcement and documentation</li>
          </ul>
          <p className="mt-4">
            All compliance features are regularly updated to reflect changing regulatory requirements, 
            ensuring your organization stays compliant with evolving standards and requirements.
          </p>
        </section>
        
        <div className="bg-card/50 border border-border rounded-lg p-6 mt-8">
          <h3 className="text-xl font-semibold mb-2">Streamline your compliance efforts</h3>
          <p className="mb-4">
            Speak with our compliance specialists to understand how our solutions can simplify 
            your regulatory compliance requirements and reduce compliance risks.
          </p>
          <a href="#" className="text-primary hover:underline">Schedule a compliance review →</a>
        </div>
      </div>
    </FooterPageLayout>
  );
};

export default ComplianceSolutions;
