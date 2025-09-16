'use client';

import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'use-intl';
import { SiPostman } from 'react-icons/si';
import { useUserStore } from '@/store/userStore';

import s from './Header.module.scss';
import { useEffect, useState } from 'react';
import SignOutButton from '@/components/Auth/SignOutButton';
import NavBar from '../NavBar/NavBar';

const Header = () => {
  const t = useTranslations('auth');

  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const user = useUserStore((state) => state.user);

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
        <div>
          {user ? (
            <SignOutButton />
          ) : (
            <div className="flex gap-4">
              <Link href="/sign-in" locale={locale} className="btn-icon">
                {t('sign-in')}
              </Link>
              <Link href="/sign-up" locale={locale} className="btn-icon">
                {t('sign-up')}
              </Link>
            </div>
          )}
        </div>
      </section>
    </header>
  );
};

export default Header;
