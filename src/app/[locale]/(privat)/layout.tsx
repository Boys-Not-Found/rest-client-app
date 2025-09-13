import NavBar from '@/components/NavBar/NavBar';

type LocaleLayoutProps = {
  children: React.ReactNode;
};

export default function PrivatLayout({ children }: LocaleLayoutProps) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
