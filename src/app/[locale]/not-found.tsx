import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');
  return (
    <main className="h-screen flex flex-col gap-4 justify-center items-center bg-black text-orange-500">
      <h2>{t('title')}</h2>

      <p>{t('description')}</p>

      <Link href="/" className="btn inverted">
        {t('button')}
      </Link>
    </main>
  );
}
