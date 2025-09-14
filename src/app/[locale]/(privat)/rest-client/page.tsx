import { TypeLocale } from '@/types';
import { setRequestLocale } from 'next-intl/server';
import RestClient from './RestClient';

type RestClientPageProps = {
  params: { locale: TypeLocale };
};

export default async function RestClientPage({ params }: RestClientPageProps) {
  const { locale } = params;

  setRequestLocale(locale);

  return (
    <>
      <RestClient />
    </>
  );
}
