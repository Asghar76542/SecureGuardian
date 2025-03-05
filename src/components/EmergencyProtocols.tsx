
import { AlertTriangle, Shield, Clock, Zap, PhoneCall } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const EmergencyProtocols = () => {
  return (
    <section id="emergency" className="bg-card">
      <div className="section-container">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-destructive/20 border border-destructive/30 text-sm text-destructive mx-auto mb-6">
          <AlertTriangle className="h-3.5 w-3.5 mr-2" />
          <span>Emergency Protocols</span>
        </div>
        
        <h2 className="section-title">
          Rapid <span className="text-destructive">Response</span> Systems
        </h2>
        
        <p className="section-description">
          Our platform includes comprehensive emergency protocols for critical situations, ensuring rapid response and data security.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="glass-panel border-destructive/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/10 rounded-full filter blur-[60px]" />
            <CardContent className="p-6">
              <div className="flex items-center mb-5">
                <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center mr-3">
                  <Zap className="h-5 w-5 text-destructive" />
                </div>
                <h3 className="text-xl font-display font-semibold">Remote Wipe Protocol</h3>
              </div>
              
              <p className="text-muted-foreground mb-6">
                Instantly destroy all sensitive data on compromised devices with our crypto-shredding technology, using military-grade deletion algorithms.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-xs font-medium text-primary">1</span>
                  </div>
                  <span>Activation via secure SOC command or duress code</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-xs font-medium text-primary">2</span>
                  </div>
                  <span>Complete data erasure with verification checks</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-xs font-medium text-primary">3</span>
                  </div>
                  <span>Post-wipe audit reports for compliance</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-panel border-destructive/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/10 rounded-full filter blur-[60px]" />
            <CardContent className="p-6">
              <div className="flex items-center mb-5">
                <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center mr-3">
                  <PhoneCall className="h-5 w-5 text-destructive" />
                </div>
                <h3 className="text-xl font-display font-semibold">Emergency Response</h3>
              </div>
              
              <p className="text-muted-foreground mb-6">
                24/7 Security Operations Center with global reach and direct lines to security forces in 190+ countries for immediate physical support.
              </p>
              
              <div className="p-3 bg-secondary/30 rounded-lg border border-border mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Average Response Time</span>
                  <span className="text-sm font-bold text-primary">{'<'} 3 minutes</span>
                </div>
                
                <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-[85%]"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1.5 text-muted-foreground" />
                  <span className="text-muted-foreground">24/7 Availability</span>
                </div>
                
                <Separator orientation="vertical" className="h-4 mx-4" />
                
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1.5 text-muted-foreground" />
                  <span className="text-muted-foreground">ISO 27001 Certified</span>
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
