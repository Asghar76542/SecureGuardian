
import { Shield } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card/50 border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-base font-semibold">SecureGuardian</span>
            </div>
            
            <p className="text-xs text-muted-foreground mb-4">
              Enterprise-Grade Security for Those Who Protect Critical Data
            </p>
            
            <div className="flex space-x-3">
              <a href="#" className="h-8 w-8 rounded-full bg-secondary/80 flex items-center justify-center transition-colors hover:bg-secondary">
                <span className="sr-only">Twitter</span>
                <svg className="h-4 w-4 text-foreground/80" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-secondary/80 flex items-center justify-center transition-colors hover:bg-secondary">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-4 w-4 text-foreground/80" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-xs font-semibold uppercase mb-3">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Solutions</a></li>
                <li><a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Security</a></li>
                <li><a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Enterprise</a></li>
                <li><a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xs font-semibold uppercase mb-3">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Customers</a></li>
                <li><a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Partners</a></li>
                <li><a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xs font-semibold uppercase mb-3">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Security Center</a></li>
                <li><a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Webinars</a></li>
                <li><a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/60 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground mb-4 md:mb-0">
            © {currentYear} SecureGuardian. All rights reserved. Certified by VeraTrust for FIPS 140-2
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
