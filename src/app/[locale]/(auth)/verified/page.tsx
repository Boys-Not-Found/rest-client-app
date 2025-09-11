'use client';

import { auth } from '@/lib/firebase/client';
import { onAuthStateChanged, reload } from 'firebase/auth';
import { useRouter } from '@/i18n/navigation';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { useUserStore } from '@/store/userStore';

export default function VerifiedPage() {
  const router = useRouter();
  const locale = useLocale();
  const setUser = useUserStore((state) => state.setUser);
  const [status, setStatus] = useState<'loading' | 'success' | 'fail'>('loading');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await reload(user);
        if (user.emailVerified) {
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email?.split('@')[0] || 'User',
          });
          setStatus('success');
          setTimeout(() => router.replace('/', { locale }), 2000);
        } else {
          setStatus('fail');
        }
      } else {
        setStatus('fail');
      }
    });

    return () => unsubscribe();
  }, [router, locale, setUser]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="ml-2">Checking verification...</p>
      </div>
    );
  }

  if (status === 'fail') {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-red-500 text-lg font-semibold">
          Verification failed. Please sign in again.
        </p>
        <button
          className="mt-4 px-4 py-2 bg-black text-white rounded"
          onClick={() => router.replace('/auth/sign-in')}
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <p className="text-green-600 text-xl font-bold">🎉 Your email is verified!</p>
      <p className="mt-2 text-gray-600">Redirecting to your page...</p>
    </div>
  );
}
