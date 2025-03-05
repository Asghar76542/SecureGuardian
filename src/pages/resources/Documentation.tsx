
import FooterPageLayout from '@/components/FooterPageLayout';
import { FileText, Book, FileCode, Video } from 'lucide-react';

const Documentation = () => {
  return (
    <FooterPageLayout 
      title="Documentation" 
      description="User guides, technical documentation, and tutorials for our secure platform"
      category="Resources"
    >
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Book className="h-6 w-6 mr-2 text-primary" />
            User Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="#" className="block group">
              <div className="h-full bg-card/30 border border-border rounded-lg p-6 hover:border-primary transition-colors">
                <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">Secure Device Setup Guide</h3>
                <p className="text-muted-foreground mb-4">
                  Step-by-step instructions for setting up your SecureGuardian device, including initial 
                  configuration, security features, and best practices.
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-primary">View Guide</span>
                  <span className="text-muted-foreground">Updated: May 2023</span>
                </div>
              </div>
            </a>
            
            <a href="#" className="block group">
              <div className="h-full bg-card/30 border border-border rounded-lg p-6 hover:border-primary transition-colors">
                <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">Secure Communications Manual</h3>
                <p className="text-muted-foreground mb-4">
                  Complete guide to using SecureGuardian's encrypted messaging, voice, and video 
                  communication tools safely and effectively.
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-primary">View Guide</span>
                  <span className="text-muted-foreground">Updated: June 2023</span>
                </div>
              </div>
            </a>
            
            <a href="#" className="block group">
              <div className="h-full bg-card/30 border border-border rounded-lg p-6 hover:border-primary transition-colors">
                <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">Threat Detection & Response</h3>
                <p className="text-muted-foreground mb-4">
                  How to identify and respond to security threats using the SecureGuardian 
                  threat monitoring and incident response tools.
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-primary">View Guide</span>
                  <span className="text-muted-foreground">Updated: April 2023</span>
                </div>
              </div>
            </a>
            
            <a href="#" className="block group">
              <div className="h-full bg-card/30 border border-border rounded-lg p-6 hover:border-primary transition-colors">
                <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">Administration & Deployment</h3>
                <p className="text-muted-foreground mb-4">
                  Administrator's guide for deploying, managing, and maintaining SecureGuardian 
                  solutions across your organization.
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-primary">View Guide</span>
                  <span className="text-muted-foreground">Updated: June 2023</span>
                </div>
              </div>
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FileText className="h-6 w-6 mr-2 text-primary" />
            Technical Documentation
          </h2>
          <div className="space-y-4">
            <a href="#" className="block group">
              <div className="bg-card/30 border border-border rounded-lg p-5 hover:border-primary transition-colors">
                <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">API Reference</h3>
                <p className="text-muted-foreground mb-2">
                  Complete API documentation for integrating with SecureGuardian's secure communication 
                  and threat intelligence systems.
                </p>
                <span className="text-sm text-primary">View Documentation</span>
              </div>
            </a>
            
            <a href="#" className="block group">
              <div className="bg-card/30 border border-border rounded-lg p-5 hover:border-primary transition-colors">
                <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">Security Architecture</h3>
                <p className="text-muted-foreground mb-2">
                  Detailed overview of SecureGuardian's security architecture, protocols, and 
                  encryption technologies.
                </p>
                <span className="text-sm text-primary">View Documentation</span>
              </div>
            </a>
            
            <a href="#" className="block group">
              <div className="bg-card/30 border border-border rounded-lg p-5 hover:border-primary transition-colors">
                <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">Compliance Documentation</h3>
                <p className="text-muted-foreground mb-2">
                  Certification details, compliance reports, and security assessment documentation 
                  for regulatory requirements.
                </p>
                <span className="text-sm text-primary">View Documentation</span>
              </div>
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Video className="h-6 w-6 mr-2 text-primary" />
            Video Tutorials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="#" className="block group">
              <div className="bg-card/30 border border-border rounded-lg overflow-hidden hover:border-primary transition-colors">
                <div className="aspect-video bg-black/50 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">Getting Started</h3>
                  <p className="text-sm text-muted-foreground">10:24 • Initial setup and overview</p>
                </div>
              </div>
            </a>
            
            <a href="#" className="block group">
              <div className="bg-card/30 border border-border rounded-lg overflow-hidden hover:border-primary transition-colors">
                <div className="aspect-video bg-black/50 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">Secure Messaging</h3>
                  <p className="text-sm text-muted-foreground">7:36 • Features and best practices</p>
                </div>
              </div>
            </a>
            
            <a href="#" className="block group">
              <div className="bg-card/30 border border-border rounded-lg overflow-hidden hover:border-primary transition-colors">
                <div className="aspect-video bg-black/50 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">Threat Response</h3>
                  <p className="text-sm text-muted-foreground">12:47 • Handling security alerts</p>
                </div>
              </div>
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FileCode className="h-6 w-6 mr-2 text-primary" />
            Developer Resources
          </h2>
          <div className="bg-card/30 border border-border rounded-lg p-6">
            <h3 className="text-xl font-medium mb-4">Integration SDK</h3>
            <p className="text-muted-foreground mb-4">
              The SecureGuardian SDK enables developers to integrate our secure communication and 
              threat protection capabilities into custom applications and workflows.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <a href="#" className="text-primary hover:underline block py-2 px-4 bg-secondary/50 rounded border border-border text-center">Android SDK</a>
              <a href="#" className="text-primary hover:underline block py-2 px-4 bg-secondary/50 rounded border border-border text-center">iOS SDK</a>
              <a href="#" className="text-primary hover:underline block py-2 px-4 bg-secondary/50 rounded border border-border text-center">Web API</a>
            </div>
          </div>
        </section>
      </div>
    </FooterPageLayout>
  );
};

export default Documentation;
