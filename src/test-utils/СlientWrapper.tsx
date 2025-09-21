export const ClientWrapper = ({ children }: { children: React.ReactNode }) => (
  <>
    <header data-testid="header">Header</header>
    {children}
    <footer data-testid="footer">Footer</footer>
  </>
);
