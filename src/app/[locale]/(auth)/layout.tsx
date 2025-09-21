type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="container">
      <section className="section min-h-screen flex flex-col gap-4 items-center justify-center">
        {children}
      </section>
    </main>
  );
}
