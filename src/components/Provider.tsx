'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import Script from 'next/script';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import Footer from './Footer/Footer';
import Header from './Header/Header';

interface Props {
  children?: React.ReactNode;
}

interface Props {
  children?: React.ReactNode;
}

const queryClient = new QueryClient();

export const NextProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Toaster />
      </SessionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export const NextLayout = ({ children }: Props) => {
  return (
    <div className="box-border max-h-screen min-h-screen w-full">
      <div className="mx-4 flex flex-1 flex-col sm:mx-8 md:mx-16 lg:mx-32 xl:mx-40">
        <Script src="https://cdn.iamport.kr/v1/iamport.js" />
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </div>
    </div>
  );
};
