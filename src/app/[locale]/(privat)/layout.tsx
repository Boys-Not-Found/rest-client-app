import NavBar from '@/components/NavBar/NavBar';

type LocaleLayoutProps = {
  children: React.ReactNode;
};

export default function PrivatLayout({ children }: LocaleLayoutProps) {
  return (
    <main className="container">
      <section className="section min-h-screen flex flex-col gap-4">
        <NavBar />
        {children}
      </section>
    </main>
  );
}
