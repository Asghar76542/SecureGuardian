
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="relative py-24">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="card-highlight rounded-2xl p-12 border border-primary/20 shadow-glow">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Secure Your Operations?
          </h2>
          
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
            Get started with SecureGuardian today and experience defense-grade security for your critical infrastructure and sensitive data
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-8">
            <Button className="button-primary text-base px-8 py-6 rounded-md shadow-glow hover:shadow-glow-intense transition-all">
              Request a Demo <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="button-secondary text-base px-8 py-6 rounded-md border-primary/30 hover:bg-primary/10">
              Contact Sales
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-8">
            No credit card required • 14-day evaluation available to qualified organizations • SOC 2 compliant
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
