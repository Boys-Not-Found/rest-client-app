'use client';

import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'use-intl';
import { SiPostman } from 'react-icons/si';
//import { useUserStore } from '@/store/useUserStore';

import s from './Header.module.scss';
import { useEffect, useState } from 'react';
import SignOutButton from '@/components/Auth/SignOutButton';
import NavBar from '../NavBar/NavBar';
//import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '@/lib/firebase/client';
const Header = () => {
  const t = useTranslations('auth');

  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  // const user = useUserStore((s) => s.user);
  // const setUser = useUserStore((s) => s.setUser);

  const user = auth.currentUser;

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'ru' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <header className={scrolled ? `${s.header} ${s.scrolled}` : s.header}>
      <section className={s.container}>
        <Link href="/" locale={locale} className="btn-icon text-5xl text-orange-500">
          <SiPostman />
        </Link>
        {user && <NavBar />}
        <button onClick={toggleLocale} className="btn-icon">
          {locale === 'en' ? 'RU' : 'EN'}
        </button>
        <div className="flex gap-4">
          {user ? (
            <>
              <Link href="/" locale={locale} className="btn-icon">
                {t('main')}
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link href="/sign-in" locale={locale} className="btn-icon">
                {t('sign-in')}
              </Link>
              <Link href="/sign-up" locale={locale} className="btn-icon">
                {t('sign-up')}
              </Link>
            </>
          )}
        </div>
      </section>
    </header>
  );
};

export default Header;
function setUser(arg0: { uid: string; email: string | null; displayName: string }) {
  throw new Error('Function not implemented.');
}
