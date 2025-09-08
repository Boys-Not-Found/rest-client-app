import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TypeLocale } from '@/types';

type RestClientPageProps = {
  params: Promise<{ locale: TypeLocale }>;
};

export default async function RestClientPage({ params }: RestClientPageProps) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations('home');

  return (
    <>
      <h1>{t('hello')} RestClientPage Page</h1>
    </>
  );
}
