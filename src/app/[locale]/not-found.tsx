import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');
  return (
    <main className="container">
      <section className="section h-screen flex flex-col justify-center items-center gap-5">
        {' '}
        <h2>{t('title')}</h2>
        <p>{t('description')}</p>
        <Link href="/" className="btn inverted">
          {t('button')}
        </Link>
      </section>
    </main>
  );
}
