import { Navigate } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, AlertTriangle, ExternalLink, Mail, Apple, Smartphone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Register = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
          {/* Security Instructions Column */}
          <div className="w-full lg:w-1/2">
            <div className="mb-6">
              <h1 className="text-3xl font-display font-bold mb-2">Secure Registration</h1>
              <p className="text-muted-foreground">
                Important security information before you create your account
              </p>
            </div>
            
            <Card className="mb-6 border-primary/20 bg-primary/5">
              <CardContent className="p-4 mt-6">
                <div className="flex items-start gap-3 mb-4">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-lg mb-1">ProtonMail Strongly Recommended</h3>
                    <p className="text-muted-foreground text-sm">
                      For maximum security and privacy, we strongly recommend using a ProtonMail 
                      email address for your SecureGuardian account.
                    </p>
                  </div>
                </div>
                
                <div className="ml-8 mb-4">
                  <h4 className="text-sm font-medium mb-2">Why ProtonMail?</h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
                    <li>End-to-end encryption protects your communications</li>
                    <li>Swiss privacy laws provide additional legal protection</li>
                    <li>Open-source code ensures transparency</li>
                    <li>Zero-access encryption means even ProtonMail can't read your emails</li>
                  </ul>
                </div>
                
                <div className="ml-8">
                  <a href="https://account.proton.me/mail/signup?plan=free&billing=12" target="_blank" rel="noopener noreferrer" className="inline-block mb-4">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
                      Create ProtonMail Account
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </Button>
                  </a>
                  
                  <div className="flex flex-wrap gap-3 mt-2">
                    <p className="text-xs text-muted-foreground w-full mb-1">Get the ProtonMail app:</p>
                    <a 
                      href="https://apps.apple.com/app/protonmail-encrypted-email/id979659905" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button variant="secondary" size="sm" className="h-8 text-xs">
                        <Apple className="h-3.5 w-3.5 mr-1" />
                        App Store
                      </Button>
                    </a>
                    <a 
                      href="https://play.google.com/store/apps/details?id=ch.protonmail.android" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button variant="secondary" size="sm" className="h-8 text-xs">
                        <Smartphone className="h-3.5 w-3.5 mr-1" />
                        Google Play
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-6 border-destructive/20 bg-destructive/5">
              <CardContent className="p-4 mt-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <h3 className="font-medium text-lg mb-1">Security Warning</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Using standard email providers (Gmail, Outlook, etc.) may compromise:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                      <li>Your communications with our platform</li>
                      <li>The security of your account recovery processes</li>
                      <li>Your overall digital privacy</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4 mt-6">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-lg mb-1">Additional Security Steps</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      After registration, we recommend:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                      <li>Setting up two-factor authentication once approved</li>
                      <li>Creating a unique password only used for SecureGuardian</li>
                      <li>Regularly reviewing account activity in your dashboard</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Registration Form Column */}
          <div className="w-full lg:w-1/2">
            <div className="mb-6">
              <h1 className="text-3xl font-display font-bold mb-2">Create Your Account</h1>
              <p className="text-muted-foreground">
                Join SecureGuardian to access our advanced security platform
              </p>
            </div>
            
            <AuthForm isLogin={false} />
            
            <Card className="mt-6 border-primary/20 bg-primary/5">
              <CardContent className="p-4 flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Security Notice</p>
                  <p className="text-muted-foreground">
                    For security reasons, all new accounts require administrator approval 
                    before gaining access to the platform.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
