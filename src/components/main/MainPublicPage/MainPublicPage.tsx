import { useTranslations } from 'next-intl';

export default function MainPublicPage() {
  const tH = useTranslations('home');

  return (
    <>
      <section className="section">
        <h1 className="text-3xl font-bold text-orange-500">{tH('hello')}</h1>
      </section>
    </>
  );
}
