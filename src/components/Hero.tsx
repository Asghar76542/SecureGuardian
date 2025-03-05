
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/lovable-uploads/a62aab0c-84ae-4199-b1be-ef7149b08e35.png')] bg-cover bg-center opacity-40 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-0" />
      
      {/* Content */}
      <div className="relative z-10 container px-6 md:px-8 flex flex-col items-center text-center space-y-8">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6">
          <span>Defense-Grade Security</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold max-w-4xl mx-auto leading-tight">
          <span className="text-white">Defense-Grade Mobile Security</span>
          <br />
          <span className="text-white/80">For Those Who Guard The World's Secrets</span>
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
          Ultra-secure encrypted devices, remote data protection, and advanced threat intelligence for government entities, law firms, and accredited journalists.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4 mt-2">
          <Button className="button-primary text-base px-8 py-6">
            Request Free Demo <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="pt-16 mt-8 w-full max-w-3xl">
          <p className="text-sm text-muted-foreground mb-6">Trusted by leading organizations worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 grayscale opacity-30">
            <div className="h-8 w-24 bg-foreground/70 rounded-md"></div>
            <div className="h-8 w-28 bg-foreground/70 rounded-md"></div>
            <div className="h-8 w-20 bg-foreground/70 rounded-md"></div>
            <div className="h-8 w-32 bg-foreground/70 rounded-md"></div>
            <div className="h-8 w-26 bg-foreground/70 rounded-md"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
