import { NextLayout, NextProvider } from '@/lib/Provider';
import { pretendard } from '@/utils/fonts';
import { cn } from '@/utils/style';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://devcv.net'),
  title: {
    default: 'DevCV - 개발자 이력서 플랫폼',
    template: '%s | DevCV'
  },
  description:
    '개발자를 위한 이력서 작성 플랫폼. 이력서 판매 및 맞춤형 템플릿을 제공합니다.',
  icons: {
    icon: '/logo.png'
  },
  alternates: {
    canonical: '/'
  },
  keywords: ['개발자', '이력서', '채용', '커리어', '포트폴리오', 'DevCV'],
  authors: [{ name: 'DevCV Team' }],
  creator: 'DevCV',
  publisher: 'DevCV',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  openGraph: {
    title: 'DevCV - 개발자 이력서 플랫폼',
    description:
      '개발자를 위한 이력서 작성 플랫폼. 이력서 판매 및 맞춤형 템플릿을 제공합니다.',
    url: 'https://devcv.net',
    siteName: 'DevCV',
    images: [
      {
        url: '/logo.png',
        width: 170,
        height: 130,
        alt: 'DevCV - 개발자 이력서 플랫폼'
      }
    ],
    locale: 'ko_KR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevCV - 개발자 이력서 플랫폼',
    description:
      '개발자를 위한 이력서 작성 플랫폼. 이력서 판매 및 맞춤형 템플릿을 제공합니다.',
    images: ['/logo.png']
  },
  appleWebApp: true,
  applicationName: 'DevCV',
  category: '이력서',
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION
  }
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
          'relative flex min-h-screen flex-col bg-white text-content',
          pretendard.variable
        )}
      >
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>

        <Script
          src="https://cdn.iamport.kr/v1/iamport.js"
          async
          strategy="lazyOnload"
        />
        {/* Google Analytics */}
        {process.env.GOOGLE_ANALYTICS && (
          <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS} />
        )}

        {/* Google Tag Manager */}
        {process.env.GOOGLE_TAG && (
          <GoogleTagManager gtmId={process.env.GOOGLE_TAG} />
        )}

        {/* Google AdSense */}
        {process.env.GOOGLE_ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.GOOGLE_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}
