
import { Star } from 'lucide-react';

const testimonials = [
  {
    stars: 5,
    quote: "SecureGuardian has been a critical partner for our agency's cybersecurity initiative. Their zero-trust architecture gives us confidence that our sensitive data remains protected at all times.",
    author: "Director of Cybersecurity",
    organization: "U.S. Federal Agency"
  },
  {
    stars: 5,
    quote: "As a law firm handling confidential client information, security is our top priority. SecureGuardian provides the robust protection we need with an interface that's easy for our staff to use.",
    author: "Chief Information Officer",
    organization: "Global Law Practice"
  },
  {
    stars: 5,
    quote: "The implementation was seamless and their support team is exceptional. We've seen measurable improvements in our security posture since deploying SecureGuardian across our organization.",
    author: "Director of IT Infrastructure",
    organization: "National Energy Corporation"
  }
];

const Testimonials = () => {
  return (
    <section className="relative bg-card py-20">
      <div className="section-container">
        <div className="section-tag">
          <span>Testimonials</span>
        </div>
        
        <h2 className="section-title">
          What Our Clients Say
        </h2>
        
        <p className="section-description">
          Protecting sensitive information for government agencies and organizations worldwide
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="glass-panel rounded-lg p-6 border border-border/50 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${(index * 200)}ms`, animationFillMode: 'forwards' }}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground mb-6 line-clamp-4">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xs text-primary font-semibold">
                    {testimonial.author.split(' ')[0][0]}{testimonial.author.split(' ')[1][0]}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.organization}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
