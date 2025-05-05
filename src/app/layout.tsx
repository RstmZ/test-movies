import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Image from 'next/image';

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
        className={`${geistSans.variable} ${geistMono.variable} font-heading- antialiased text-white`}
      >
        {children}
      </body>
    </html>
  );
}
