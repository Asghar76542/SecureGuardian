
import { AlertTriangle, Shield, Clock, Zap, PhoneCall } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const EmergencyProtocols = () => {
  return (
    <section id="emergency" className="py-16">
      <div className="section-container">
        <div className="text-center mb-14">
          <h2 className="section-title">
            Compliance & Certifications
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-panel bg-secondary/30 border border-white/5 overflow-hidden relative">
            <CardContent className="p-6">
              <div className="mb-5">
                <h3 className="text-lg font-display font-semibold">Government Certifications</h3>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4">
                Our platform meets the highest government security standards required for handling classified information.
              </p>
              
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <span>• NIST 800-53 Compliance</span>
                </div>
                <div className="flex items-center">
                  <span>• FIPS 140-2 Validated Cryptography</span>
                </div>
                <div className="flex items-center">
                  <span>• Common Criteria EAL4+ Certification</span>
                </div>
                <div className="flex items-center">
                  <span>• TEMPEST Standards Compliance</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-panel bg-secondary/30 border border-white/5 overflow-hidden relative">
            <CardContent className="p-6">
              <div className="mb-5">
                <h3 className="text-lg font-display font-semibold">International Standards</h3>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4">
                Our solutions maintain compliance with international security and data protection regulations.
              </p>
              
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <span>• ISO 27001:2013 Certified</span>
                </div>
                <div className="flex items-center">
                  <span>• GDPR Compliant Data Processing</span>
                </div>
                <div className="flex items-center">
                  <span>• SOC 2 Type II Audited</span>
                </div>
                <div className="flex items-center">
                  <span>• NATO Restricted Level Approval</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EmergencyProtocols;
