import type { Metadata } from 'next';

import './globals.css';

import { Sarabun } from 'next/font/google';

import AppProvider from './provider';

const sarabun = Sarabun({
  display: 'swap',
  fallback: ['system-ui'],
  preload: true,
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext', 'thai', 'vietnamese'],
  variable: '--font-sarabun',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  description: 'Mcot',
  title: 'Mcot',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={sarabun.variable} suppressHydrationWarning>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
