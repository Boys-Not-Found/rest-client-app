import { useTranslations } from 'next-intl';

export default function MainPublicPage() {
  const tH = useTranslations('home');

  return (
    <>
      <section className="section h-screen">
        <h1 className="text-3xl font-bold">{tH('hello')}</h1>
      </section>
    </>
  );
}
