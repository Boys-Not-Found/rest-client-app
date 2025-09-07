import { useTranslations } from 'next-intl';

export default function MainPublicPage() {
  const tH = useTranslations('home');

  return (
    <>
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold">{tH('hello')}</h1>
      </div>
    </>
  );
}
