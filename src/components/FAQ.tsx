
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How is SecureGuardian more secure than other solutions?",
    answer: "SecureGuardian employs a zero-trust architecture, military-grade encryption, and continuous monitoring that exceeds industry standards. Our solutions are designed for environments where security breaches are not an option."
  },
  {
    question: "What types of organizations does SecureGuardian primarily support?",
    answer: "We specialize in serving government agencies, defense contractors, legal firms, financial institutions, and critical infrastructure operators who require the highest levels of data security and compliance."
  },
  {
    question: "How quickly can SecureGuardian be deployed?",
    answer: "Typical deployment takes 2-4 weeks, including security assessment, customization, and implementation. Expedited deployment is available for urgent security needs."
  },
  {
    question: "What compliance standards does SecureGuardian meet?",
    answer: "SecureGuardian is compliant with FIPS 140-2, FISMA, HIPAA, GDPR, SOC 2 Type II, and various government-specific security requirements depending on your industry."
  },
  {
    question: "How does the emergency response feature work?",
    answer: "Our 24/7 Security Operations Center monitors for threats in real-time. When triggered, our emergency protocols can remotely lock down devices, isolate network segments, or initiate secure data destruction procedures as needed."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 bg-card">
      <div className="section-container">
        <div className="section-tag">
          <span>Questions & Answers</span>
        </div>
        
        <h2 className="section-title">
          Frequently Asked Questions
        </h2>
        
        <p className="section-description">
          Everything you need to know about SecureGuardian's security platform
        </p>
        
        <div className="max-w-3xl mx-auto mt-10">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-accordion">
              <button 
                className="faq-accordion-button"
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                {openIndex === index ? 
                  <ChevronUp className="h-5 w-5 text-primary" /> : 
                  <ChevronDown className="h-5 w-5" />
                }
              </button>
              
              {openIndex === index && (
                <div className="faq-accordion-content">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
