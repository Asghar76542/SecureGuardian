
import FooterPageLayout from '@/components/FooterPageLayout';
import { Shield, Lock, Eye } from 'lucide-react';

const PrivacyStatement = () => {
  return (
    <FooterPageLayout 
      title="Privacy Statement" 
      description="How we collect, use, and protect your information"
      category="Resources"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Shield className="h-6 w-6 mr-2 text-primary" />
            Our Commitment to Privacy
          </h2>
          <p>
            At SecureGuardian, privacy is at the core of everything we do. Our products and services 
            are built with privacy by design principles, ensuring that your sensitive information 
            remains protected at all times. This privacy statement outlines how we handle your 
            data with the utmost care and transparency.
          </p>
          <p className="mt-4">
            Last updated: June 1, 2023
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="mb-4">
            We limit data collection to only what is necessary to provide our security services. 
            The types of information we may collect include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Account Information:</strong> Name, email address, and organization details 
              needed to create and manage your SecureGuardian account.
            </li>
            <li>
              <strong>Device Information:</strong> Basic device identifiers required for secure 
              device management and authentication.
            </li>
            <li>
              <strong>Security Metrics:</strong> Anonymized security events and threat detection data 
              to improve our security services.
            </li>
            <li>
              <strong>Usage Information:</strong> Limited analytics on feature usage to improve 
              our products (can be disabled).
            </li>
          </ul>
          <div className="bg-card/30 border border-border rounded-lg p-5 mt-6">
            <h3 className="font-medium mb-2 flex items-center">
              <Lock className="h-5 w-5 mr-2 text-primary" />
              Important Privacy Note
            </h3>
            <p className="text-sm">
              We <strong>never</strong> collect, store, or have access to the content of your 
              encrypted communications, files, or private messages. Our end-to-end encryption 
              ensures that only you and your intended recipients can access your sensitive information.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect solely for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Providing and improving our security services
            </li>
            <li>
              Authenticating users and devices
            </li>
            <li>
              Detecting and preventing security threats
            </li>
            <li>
              Providing technical support and troubleshooting
            </li>
            <li>
              Complying with legal obligations
            </li>
          </ul>
          <p className="mt-4">
            We will never sell your data or use it for advertising purposes. Your information 
            is used exclusively to deliver and improve our security services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Eye className="h-6 w-6 mr-2 text-primary" />
            Data Retention and Deletion
          </h2>
          <p className="mb-4">
            We retain your data only for as long as necessary to provide our services and fulfill 
            the purposes outlined in this privacy statement. Our specific retention practices include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Account Information:</strong> Retained while your account is active and 
              deleted within 30 days of account closure.
            </li>
            <li>
              <strong>Security Logs:</strong> Retained for up to 90 days to support threat detection 
              and security incident investigation.
            </li>
            <li>
              <strong>Usage Analytics:</strong> Anonymized after 30 days and aggregated for 
              service improvement purposes.
            </li>
          </ul>
          <p className="mt-4">
            You have the right to request deletion of your personal information at any time. 
            Upon receiving your request, we will delete your data in accordance with our data 
            deletion protocols and applicable laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">International Data Transfers</h2>
          <p>
            SecureGuardian operates globally, and your data may be processed in countries where 
            we maintain facilities or employ service providers. We implement appropriate safeguards 
            to protect your information when it is transferred internationally, including:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              Standard contractual clauses approved by regulatory authorities
            </li>
            <li>
              Data processing agreements with strict privacy and security requirements
            </li>
            <li>
              Implementation of encryption and access controls
            </li>
            <li>
              Compliance with local data protection regulations
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Privacy Rights</h2>
          <p className="mb-4">
            Depending on your location, you may have various rights regarding your personal 
            information, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              The right to access your personal information
            </li>
            <li>
              The right to correct inaccurate information
            </li>
            <li>
              The right to delete your personal information
            </li>
            <li>
              The right to restrict or object to processing
            </li>
            <li>
              The right to data portability
            </li>
            <li>
              The right to withdraw consent
            </li>
          </ul>
          <p className="mt-4">
            To exercise these rights, please contact our privacy team at privacy@secureguardian.com 
            or through your account settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Statement</h2>
          <p>
            We may update this privacy statement periodically to reflect changes in our practices 
            or for other operational, legal, or regulatory reasons. We will notify you of any 
            material changes through our website or direct communication. We encourage you to 
            review this statement regularly for the latest information on our privacy practices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have questions, concerns, or requests regarding this privacy statement or 
            our privacy practices, please contact our dedicated privacy team:
          </p>
          <div className="bg-card/30 border border-border rounded-lg p-5">
            <p className="mb-1"><strong>Privacy Office:</strong> SecureGuardian, Inc.</p>
            <p className="mb-1"><strong>Email:</strong> privacy@secureguardian.com</p>
            <p className="mb-1"><strong>Address:</strong> 1700 Pennsylvania Avenue, Suite 400, Washington, DC 20006, USA</p>
            <p><strong>Phone:</strong> +1 (202) 555-0155</p>
          </div>
          <p className="mt-6">
            We are committed to addressing your concerns and resolving any privacy-related issues 
            in a timely and effective manner.
          </p>
        </section>
      </div>
    </FooterPageLayout>
  );
};

export default PrivacyStatement;
