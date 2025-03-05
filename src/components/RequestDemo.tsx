
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const RequestDemo = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    message: '',
    submitted: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formState);
    
    // Show success message
    toast.success('Demo request received', {
      description: 'Our security team will contact you shortly.',
    });
    
    // Reset form after submission
    setFormState({
      name: '',
      email: '',
      organization: '',
      role: '',
      message: '',
      submitted: true
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormState(prev => ({ ...prev, role: value }));
  };

  return (
    <section id="contact" className="bg-card">
      <div className="section-container">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/50 border border-border text-sm text-foreground/80 mb-6">
                <span>Get Started</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6 text-left">
                Request a <span className="highlight-text">Secure Demo</span>
              </h2>
              
              <p className="text-muted-foreground mb-8">
                Complete the form to request a personalized demo of SecureGuardian. Our team will conduct a security clearance verification before arranging your demonstration.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Secure Communication</h4>
                    <p className="text-sm text-muted-foreground">Your information is transmitted via encrypted channels</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Verification Process</h4>
                    <p className="text-sm text-muted-foreground">Security clearance verification for all requests</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">NDA Protected</h4>
                    <p className="text-sm text-muted-foreground">All demonstrations are covered by strict non-disclosure agreements</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-panel rounded-xl p-8">
              {formState.submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-display font-semibold mb-3">Request Received</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for your interest in SecureGuardian. Our security team will contact you shortly to verify your identity and organization.
                  </p>
                  <Button 
                    className="button-secondary"
                    onClick={() => setFormState(prev => ({ ...prev, submitted: false }))}
                  >
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Work Email</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your work email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium mb-1">Organization</label>
                      <Input
                        id="organization"
                        name="organization"
                        placeholder="Enter your organization name"
                        value={formState.organization}
                        onChange={handleChange}
                        required
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium mb-1">Professional Role</label>
                      <Select 
                        value={formState.role} 
                        onValueChange={handleSelectChange}
                        required
                      >
                        <SelectTrigger className="bg-secondary/50 border-border">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="government">Government Official</SelectItem>
                          <SelectItem value="legal">Legal Professional</SelectItem>
                          <SelectItem value="journalism">Investigative Journalist</SelectItem>
                          <SelectItem value="other">Other (specify in message)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your security needs"
                        value={formState.message}
                        onChange={handleChange}
                        rows={4}
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="button-primary w-full">
                    Request Secure Demo
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By submitting this form, you agree to our verification process and privacy policy.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestDemo;
