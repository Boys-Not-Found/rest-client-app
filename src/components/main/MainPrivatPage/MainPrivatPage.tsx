import { useTranslations } from 'next-intl';
import { useUserStore } from '@/store/userStore';
import NavBar from '@/components/NavBar/NavBar';

export default function MainPrivatPage() {
  const t = useTranslations('home');

  const user = useUserStore((state) => state.user);
  return (
    <>
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg space-y-6">
        <h1 className="text-2xl font-bold text-center">
          {t('welcome')}
          <span className="text-black">{user?.displayName || 'user'}</span>
        </h1>
        <NavBar />
      </div>
    </>
  );
}
