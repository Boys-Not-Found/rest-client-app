'use client';

import { useRouter } from '@/i18n/navigation';
import { auth } from '@/lib/firebase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const schema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Enter a valid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/\p{L}/u, 'Password must include a letter')
      .regex(/\p{N}/u, 'Password must include a number')
      .regex(/[^\p{L}\p{N}\s]/u, 'Password must include a special character'),
    confirmPassword: z.string().min(8, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

export default function SignUpPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const locale = useLocale();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ name, email, password }: FormData) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      await sendEmailVerification(userCredential.user, {
        url: `${window.location.origin}/${locale}/verified`,
      });
      toast.success(t('verify-email'));

      router.replace({ pathname: '/sign-in' }, { locale });
    } catch (err) {
      if (err instanceof FirebaseError) {
        toast.error(err.message);
      } else {
        toast.error(t('fail'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md">
        <h1 className="mb-6 text-2xl text-center font-semibold">{t('sign-up')}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder={t('name')}
              className="w-full rounded-xl border border-gray-300 p-3 focus:border-black focus:ring-1 focus:ring-black outline-none"
              {...register('name')}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder={t('email')}
              className="w-full rounded-xl border border-gray-300 p-3 focus:border-black focus:ring-1 focus:ring-black outline-none"
              {...register('email')}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder={t('password')}
              className="w-full rounded-xl border border-gray-300 p-3 focus:border-black focus:ring-1 focus:ring-black outline-none"
              {...register('password')}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder={t('confirm-password')}
              className="w-full rounded-xl border border-gray-300 p-3 focus:border-black focus:ring-1 focus:ring-black outline-none"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-black p-3 text-white hover:bg-gray-800 transition-colors disabled:opacity-60 cursor-pointer"
          >
            {loading ? t('loading') : t('sign-up')}
          </button>
        </form>
      </div>
    </main>
  );
}
