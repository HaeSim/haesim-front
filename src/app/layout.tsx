import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import { Header } from '@/app/_component/layout/Header';
import { Navigation } from '@/app/_component/layout/Navigation';

const geistSans = localFont({
  src: '../assets/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../assets/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: '기술 블로그',
  description: 'Next.js로 만든 기술 블로그',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <Header />
        <Navigation />
        {children}
        <footer className='border-t mt-8'>
          <div className='container mx-auto px-4 py-6 text-center text-muted-foreground'>
            <p>&copy; 2024 기술 블로그. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
