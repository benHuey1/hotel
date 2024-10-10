import {getMessages, getTranslations} from 'next-intl/server';
import clsx from 'clsx';
import { NextIntlClientProvider } from 'next-intl';
import { fontSans } from '@/config/fonts';
import {ReactNode} from 'react';

export function generateStaticParams() {
  return [{locale: 'fr'}, {locale: 'en'}, {locale: 'es'}];
}

export default async function RootLayout({
  children,
  params: {locale}
}: {
  children: ReactNode;
  params: {locale: string};
}) {
  let messages;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}`, error);
    messages = {}; // Fallback to empty messages
  }

  return (
    <html lang={locale}>
      <body className={clsx('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}