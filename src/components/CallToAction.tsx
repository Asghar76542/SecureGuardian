
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="relative py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="glass-panel rounded-xl p-10 border border-border/50">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Secure Your Operations?
          </h2>
          
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Get started with SecureGuardian today and experience defense-grade security for your organization
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="button-primary text-base px-8 py-6">
              Request a Demo
            </Button>
            <Button variant="outline" className="button-secondary text-base px-8 py-6">
              Contact Sales
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-6">
            No credit card required • 14-day evaluation available to qualified organizations • SOC 2 compliant
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
