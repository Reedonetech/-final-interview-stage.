'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '@/lib/validation';
import { FormInput } from '@/components/FormInput';
import { Button } from '@/components/Button';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore, useContactStore } from '@/lib/store';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const ContactPage = () => {
  const { user } = useAuthStore();
  const { addSubmission, hasSubmitted } = useContactStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: user?.email || '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      return response.json();
    },
    onSuccess: (data) => {
      addSubmission(data.data);
      reset();
    },
  });

  if (hasSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Thank You!
          </h2>
          <p className="mt-2 text-gray-600">
            Your message has been submitted successfully.
          </p>
          <div className="mt-6">
            <Button
              onClick={() => window.location.reload()}
              variant="secondary"
            >
              Submit Another Message
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Contact Us
          </h2>
          <form
            className="space-y-4"
            onSubmit={handleSubmit((data) => mutation.mutate(data))}
          >
            <FormInput
              label="Full Name"
              id="fullName"
              error={errors.fullName}
              {...register('fullName')}
            />

            <FormInput
              label="Email"
              id="email"
              type="email"
              error={errors.email}
              {...register('email')}
              disabled
            />

            <FormInput
              label="Phone Number"
              id="phoneNumber"
              type="tel"
              error={errors.phoneNumber}
              helperText="At least 10 digits"
              {...register('phoneNumber')}
            />

            <FormInput
              label="Subject"
              id="subject"
              error={errors.subject}
              {...register('subject')}
            />

            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.message
                    ? 'border-red-300 text-red-900 placeholder-red-300'
                    : 'border-gray-300'
                }`}
                {...register('message')}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              isLoading={mutation.isPending}
              className="w-full"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ContactPage;