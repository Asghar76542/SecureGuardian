
import FooterPageLayout from '@/components/FooterPageLayout';
import { ShieldCheck, FileText, Download } from 'lucide-react';

const ComplianceCenter = () => {
  return (
    <FooterPageLayout 
      title="Compliance Center" 
      description="Resources and documentation for regulatory compliance and security standards"
      category="Resources"
    >
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <ShieldCheck className="h-6 w-6 mr-2 text-primary" />
            Compliance Certifications
          </h2>
          <p className="mb-6">
            SecureGuardian maintains a comprehensive compliance program to meet the strict requirements 
            of government agencies, legal firms, and organizations handling sensitive information. 
            Our solutions are certified to meet the following standards:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card/30 border border-border rounded-lg p-5">
              <div className="flex justify-between mb-3">
                <h3 className="font-medium">FIPS 140-2</h3>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Active</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Federal Information Processing Standard certification for cryptographic modules, 
                required for government use.
              </p>
              <a href="#" className="text-sm text-primary hover:underline flex items-center">
                <Download className="h-4 w-4 mr-1" />
                Download Certificate
              </a>
            </div>
            
            <div className="bg-card/30 border border-border rounded-lg p-5">
              <div className="flex justify-between mb-3">
                <h3 className="font-medium">SOC 2 Type II</h3>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Active</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Service Organization Control certification for security, availability, processing 
                integrity, confidentiality, and privacy.
              </p>
              <a href="#" className="text-sm text-primary hover:underline flex items-center">
                <Download className="h-4 w-4 mr-1" />
                Download Report
              </a>
            </div>
            
            <div className="bg-card/30 border border-border rounded-lg p-5">
              <div className="flex justify-between mb-3">
                <h3 className="font-medium">GDPR Compliance</h3>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Active</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Compliance with the European Union's General Data Protection Regulation for 
                personal data protection.
              </p>
              <a href="#" className="text-sm text-primary hover:underline flex items-center">
                <Download className="h-4 w-4 mr-1" />
                Download Documentation
              </a>
            </div>
            
            <div className="bg-card/30 border border-border rounded-lg p-5">
              <div className="flex justify-between mb-3">
                <h3 className="font-medium">HIPAA Compliance</h3>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Active</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Compliance with Health Insurance Portability and Accountability Act for 
                protected health information.
              </p>
              <a href="#" className="text-sm text-primary hover:underline flex items-center">
                <Download className="h-4 w-4 mr-1" />
                Download BAA Template
              </a>
            </div>
            
            <div className="bg-card/30 border border-border rounded-lg p-5">
              <div className="flex justify-between mb-3">
                <h3 className="font-medium">CMMC Level 3</h3>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Active</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Cybersecurity Maturity Model Certification for defense contractors and 
                suppliers handling controlled unclassified information.
              </p>
              <a href="#" className="text-sm text-primary hover:underline flex items-center">
                <Download className="h-4 w-4 mr-1" />
                Download Assessment
              </a>
            </div>
            
            <div className="bg-card/30 border border-border rounded-lg p-5">
              <div className="flex justify-between mb-3">
                <h3 className="font-medium">ISO 27001</h3>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Active</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                International standard for information security management systems (ISMS) 
                and related controls.
              </p>
              <a href="#" className="text-sm text-primary hover:underline flex items-center">
                <Download className="h-4 w-4 mr-1" />
                Download Certificate
              </a>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FileText className="h-6 w-6 mr-2 text-primary" />
            Compliance Documentation
          </h2>
          <div className="space-y-4">
            <a href="#" className="block group">
              <div className="bg-card/30 border border-border rounded-lg p-5 hover:border-primary transition-colors">
                <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">Security & Privacy Whitepaper</h3>
                <p className="text-muted-foreground mb-2">
                  Comprehensive overview of SecureGuardian's security architecture, data protection 
                  measures, and privacy controls.
                </p>
                <span className="text-sm text-primary">Download PDF</span>
              </div>
            </a>
            
            <a href="#" className="block group">
              <div className="bg-card/30 border border-border rounded-lg p-5 hover:border-primary transition-colors">
                <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">Penetration Testing Reports</h3>
                <p className="text-muted-foreground mb-2">
                  Independent security assessment reports from third-party penetration testing 
                  and vulnerability scanning.
                </p>
                <span className="text-sm text-primary">Download PDF</span>
              </div>
            </a>
            
            <a href="#" className="block group">
              <div className="bg-card/30 border border-border rounded-lg p-5 hover:border-primary transition-colors">
                <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">Data Processing Addendum</h3>
                <p className="text-muted-foreground mb-2">
                  Legal documentation outlining data processing terms, responsibilities, and 
                  data protection requirements.
                </p>
                <span className="text-sm text-primary">Download PDF</span>
              </div>
            </a>
            
            <a href="#" className="block group">
              <div className="bg-card/30 border border-border rounded-lg p-5 hover:border-primary transition-colors">
                <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">Supply Chain Security Documentation</h3>
                <p className="text-muted-foreground mb-2">
                  Details on SecureGuardian's secure supply chain, hardware verification, 
                  and component authenticity controls.
                </p>
                <span className="text-sm text-primary">Download PDF</span>
              </div>
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Compliance Assistance</h2>
          <div className="bg-card/50 border border-border rounded-lg p-6">
            <h3 className="text-xl font-medium mb-4">Need help with compliance?</h3>
            <p className="text-muted-foreground mb-4">
              Our compliance team is available to help your organization understand how 
              SecureGuardian meets your specific regulatory requirements and to provide 
              any necessary documentation for your compliance audits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a href="#" className="text-center text-primary hover:underline block py-2 px-4 bg-secondary/50 rounded border border-border">
                Schedule Compliance Review
              </a>
              <a href="#" className="text-center text-primary hover:underline block py-2 px-4 bg-secondary/50 rounded border border-border">
                Request Custom Documentation
              </a>
            </div>
          </div>
        </section>
      </div>
    </FooterPageLayout>
  );
};

export default ComplianceCenter;
