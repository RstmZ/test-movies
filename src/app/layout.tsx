import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Providers from '@/Providers';

const geistSans = Montserrat({
  variable: '--font-monserrat-sans',
  subsets: ['latin'],
});

const geistMono = Montserrat({
  variable: '--font-monserrat-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Movie list',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-heading- antialiased text-white `}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
