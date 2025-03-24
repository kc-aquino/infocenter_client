import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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

export default function RegisterPage() {
  const navigate = useNavigate();
  const formSchema = z.object({
    fullName: z.string().min(2).max(50),
    middleName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    contactNumber: z
      .string()
      .min(11, { message: 'Contact number must be at least 11 digits' })
      .max(11, { message: 'Contact number must be at most 11 digits' }),
    birthdate: z.string().refine(
      date => {
        const parsedDate = Date.parse(date);
        return !isNaN(parsedDate);
      },
      { message: 'Invalid date format' },
    ),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      middleName: '',
      lastName: '',
      contactNumber: '',
      birthdate: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    navigate('/');
    console.log(values);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 bg-opacity-50 relative bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Content Container */}
      <div className="z-10 w-full max-w-4xl px-4 flex flex-1 justify-center">
        <Card className="w-full bg-white/80 shadow-lg rounded-lg max-h-screen md:max-h-[90vh] overflow-y-auto">
          <div className="flex flex-col items-center p-6">
            <img src={brgLogo} alt="Logo" className="w-24 h-24 mb-4" />
            <h2 className="text-xl md:text-2xl font-semibold text-center text-[#FF6F00]">
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
                {/* First Row: Full Name, Middle Name, Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-white"
                            placeholder="Juan"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="middleName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Middle Name</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-white"
                            placeholder="Santos"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-white"
                            placeholder="Dela Cruz"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Second Row: Contact Number, Birthdate */}
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
                            placeholder="09XXXXXXXXX"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="birthdate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Birthdate</FormLabel>
                        <FormControl>
                          <Input type="date" className="bg-white" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Register
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-center items-center text-center text-muted-foreground p-6">
            <p className="text-sm">
              {'By clicking continue, you agree to our '}
              <br />
              <TermsAndPrivacyDialog />
              <br />.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
