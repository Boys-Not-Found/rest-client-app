'use client';

import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';

export default function SignOutButton() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('auth');

  const handleSignOut = async () => {
    await signOut(auth);
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
