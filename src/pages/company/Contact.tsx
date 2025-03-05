
import FooterPageLayout from '@/components/FooterPageLayout';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  return (
    <FooterPageLayout 
      title="Contact Us" 
      description="Reach out to our team for inquiries, support, or partnership opportunities"
      category="Company"
    >
      <div className="space-y-8">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <p className="mb-6">
              Have questions about our secure mobile solutions? Need a personalized demo? 
              Our team is ready to assist you with any inquiries about implementing 
              SecureGuardian in your organization.
            </p>
            
            <div className="space-y-4 mt-8">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Email Us</h3>
                  <p className="text-sm text-muted-foreground">For general inquiries:</p>
                  <p className="text-sm">info@secureguardian.com</p>
                  
                  <p className="text-sm text-muted-foreground mt-2">For support:</p>
                  <p className="text-sm">support@secureguardian.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Call Us</h3>
                  <p className="text-sm text-muted-foreground">Main Office:</p>
                  <p className="text-sm">+1 (202) 555-0123</p>
                  
                  <p className="text-sm text-muted-foreground mt-2">Support Hotline (24/7):</p>
                  <p className="text-sm">+1 (202) 555-0199</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Visit Us</h3>
                  <p className="text-sm text-muted-foreground">Global Headquarters:</p>
                  <p className="text-sm">
                    1700 Pennsylvania Avenue<br />
                    Suite 400<br />
                    Washington, DC 20006<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card/30 border border-border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="you@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="organization" className="block text-sm font-medium mb-1">Organization</label>
                <input 
                  type="text" 
                  id="organization" 
                  className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your organization"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="What's this regarding?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <div className="pt-2">
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Global Offices</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-card/30 border border-border rounded-lg p-5">
              <h3 className="font-medium mb-2">Washington DC</h3>
              <p className="text-sm text-muted-foreground mb-1">Headquarters</p>
              <p className="text-sm">
                1700 Pennsylvania Avenue<br />
                Suite 400<br />
                Washington, DC 20006<br />
                United States
              </p>
            </div>
            
            <div className="bg-card/30 border border-border rounded-lg p-5">
              <h3 className="font-medium mb-2">London</h3>
              <p className="text-sm text-muted-foreground mb-1">European Operations</p>
              <p className="text-sm">
                1 Canada Square<br />
                Canary Wharf<br />
                London, E14 5AB<br />
                United Kingdom
              </p>
            </div>
            
            <div className="bg-card/30 border border-border rounded-lg p-5">
              <h3 className="font-medium mb-2">Singapore</h3>
              <p className="text-sm text-muted-foreground mb-1">Asia-Pacific Office</p>
              <p className="text-sm">
                One Raffles Place<br />
                Tower 2, #19-01<br />
                Singapore 048616<br />
                Singapore
              </p>
            </div>
          </div>
        </section>
      </div>
    </FooterPageLayout>
  );
};

export default Contact;
