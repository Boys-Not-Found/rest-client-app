'use client';

import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';

const NavBar = () => {
  const t = useTranslations('navbar');

  const locale = useLocale();

  return (
    <nav className="flex gap-4 justify-center">
      <Link className="btn-icon" href="/history" locale={locale}>
        {t('history')}
      </Link>
      <Link className="btn-icon" href="/variables" locale={locale}>
        {t('variables')}
      </Link>
      <Link className="btn-icon" href="/rest-client" locale={locale}>
        {t('rest-client')}
      </Link>
    </nav>
  );
};

export default NavBar;
