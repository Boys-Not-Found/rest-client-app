'use client';
import { useEffect, useState } from 'react';
import { HeroUIProvider } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/me', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : { user: null }))
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, [setUser]);

  if (loading) {
    return <div>Loading user...</div>;
  }

  return <HeroUIProvider navigate={(href) => router.push(String(href))}>{children}</HeroUIProvider>;
}
