
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30 z-0" />
      
      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTkuNSA2MEgwVjU5LjVINjBWMEw2MC41IDBWNjBINTkuNVoiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] opacity-30 z-0" />
      
      {/* Glowing orb */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-[100px] opacity-60 animate-pulse-slow z-0" />
      
      {/* Content */}
      <div className="relative z-10 container px-6 md:px-8 flex flex-col items-center text-center space-y-8">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6 animate-fade-in">
          <span>Defense-Grade Security</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold max-w-5xl mx-auto leading-tight animate-fade-in">
          Secure Mobile Solutions For Those Who Guard The World's Secrets
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in animation-delay-200">
          Ultra-secure encrypted devices, remote data protection, and advanced threat intelligence for government entities, law firms, and accredited journalists.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in animation-delay-400">
          <Button className="button-primary text-base px-8 py-6">
            Request Demo <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="button-secondary text-base px-8 py-6">
            Learn More
          </Button>
        </div>
        
        <div className="pt-8 mt-8 border-t border-border/30 w-full max-w-3xl animate-fade-in animation-delay-600">
          <p className="text-sm text-muted-foreground mb-6">Trusted by leading organizations worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 grayscale opacity-70">
            <div className="h-8 w-24 bg-foreground/70 rounded-md"></div>
            <div className="h-8 w-28 bg-foreground/70 rounded-md"></div>
            <div className="h-8 w-20 bg-foreground/70 rounded-md"></div>
            <div className="h-8 w-32 bg-foreground/70 rounded-md"></div>
            <div className="h-8 w-26 bg-foreground/70 rounded-md"></div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in animation-delay-600">
        <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border border-foreground/20 rounded-full flex items-center justify-center">
          <div className="w-1.5 h-3 bg-foreground/60 rounded-full animate-[bounce_2s_infinite]"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
