'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/lib/validation';
import { FormInput } from '@/components/FormInput';
import { Button } from '@/components/Button';
import { useAuthStore } from '@/lib/store';
import { useMutation } from '@tanstack/react-query';

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      return response.json();
    },
    onSuccess: (data) => {
      login(data);
      router.push('/contact');
    },
    onError: () => {
      setError('root', {
        message: 'Invalid email or password',
      });
    },
  });

  return (
    <div className="flex flex-col justify-center sm:px-6 lg:px-8 w-full py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            onSubmit={handleSubmit((data) => mutation.mutate(data))}
          >
            <FormInput
              label="Email address"
              id="email"
              type="email"
              autoComplete="email"
              error={errors.email}
              {...register('email')}
            />

            <FormInput
              label="Password"
              id="password"
              type="password"
              autoComplete="current-password"
              error={errors.password}
              {...register('password')}
            />

            {errors.root && (
              <p className="text-sm text-red-600">{errors.root.message}</p>
            )}

            <div>
              <Button
                type="submit"
                isLoading={mutation.isPending}
                className="w-full"
              >
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;