'use client';

import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';
import { FullPageLoader } from '@/components/Loader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { Suspense } from 'react';
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
    <div className="box-border max-h-screen min-h-screen w-full scroll-smooth">
      <div className="container mx-auto flex min-h-screen flex-col px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
        <Header />
        <main className="mt-20 flex flex-1 flex-col">{children}</main>
        <ToasterContext />
        <Footer />
      </div>
    </div>
  );
};
