import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const TermsAndPrivacyDialog = () => {
  const [modalType, setModalType] = useState<'terms' | 'privacy' | null>(null);

  return (
    <>
      {/* Trigger Links */}
      <div className="p-4">
        <Dialog>
          <DialogTrigger asChild>
            <a
              href="#"
              className="text-gray-500 underline cursor-pointer mr-4 text-sm"
              onClick={e => {
                e.preventDefault();
                setModalType('terms');
              }}
            >
              Terms and Conditions
            </a>
          </DialogTrigger>

          <DialogTrigger asChild>
            <a
              href="#"
              className="text-gray-500 underline cursor-pointer text-sm"
              onClick={e => {
                e.preventDefault();
                setModalType('privacy');
              }}
            >
              Privacy Policy
            </a>
          </DialogTrigger>

          {/* Dialog Component */}
          <Dialog open={!!modalType} onOpenChange={() => setModalType(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {modalType === 'terms'
                    ? 'Terms and Conditions'
                    : 'Privacy Policy'}
                </DialogTitle>
                <DialogDescription>
                  {modalType === 'terms'
                    ? 'This action cannot be undone. Please review our terms carefully before proceeding.'
                    : 'Your privacy is important to us. Please read our privacy policy for more details.'}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => setModalType(null)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Dialog>
      </div>
    </>
  );
};

export default TermsAndPrivacyDialog;
