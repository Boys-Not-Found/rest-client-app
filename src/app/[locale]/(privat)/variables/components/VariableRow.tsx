'use client';
import { useTranslations } from 'next-intl';

export default function VariablesList() {
  const t = useTranslations('vars');

  return (
    <>
      <h1>{t('title')}</h1>
    </>
  );
}
