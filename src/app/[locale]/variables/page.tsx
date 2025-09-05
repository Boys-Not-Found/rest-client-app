import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TypeLocale } from '@/types';

type VariablesPageProps = {
  params: Promise<{ locale: TypeLocale }>;
};

export default async function VariablesPage({ params }: VariablesPageProps) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations('home');

  return (
    <>
      <h1>{t('hello')} Variables Page</h1>
    </>
  );
}
