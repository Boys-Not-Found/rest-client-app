'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import SignOutButton from '@/components/Auth/SignOutButton';
import Loader from '@/components/Loader/Loader';
import { useTranslations } from 'next-intl';

export default function DashboardPage() {
  const t = useTranslations('home');
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        router.replace('/sign-in');
      } else {
        setUser(firebaseUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg space-y-6">
        <h1 className="text-2xl font-bold text-center">
          {t('welcome')}
          <span className="text-black">{user.email}</span>
        </h1>

        <div className="flex justify-center">
          <SignOutButton />
        </div>
      </div>
    </main>
  );
}
