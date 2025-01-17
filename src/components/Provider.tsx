'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
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
      refetchOnWindowFocus: false // default: true
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
      <div className="mx-4 flex flex-1 flex-col sm:mx-8 md:mx-16 lg:mx-32 xl:mx-32">
        <Script src="https://cdn.iamport.kr/v1/iamport.js" />
        <Header />
        <main className="mt-20 flex flex-1 flex-col ">{children}</main>
        <ToasterContext />
        <Footer />
      </div>
    </div>
  );
};
