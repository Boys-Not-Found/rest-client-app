'use client';

import { useUserStore } from '@/store/userStore';
import MainPrivatPage from '@/components/main/MainPrivatPage/MainPrivatPage';
import MainPublicPage from '@/components/main/MainPublicPage/MainPublicPage';

export default function MainPage() {
  const user = useUserStore((state) => state.user);
  return (
    <>
      <main className="container">
        {user ? (
          <>
            <MainPrivatPage />
          </>
        ) : (
          <MainPublicPage />
        )}
      </main>
    </>
  );
}
