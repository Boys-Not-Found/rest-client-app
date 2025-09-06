import { useTranslations } from 'next-intl';

import SignOutButton from '@/components/Auth/SignOutButton';
import { useUserStore } from '@/store/userStore';

export default function MainPrivatPage() {
  const t = useTranslations('home');

  const user = useUserStore((state) => state.user);

  return (
    <>
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg space-y-6">
        <h1 className="text-2xl font-bold text-center">
          {t('welcome')}
          <span className="text-black">{user?.email || 'user'}</span>
        </h1>

        <div className="flex justify-center">
          <SignOutButton />
        </div>
      </div>
    </>
  );
}
