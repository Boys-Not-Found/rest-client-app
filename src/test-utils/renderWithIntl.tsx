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
    NotFoundPage: {
      title: 'Page not found',
      description: 'Could not find requested resource',
      button: 'Return Home',
    },
    error: {
      default: 'Something went wrong',
      button: 'Try again',
    },
    auth: {
      sign_out: 'Sign Out',
    },
    history: {
      title: 'History',
    },
    client: {
      title: 'Rest Client',
      send: 'Send',
      add: 'Add',
    },
  };
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
}
