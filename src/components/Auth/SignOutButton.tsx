'use client';

import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useUserStore } from '@/store/userStore';

export default function SignOutButton() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('auth');

  const setUser = useUserStore((state) => state.setUser);

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    router.replace('/', { locale: locale });
  };

  return (
    <button
      onClick={handleSignOut}
      className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
    >
      {t('sign-out')}
    </button>
  );
}
