'use client';

import { auth } from '@/lib/firebase/client';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { useUserStore } from '@/store/userStore';

type Status = 'loading' | 'success' | 'fail';

export default function VerifiedPage() {
  const router = useRouter();
  const locale = useLocale();
  const setUser = useUserStore((state) => state.setUser);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload();

        if (user.emailVerified) {
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email?.split('@')[0] || 'User',
          });

          try {
            const idToken = await user.getIdToken(true);
            await fetch('/api/session', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ idToken }),
              credentials: 'include',
            });

            setStatus('success');
            timer = setTimeout(() => router.replace(`/${locale}`), 2000);
          } catch {
            setStatus('fail');
          }
        } else {
          setStatus('fail');
        }
      } else {
        setStatus('fail');
      }
    });

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
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
