
import FooterPageLayout from '@/components/FooterPageLayout';
import { Lock, MessageSquare, Phone } from 'lucide-react';

const EncryptedCommunications = () => {
  return (
    <FooterPageLayout 
      title="Encrypted Communications" 
      description="End-to-end encrypted messaging, voice, and video solutions"
      category="Solutions"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Lock className="h-6 w-6 mr-2 text-primary" />
            End-to-End Encryption
          </h2>
          <p>
            SecureGuardian's communication solutions employ state-of-the-art end-to-end encryption 
            protocols that ensure your messages, calls, and conferences remain private from endpoint 
            to endpoint. All communication content is encrypted before leaving your device and can 
            only be decrypted by the intended recipient.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <MessageSquare className="h-6 w-6 mr-2 text-primary" />
            Secure Messaging Platform
          </h2>
          <p>
            Our secure messaging platform provides a complete replacement for standard text messaging 
            and email communications with enhanced security features:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Perfect forward secrecy for all messages</li>
            <li>Disappearing messages with customizable timers</li>
            <li>Screenshot prevention and copy protection</li>
            <li>Secure file transfers with encryption at rest</li>
            <li>Message recall and remote deletion capabilities</li>
            <li>No metadata storage or message content logging</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Phone className="h-6 w-6 mr-2 text-primary" />
            Secure Voice and Video
          </h2>
          <p>
            Make secure phone calls and video conferences without compromising quality or usability.
            Our solutions provide crystal-clear communication while maintaining rigorous security:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Voice and video encryption using SRTP protocols</li>
            <li>Anti-eavesdropping countermeasures</li>
            <li>Secure conference rooms with participant verification</li>
            <li>No call logs or recording on any servers</li>
            <li>Encrypted screen sharing for secure collaboration</li>
          </ul>
        </section>
        
        <div className="bg-card/50 border border-border rounded-lg p-6 mt-8">
          <h3 className="text-xl font-semibold mb-2">Ready to secure your communications?</h3>
          <p className="mb-4">
            Contact our security specialists to learn how our encrypted communication solutions
            can protect your organization's sensitive conversations.
          </p>
          <a href="#" className="text-primary hover:underline">Schedule a demo →</a>
        </div>
      </div>
    </FooterPageLayout>
  );
};

export default EncryptedCommunications;
