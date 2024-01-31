import type { AppProps } from 'next/app';
import { NextPage } from 'next';
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

import 'nprogress/nprogress.css';

const metadata = {
  title: `${SEO_TITLE.Default}`,
  description: '',
  image: '',
};

const queryClient = new QueryClient();

type CustomAppProps = AppProps & {
  Component: NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
    params?: PageProps;
  };
};

function App({ Component, pageProps }: CustomAppProps) {
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
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <TopProgressBar />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
