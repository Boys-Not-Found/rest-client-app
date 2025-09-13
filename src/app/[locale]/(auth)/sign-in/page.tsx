'use client';

import { useRouter } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { auth, googleProvider } from '@/lib/firebase/client';
import { useUserStore } from '@/store/userStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { FirebaseError } from 'firebase/app';
import {
  reload,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
type FormData = z.infer<typeof schema>;

export default function SignInPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const locale = useLocale();

  const setUser = useUserStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ email, password }: FormData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await reload(user);

      if (user.emailVerified) {
        toast.success(t('success'));
        setUser({ uid: user.uid, email: user.email });
        document.cookie = 'isAuth=true; path=/; max-age=3600; SameSite=Lax';
        router.replace('/', { locale });
      } else {
        toast.error(t('verify'));
        await auth.signOut();
      }
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case 'auth/invalid-email':
            toast.error(t('invalid-email'));
            break;
          case 'auth/user-not-found':
            toast.error(t('user-not-found'));
            break;
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
            toast.error(t('wrong-password'));
            break;
          case 'auth/too-many-requests':
            toast.error(t('too-many-requests'));
            break;
          default:
            toast.error(t('fail'));
        }
      } else {
        toast.error(t('fail'));
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success(t('google success'));
      router.replace('/dashboard');
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        toast.error(err.message);
      } else {
        toast.error(t('google fail'));
      }
    }
  };

  const handleForgotPassword = async () => {
    const email = watch('email');
    if (!email) {
      toast.error(t('enter-email-first'));
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success(t('reset-email-sent'));
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        toast.error(err.message);
      } else {
        toast.error(t('fail'));
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md">
        <h1 className="mb-6 text-2xl text-center font-semibold">{t('sign-in')}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <p
            onClick={handleForgotPassword}
            className="cursor-pointer text-sm text-blue-600 hover:underline"
          >
            {t('forgot-password')}
          </p>

          <button
            disabled={isSubmitting}
            className="w-full rounded-xl bg-black p-3 text-white disabled:opacity-60 hover:bg-gray-800 transition-colors cursor-pointer"
          >
            {isSubmitting ? t('loading') : t('sign-in')}
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 p-3 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <FcGoogle className="text-xl" />
            <span>{t('google')}</span>
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          {t('no-account')}{' '}
          <Link href="/sign-up" locale={locale} className="underline text-black">
            {t('create-one')}
          </Link>
        </p>
      </div>
    </main>
  );
}
