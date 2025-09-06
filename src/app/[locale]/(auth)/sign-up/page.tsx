'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { FirebaseError } from 'firebase/app';
import { useLocale, useTranslations } from 'next-intl';
import { useUserStore } from '@/store/userStore';

export default function SignUpPage() {
  const t = useTranslations('auth');

  const router = useRouter();
  const locale = useLocale();

  const setUser = useUserStore((state) => state.setUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setUser({ uid: 'fakeID', email: email });
      router.replace('/', { locale: locale });
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md space-y-6 bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-center">{t('sign-up')}</h1>
        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="email"
            placeholder={t('email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="password"
            placeholder={t('password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            {t('sign-up')}
          </button>
        </form>
        {error && <p className="text-center text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
