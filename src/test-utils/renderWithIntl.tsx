import { NextIntlClientProvider } from 'next-intl';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';

export function renderWithIntl(ui: ReactNode, locale: string = 'en') {
  const messages = {
    navbar: {
      history: 'History',
      variables: 'Variables',
      rest_client: 'Rest Client',
    },
    home: {
      welcome: 'Welcome, ',
      hello: 'Welcome to REST Client App',
      about: 'About the Project',
    },
    vars: {
      title: 'Variables',
      clear: 'Clear all variables',
    },
  };
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
}
