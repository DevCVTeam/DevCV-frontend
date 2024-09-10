import { NextLayout, NextProvider } from '@/components/Provider';
import { pretendard } from '@/utils/fonts';
import { cn } from '@/utils/style';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DevCV',
  description: '개발자의 이력서를 공유하며 성장하세요',
  icons: {
    icon: '/logo.png'
  },
  metadataBase: new URL('http://devcv.net'),
  alternates: {
    canonical: '/'
  },
  keywords: ['Devcv', '개발자', '이력서', '취업', '취뽀', '네카라쿠배'],
  openGraph: {
    title: 'devcv로 이력서 공유하기',
    description: 'devcv로 취뽀하세요',
    url: 'https://devcv.net',
    siteName: 'DevCV',
    locale: 'ko_KR',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  },
  appleWebApp: true,
  applicationName: 'DevCV',
  authors: {
    name: 'DevCV Team',
    url: 'http://github.com/DevCVTeam'
  },
  creator: 'DevCV Team',
  category: '이력서'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={cn(
          'isolate grid place-items-center bg-white text-content ',
          pretendard.variable
        )}
      >
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
