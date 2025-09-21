'use client';

import MainPrivatPage from '@/components/main/MainPrivatPage/MainPrivatPage';
import MainPublicPage from '@/components/main/MainPublicPage/MainPublicPage';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/useAuth';
import { Link } from '@/i18n/navigation';

export default function MainPage() {
  const { user } = useAuth();
  const t = useTranslations('home');
  const authors = [
    { name: '@madii09', url: 'https://www.linkedin.com/in/madina-mamatmuradova-b62725257/9' },
    { name: '@dzichonka', url: 'https://www.linkedin.com/in/anna-vasilevich-frontend/' },
    { name: '@elena-v-volkova', url: 'https://github.com/elena-v-volkova' },
  ];

  return (
    <>
      <main className="container min-h-[85vh] justify-center">
        {user ? (
          <>
            <MainPrivatPage />
          </>
        ) : (
          <MainPublicPage />
        )}
        <article className="section">
          <h2 className="text-2xl font-bold text-center">{t('about')}</h2>
          <p className="mt-4 text-center">{t('description')}</p>
          <p className="mt-4 text-center font-semibold">{t('stack')}</p>
          <h2 className="text-2xl font-bold text-center my-6">{t('we')}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {authors.map((author) => (
              <Link
                target="_blank"
                key={author.url}
                href={author.url}
                className="btn-icon text-orange-500 text-2xl"
              >
                {author.name}
              </Link>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}
