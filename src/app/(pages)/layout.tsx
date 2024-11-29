import type { Metadata } from 'next';
import { Inter as FontSans, Noto_Sans_KR } from 'next/font/google';
import '@/styles/globals.css';
import '@/styles/prosemirror.css';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { Header } from '@/app/_component/layout/Header';
import { Navigation } from '@/app/_component/layout/Navigation';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  preload: true,
  display: 'swap',
  variable: '--font-notoSansKR',
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});

export const metadata: Metadata = {
  title: '혜심 블로그',
  description: '철진난만 블로그',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          notoSansKR.variable
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <Navigation />
          {children}
          <Toaster />
        </ThemeProvider>
        <footer className='border-t mt-8'>
          <div className='container mx-auto px-4 py-6 text-center text-muted-foreground'>
            <p>&copy; 2024 혜심 블로그. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
