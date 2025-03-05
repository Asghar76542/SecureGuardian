
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-20">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start text-left">
            <div className="section-tag">
              <span>Critical Data Security</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Secure Your Critical Data With Confidence
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              SecureGuardian provides enterprise-grade mobile security for government entities, law firms, and professionals that safeguard critical data.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button className="button-primary text-base px-8 py-6">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="button-secondary text-base px-8 py-6">
                View Demo
              </Button>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Government & Defense</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Legal & Compliance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Critical Infrastructure</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="bg-primary/20 backdrop-blur-md rounded-xl overflow-hidden border border-primary/30 p-4 max-w-md">
                <img 
                  src="/lovable-uploads/a7de75b9-5dc5-4448-97c8-c2bf58ce348f.png" 
                  alt="Security Shield"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
