import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import { Link } from '@nextui-org/link';
import clsx from 'clsx';

import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';
import { Navbar } from '@/components/navbar';

import { Providers } from './providers';
import { Suspense } from 'react';
import Loading from '@/components/ui/loading';
import { RoomSkeleton } from '@/components/ui/rooms-skeleton';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          {/* <div className="relative flex h-screen flex-col"> */}
          <div className="relative flex h-full w-full flex-col">
            <Navbar />
            {/* <main className="container mx-auto max-w-7xl flex-grow px-6 pt-16">{children}</main> */}
            <Suspense
              fallback={
                // <p>Loading Page...</p>
                // <Loading />
                <RoomSkeleton />
              }
            >
              <main className="mx-auto w-full flex-grow">{children}</main>
            </Suspense>
            <footer className="flex w-full items-center justify-center py-3">
              {/* <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                title="nextui.org homepage"
              >
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">NextUI</p>
              </Link> */}
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
