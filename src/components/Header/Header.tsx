'use client';

import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'use-intl';
import Image from 'next/image';
import { useUserStore } from '@/store/userStore';

import s from './Header.module.scss';
import { useEffect, useState } from 'react';
import SignOutButton from '@/components/Auth/SignOutButton';

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
      <Link href="/" locale={locale}>
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={50}
          height={50}
          className="cursor-pointer"
        />
      </Link>
      <div>
        {user ? (
          <SignOutButton />
        ) : (
          <div className="flex gap-4">
            <Link
              href="/sign-in"
              locale={locale}
              className="rounded-lg border px-4 py-2 hover:bg-gray-100"
            >
              {t('sign-in')}
            </Link>
            <Link
              href="/sign-up"
              locale={locale}
              className="rounded-lg border px-4 py-2 hover:bg-gray-100"
            >
              {t('sign-up')}
            </Link>
          </div>
        )}
      </div>
      <button onClick={toggleLocale} className="rounded-lg border px-4 py-2 hover:bg-gray-100">
        {locale === 'en' ? 'RU' : 'EN'}
      </button>
    </header>
  );
};

export default Header;
