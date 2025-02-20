'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
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
    <div className="box-border max-h-screen min-h-screen w-full scroll-smooth">
      <div className="px-16 flex flex-1 flex-col sm:px-24 md:px-32 lg:px-40 xl:px-48">
        <Header />
        <main className="mt-20 flex flex-1 flex-col ">{children}</main>
        <ToasterContext />
        <Footer />
      </div>
    </div>
  );
};
