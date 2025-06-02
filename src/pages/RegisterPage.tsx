import { useNavigate } from 'react-router-dom';
import { fetchData } from '@/lib/api';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import TermsAndPrivacyDialog from '@/components/termsAndPrivacyDialog';
import bgImage from '@/assets/registerBG.png';
import brgLogo from '@/assets/brgylogotrns1.png';

const formSchema = z.object({
  firstName: z.string().min(2, 'First Name is required').max(50),
  middleName: z.string().optional(),
  lastName: z.string().min(2, 'Last Name is required').max(50),
  contactNumber: z
    .string()
    .min(9, 'Invalid contact number')
    .max(10, 'Invalid contact number')
    .regex(/^\d+$/, 'Must be a valid number'),
  email: z.string().email('Must be a valid email address'),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      contactNumber: '',
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    setLoading(true);

    let contactNumber = values.contactNumber.replace(/\D/g, '');
    if (contactNumber.length === 9) contactNumber = '639' + contactNumber;

    const response = await fetchData('api/register-sms', 'POST', {
      FirstName: values.firstName,
      MiddleName: values.middleName || null,
      LastName: values.lastName,
      ContactNumber: contactNumber,
      email: values.email,
    });

    console.log('Registration Response:', response);
    showToast('Registration successful!');
    form.reset({
      firstName: '',
      middleName: '',
      lastName: '',
      contactNumber: '',
      email: '',
    });
    setTimeout(() => navigate('/'), 3000);
  } catch (error: any) {
    console.error('Registration Error:', error);

    // Check if error is a validation error from Laravel (status 422)
    if (error.status === 422 && error.data?.errors) {
      // Extract all validation error messages and join them
      const messages = Object.values(error.data.errors)
        .flat()
        .join(' ');

      showToast(messages);
    } else {
      showToast('Failed to register. Please try again.');
    }
  } finally {
    setLoading(false);
  }
}


  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 bg-opacity-50 relative bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="z-10 w-full max-w-4xl px-4 flex flex-1 justify-center">
        <Card className="w-full bg-white/80 shadow-lg rounded-lg max-h-screen md:max-h-[90vh] overflow-y-auto">
          <div className="flex flex-col items-center p-6">
            <img src={brgLogo} alt="Barangay Logo" className="w-24 h-24 mb-4" />
            <h2 className="text-xl md:text-2xl font-semibold text-center text-[#2a2a92]">
              Barangay Dampalit InfoCenter
            </h2>
            <p className="text-gray-500 text-sm mt-2">Register Account</p>
          </div>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['firstName', 'middleName', 'lastName'].map(field => (
                    <FormField
                      key={field}
                      control={form.control}
                      name={field as keyof z.infer<typeof formSchema>}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {field.name === 'firstName'
                              ? 'First Name'
                              : field.name === 'middleName'
                              ? 'Middle Name'
                              : 'Last Name'}
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="bg-white"
                              {...field}
                              placeholder={
                                field.name === 'firstName'
                                  ? 'Enter your first name'
                                  : field.name === 'middleName'
                                  ? 'Enter your middle name (optional)'
                                  : 'Enter your last name'
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contactNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                        <Input
                        className="bg-white"
                        {...field}
                        placeholder="+639XXXXXXXXX"
                        value={`+639${field.value}`}
                        onChange={e => {
                            let inputValue = e.target.value.replace(/\D/g, '');

                            if (!inputValue.startsWith('639')) {
                            inputValue = '639' + inputValue.replace(/^639/, '');
                            }

                            inputValue = inputValue.slice(0, 12);

                            field.onChange(inputValue.slice(3));
                        }}
                        onKeyDown={e => {
                            const cursorAtPrefix = (e.target as HTMLInputElement).selectionStart! <= 4;
                            if (cursorAtPrefix && e.key === "Backspace") {
                            e.preventDefault();
                            }
                        }}
                        />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-white"
                            type="email"
                            {...field}
                            placeholder="example@email.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-center items-center text-center text-muted-foreground p-6">
            <div className="text-sm text-center">
              <p>By clicking continue, you agree to our</p>
              <TermsAndPrivacyDialog />
              <p>.</p>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 bg-white text-[#2a2a92] text-xs px-5 py-3 rounded-md shadow-md transition-opacity duration-300 flex gap-10 pl-0">
          <div className='bg-[#FF6F00] w-1'></div>
          {toastMessage}
        </div>
      )}
    </div>
  );
}
