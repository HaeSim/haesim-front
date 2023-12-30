import {
  CacheProvider,
  type EmotionCache,
  ThemeProvider,
} from '@emotion/react';
import {
  Backdrop,
  CircularProgress,
  CssBaseline,
  Typography,
} from '@mui/material';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { type ReactElement, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import ComponentModal from '@/components/_common/ComponentModal';
import MessageModal from '@/components/_common/MessageModal';
import SessionCallback from '@/components/_common/SessionCallback';
import useClientStore from '@/store/client';
import createEmotionCache from '@/styles/createEmotionCache';
import theme from '@/styles/theme';
import type { NextPageWithLayout } from '@/utils/common';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = (props: MyAppProps) => {
  const queryClient = new QueryClient();
  const router = useRouter();
  const { backdropVisible, backdropMessage, openBackdrop, closeBackdrop } =
    useClientStore((state) => state);

  const { emotionCache = clientSideEmotionCache, pageProps } = props;
  const Component = props.Component as NextPageWithLayout;

  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
      vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    return () => {
      window.removeEventListener('resize', () => {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      });
    };
  }, []);

  useEffect(() => {
    let backdropTimer: NodeJS.Timeout;
    const handleRouteChangeStart = () => {
      clearTimeout(backdropTimer);
      closeBackdrop();
      backdropTimer = setTimeout(() => {
        openBackdrop({
          message: '페이지 이동 중입니다. 잠시만 기다려주세요.',
        });
      }, 700);
    };

    const handleRouteChangeComplete = (_url: URL) => {
      clearTimeout(backdropTimer);
      closeBackdrop();
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      clearTimeout(backdropTimer);
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  useEffect(() => {
    const toastQuery = router.query.toast as string;

    if (toastQuery) {
      const { message, type } = JSON.parse(decodeURIComponent(toastQuery)) as {
        message: string;
        type: 'success' | 'error';
      };

      toast[type](message);
      router.replace({ query: {} });
    }
  }, [router.query]);

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
            <ComponentModal />
            <MessageModal />
            <Backdrop
              sx={{
                display: 'flex',
                flexDirection: 'column',
                color: '#fff',
                zIndex: (tm) => tm.zIndex.drawer + 1,
              }}
              open={backdropVisible}
            >
              <CircularProgress color="inherit" />
              <Typography
                variant="h6"
                align="center"
                fontWeight="bold"
                marginTop={2}
              >
                {backdropMessage}
              </Typography>
            </Backdrop>
            <Toaster />
            <SessionCallback />
            <Analytics />
          </ThemeProvider>
        </CacheProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};
export default MyApp;
