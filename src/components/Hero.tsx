
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center py-24 overflow-hidden">
      {/* Background grid effect with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background z-0"></div>
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col items-start text-left">
            <div className="section-tag mb-6">
              <span>Advanced Protection</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Secure Your Critical Data With Confidence
            </h1>
            
            <p className="text-lg text-muted-foreground mb-10 max-w-xl">
              Enterprise-grade security solutions for government entities, law firms, and organizations that safeguard critical information and infrastructure.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 mb-12">
              <Button size="lg" className="button-primary text-base px-8 py-6 rounded-md shadow-glow hover:shadow-glow-intense transition-all">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="button-secondary text-base px-8 py-6 rounded-md border-primary/30 hover:bg-primary/10">
                View Demo
              </Button>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Government & Defense Agencies</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Legal & Financial Institutions</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Critical Infrastructure Operators</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow effect behind the shield */}
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
              
              <div className="relative bg-gradient-to-br from-card/80 to-card/30 backdrop-blur-xl rounded-2xl overflow-hidden border border-primary/20 p-8 shadow-2xl max-w-md">
                <img 
                  src="/lovable-uploads/shield-security.png" 
                  alt="Security Shield"
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Geometric accent elements */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-accent/10 rounded-full blur-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
