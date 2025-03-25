import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const TermsAndPrivacyDialog = () => {
  const [modalType, setModalType] = useState<'terms' | 'privacy' | null>(null);

  // Terms and Privacy content
  const content = {
    terms: (
      <>
        <strong>Effective Date: March 23, 2025</strong>
        <br />
        <strong>1. Acceptance of Terms</strong> <br />
        By accessing and using Baranggay Dampalit InfoCenter, you agree to
        comply with these Terms & Conditions.
        <br />
        <strong>2. Services Provided</strong>
        <br />
        Our website provides emergency contact numbers, barangay announcements,
        and SMS notifications for registered users.
        <br />
        <strong>3. User Responsibilities</strong>
        <ul>
          <li>
            • You must provide accurate mobile numbers when registering for SMS
            notifications.
          </li>
          <li>
            • You agree not to misuse the website for fraudulent or unlawful
            activities.
          </li>
          <li>
            • Unauthorized access, tampering, or data extraction is strictly
            prohibited.
          </li>
        </ul>
        <strong>4. SMS Notifications</strong>
        <br />
        SMS notifications are provided as a public service and may be subject to
        delays or technical issues. We are not responsible for any damages or
        losses resulting from the failure or inaccuracy of SMS notifications.
        <br />
        <strong>5. Limitation of Liability</strong>
        <br />
        We strive to provide accurate and updated information, but we do not
        guarantee its completeness or accuracy. We are not liable for any loss
        or damage arising from the use of our website.
        <br />
        <strong>6. Changes to Terms & Conditions</strong>
        <br />
        We reserve the right to modify these Terms & Conditions at any time.
        Continued use of the website after changes constitutes acceptance of the
        updated terms.
        <br />
        <strong>7. Contact Information</strong>
        <br />
        For concerns regarding these Terms & Conditions, please contact us at
        [Insert Contact Details].
      </>
    ),
    privacy: (
      <>
        <strong>Effective Date: March 23, 2025</strong>
        <br />
        <strong>1. Introduction</strong>
        <br />
        Baranggay Dampalit InfoCenter ("we," "our," or "us") is committed to
        protecting your privacy. This Privacy Policy outlines how we collect,
        use, and protect your personal information when you access our website.
        <br />
        <strong>2. Information We Collect</strong>
        <ul>
          <li>
            • Personal Information: When you register for SMS notifications, we
            collect your mobile number.
          </li>
          <li>
            • Non-Personal Information: We may collect general usage data, such
            as browser type and pages visited, to improve our website’s
            functionality.
          </li>
        </ul>
        <strong>3. How We Use Your Information</strong>
        <ul>
          <li>
            • To send SMS notifications regarding important barangay
            announcements and emergencies.
          </li>
          <li>• To improve our website and services.</li>
          <li>• To comply with legal obligations.</li>
        </ul>
        <strong>4. Data Protection</strong>
        <br />
        We implement security measures to protect your personal information from
        unauthorized access, alteration, or disclosure.
        <br />
        <strong>5. Sharing of Information</strong>
        <br />
        We do not sell or share your personal information with third parties,
        except when required by law or with your explicit consent.
        <br />
        <strong>6. Your Rights</strong> <br />
        You may request to update or delete your registered mobile number from
        our system by contacting us.
        <br />
        <strong>7. Changes to this Privacy Policy</strong>
        <br /> We may update this Privacy Policy from time to time. Changes will
        be posted on this page with the updated effective date.
        <br />
        <strong>8. Contact Information</strong> <br />
        For inquiries regarding this Privacy Policy, please contact us at
        dampalitinfocenter@gmail.com.
      </>
    ),
  };

  return (
    <div className="p-4 flex justify-around">
      {/* Terms Trigger */}
      <Dialog
        open={modalType === 'terms'}
        onOpenChange={() => setModalType(null)}
      >
        <DialogTrigger asChild>
          <a
            href="#"
            className="text-gray-600 underline cursor-pointer mr-4 text-sm"
            onClick={e => {
              e.preventDefault();
              setModalType('terms');
            }}
          >
            Terms and Conditions
          </a>
        </DialogTrigger>
        <DialogContent className=" !w-[800px] !max-w-4xl ">
          <DialogHeader>
            <DialogTitle>Terms and Conditions</DialogTitle>
          </DialogHeader>
          <div className="p-4 max-h-[400px] overflow-y-auto text-sm whitespace-pre-line text-gray-700 border border-gray-400 rounded-lg">
            {content.terms}
          </div>
          <Button className="mt-4" onClick={() => setModalType(null)}>
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/* Privacy Policy Trigger */}
      <Dialog
        open={modalType === 'privacy'}
        onOpenChange={() => setModalType(null)}
      >
        <DialogTrigger asChild>
          <a
            href="#"
            className="text-gray-600 underline cursor-pointer text-sm"
            onClick={e => {
              e.preventDefault();
              setModalType('privacy');
            }}
          >
            Privacy Policy
          </a>
        </DialogTrigger>
        <DialogContent className=" !w-[800px] !max-w-4xl">
          <DialogHeader>
            <DialogTitle>Privacy Policy</DialogTitle>
          </DialogHeader>
          <div className="p-4 max-h-[400px] overflow-y-auto text-sm whitespace-pre-line text-gray-700 border border-gray-400 rounded-lg">
            {content.privacy}
          </div>
          <Button className="mt-4" onClick={() => setModalType(null)}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TermsAndPrivacyDialog;
