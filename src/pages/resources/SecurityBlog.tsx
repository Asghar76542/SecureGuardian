
import FooterPageLayout from '@/components/FooterPageLayout';
import { Calendar, User, ArrowRight } from 'lucide-react';

const SecurityBlog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Evolving Landscape of Mobile Security Threats",
      excerpt: "An analysis of emerging mobile security threats targeting government officials and executives in 2023, and strategies for mitigation.",
      date: "June 15, 2023",
      author: "Michael Chen, Chief Security Officer",
      category: "Threat Intelligence",
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Zero Trust Architecture for Mobile Communications",
      excerpt: "How implementing zero trust principles can enhance security for organizations dealing with sensitive communications and data.",
      date: "May 22, 2023",
      author: "Sarah Williams, Security Architect",
      category: "Best Practices",
      readTime: "12 min read"
    },
    {
      id: 3,
      title: "Secure Communications for Legal Professionals",
      excerpt: "Protecting attorney-client privilege in the digital age with encrypted communications and secure document handling.",
      date: "April 10, 2023",
      author: "David Reynolds, Legal Security Advisor",
      category: "Industry Focus",
      readTime: "10 min read"
    },
    {
      id: 4,
      title: "The Future of Quantum-Resistant Encryption",
      excerpt: "Preparing for the post-quantum era with cryptographic algorithms designed to withstand quantum computing attacks.",
      date: "March 28, 2023",
      author: "Dr. Elena Novak, Cryptography Research Lead",
      category: "Technology",
      readTime: "15 min read"
    },
    {
      id: 5,
      title: "Physical Security Controls for Mobile Devices",
      excerpt: "Implementing hardware-level protections against physical tampering and side-channel attacks on secure devices.",
      date: "February 17, 2023",
      author: "James Harris, Hardware Security Engineer",
      category: "Device Security",
      readTime: "9 min read"
    },
    {
      id: 6,
      title: "Emergency Response Protocols for Security Breaches",
      excerpt: "Step-by-step guide for implementing effective emergency response procedures when faced with potential security compromises.",
      date: "January 25, 2023",
      author: "Rebecca Torres, Incident Response Director",
      category: "Emergency Protocols",
      readTime: "11 min read"
    }
  ];

  return (
    <FooterPageLayout 
      title="Security Blog" 
      description="Insights, analysis, and best practices from our security experts"
      category="Resources"
    >
      <div className="space-y-12">
        {blogPosts.map(post => (
          <article key={post.id} className="pb-8 border-b border-border">
            <a href="#" className="group">
              <span className="text-sm text-primary mb-2 inline-block">{post.category}</span>
              <h2 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
            </a>
            <p className="text-muted-foreground mb-4">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-x-6 gap-y-2">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{post.date}</span>
              </div>
              <span>{post.readTime}</span>
            </div>
            <div className="mt-4">
              <a 
                href="#" 
                className="inline-flex items-center text-primary hover:underline"
              >
                Read Article <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </article>
        ))}
        
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2">
            <a href="#" className="h-10 w-10 rounded border border-border flex items-center justify-center hover:bg-secondary transition-colors">1</a>
            <a href="#" className="h-10 w-10 rounded border border-border flex items-center justify-center hover:bg-secondary transition-colors">2</a>
            <a href="#" className="h-10 w-10 rounded border border-border flex items-center justify-center hover:bg-secondary transition-colors">3</a>
            <span className="h-10 flex items-center justify-center px-2">...</span>
            <a href="#" className="h-10 w-10 rounded border border-border flex items-center justify-center hover:bg-secondary transition-colors">8</a>
          </div>
        </div>
      </div>
    </FooterPageLayout>
  );
};

export default SecurityBlog;
