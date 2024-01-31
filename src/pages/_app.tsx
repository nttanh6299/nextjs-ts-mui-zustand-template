import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ReactElement, ReactNode, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, useMediaQuery, Theme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { SEO_TITLE } from '@/config/seo';
import TopProgressBar from '@/components/TopProgressBar';
import CustomHead from '@/components/CustomHead';
import { PageProps } from '@/types/page';
import BaseLayout from '@/layout/BaseLayout';
import { createTheme } from '@/styles/theme';
import createEmotionCache from '@/utils/createEmotionCache';
import 'nprogress/nprogress.css';

const metadata = {
  title: `${SEO_TITLE.Default}`,
  description: '',
  image: '',
};

const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();

type CustomAppProps = AppProps & {
  emotionCache?: EmotionCache;
  Component: NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
    params?: PageProps;
  };
};

function App({ Component, pageProps, emotionCache = clientSideEmotionCache }: CustomAppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme: Theme = useMemo(
    () => createTheme(prefersDarkMode ? 'dark' : 'light'),
    [prefersDarkMode],
  );

  const getLayout =
    Component.getLayout ?? ((page) => <BaseLayout {...Component.params}>{page}</BaseLayout>);

  return (
    <>
      <CustomHead {...metadata} />
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <TopProgressBar />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </CacheProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
