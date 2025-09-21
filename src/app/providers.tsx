'use client';

import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { AuthContext } from '@/context/AuthContext';
import Loader from '@/components/Loader/Loader';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import toast from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  const setUser = useUserStore((s) => s.setUser);
  const [loading, setLoading] = useState(true);
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/me', { credentials: 'include' });
        const data = await res.json();

        if (!data.authenticated) {
          await signOut(auth);
          setUser(null);
          await fetch('/api/signout', { method: 'POST', credentials: 'include' });
        }
      } catch {
        toast.error('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUser]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return <AuthContext.Provider value={{ loading, user }}>{children}</AuthContext.Provider>;
}
