import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TypeLocale } from '@/types';
import { Link } from '@/i18n/navigation';

type MainPageProps = {
  params: Promise<{ locale: TypeLocale }>;
};

export default async function MainPage({ params }: MainPageProps) {
  const { locale } = await params;

  setRequestLocale(locale);

  const tH = await getTranslations('home');
  const tA = await getTranslations('auth');

  return (
    <>
      <main className="grid min-h-screen place-items-center p-8 font-sans">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold">{tH('hello')}</h1>
          <p className="text-gray-600">{tA('description')}</p>
          <div className="flex justify-center gap-4">
            <Link
              href="/sign-in"
              locale={locale}
              className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
            >
              {tA('sign-in')}
            </Link>
            <Link
              href="/sign-up"
              locale={locale}
              className="rounded-lg border px-4 py-2 hover:bg-gray-100"
            >
              {tA('sign-up')}
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
