'use client';
import { useEffect, useState } from 'react';
import { HeroUIProvider } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import { AuthContext } from '@/context/AuthContext';
import Loader from '@/components/Loader/Loader';

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);
  const [loading, setLoading] = useState(true);
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    fetch('/api/me', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user ?? null);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, [setUser]);

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  return (
    <AuthContext.Provider value={{ loading, user }}>
      <HeroUIProvider navigate={(href) => router.push(String(href))}>{children}</HeroUIProvider>
    </AuthContext.Provider>
  );
}
