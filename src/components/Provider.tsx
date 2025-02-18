'use client';

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import Script from 'next/script';
import { Suspense } from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import { FullPageLoader } from './Loader';
import ToasterContext from './ToasterContext';

interface Props {
  children?: React.ReactNode;
}

interface Props {
  children?: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

export const NextProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Suspense fallback={<FullPageLoader />}>{children}</Suspense>
      </SessionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export const NextLayout = ({ children }: Props) => {
  return (
    <div className="box-border max-h-screen min-h-screen w-full">
      <div className="px-4 flex flex-1 flex-col sm:px-8 md:px-16 lg:px-32 xl:px-32">
        <Head>
          <Script src="https://cdn.iamport.kr/v1/iamport.js" />
          {/* Google Analytics */}
          {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
          )}

          {/* Google Tag Manager */}
          {process.env.NEXT_PUBLIC_GOOGLE_TAG && (
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG} />
          )}

          {/* Google AdSense */}
          {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID && (
            <Script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}`}
              crossOrigin="anonymous"
            ></Script>
          )}
        </Head>

        <Header />
        <main className="mt-20 flex flex-1 flex-col ">{children}</main>
        <ToasterContext />
        <Footer />
      </div>
    </div>
  );
};
