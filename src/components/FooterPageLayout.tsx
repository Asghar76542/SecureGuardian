
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

interface FooterPageLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  category?: string;
}

const FooterPageLayout = ({ title, description, children, category }: FooterPageLayoutProps) => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-6 md:px-8">
          {/* Breadcrumb */}
          <nav className="flex mb-8 text-sm text-muted-foreground">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 mx-1" />
                {category && (
                  <>
                    <Link 
                      to={`/${pathParts[0]}`} 
                      className="hover:text-primary transition-colors"
                    >
                      {category}
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-1" />
                  </>
                )}
                <span className="text-foreground">{title}</span>
              </li>
            </ol>
          </nav>
          
          {/* Page header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-semibold mb-4">{title}</h1>
            {description && (
              <p className="text-lg text-muted-foreground">{description}</p>
            )}
          </div>
          
          {/* Page content */}
          <div className="prose prose-invert max-w-none">
            {children}
          </div>
          
          {/* Back button */}
          <div className="mt-16">
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FooterPageLayout;
