'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const footerLinks = {
  product: [
    { name: '템플릿', href: '/templates' },
    { name: '이력서 작성', href: '/builder' },
    { name: '가격 안내', href: '/pricing' },
    { name: '기업 서비스', href: '/enterprise' }
  ],
  company: [
    { name: '회사 소개', href: '/about' },
    { name: '채용', href: '/careers' },
    { name: '블로그', href: '/blog' },
    { name: '보도자료', href: '/press' }
  ],
  support: [
    { name: '고객센터', href: '/help' },
    { name: '이용가이드', href: '/guide' },
    { name: '자주 묻는 질문', href: '/faq' },
    { name: '문의하기', href: '/contact' }
  ],
  legal: [
    { name: '이용약관', href: '/terms' },
    { name: '개인정보처리방침', href: '/privacy' }
  ],
  social: [
    {
      name: 'Twitter',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      )
    },
    {
      name: 'GitHub',
      href: 'http://github.com/devCVTeam',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      )
    }
  ]
};

export default function Footer() {
  return (
    <footer className="bg-slate-100" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 pb-6 pt-10 sm:px-6 sm:pb-8 sm:pt-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-4 sm:space-y-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="DevCV Logo"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">
                DevCV
              </span>
            </Link>
            <p className="text-sm leading-6 text-gray-600">
              DevCV와 함께라면 몇 분 만에 멋진 이력서를 만들 수 있습니다.
              전문가급 이력서로 여러분의 커리어를 한 단계 발전시켜보세요.
            </p>
            <div className="flex space-x-4">
              {footerLinks.social.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="size-5" aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-6">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  서비스
                </h3>
                <ul role="list" className="mt-4 space-y-2 sm:mt-6">
                  {footerLinks.product.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 transition-colors hover:text-main"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  회사
                </h3>
                <ul role="list" className="mt-4 space-y-2 sm:mt-6">
                  {footerLinks.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 transition-colors hover:text-main"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-6">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  고객지원
                </h3>
                <ul role="list" className="mt-4 space-y-2 sm:mt-6">
                  {footerLinks.support.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 transition-colors hover:text-main"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  법적 고지
                </h3>
                <ul role="list" className="mt-4 space-y-2 sm:mt-6">
                  {footerLinks.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 transition-colors hover:text-main"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-900/10 pt-4 sm:mt-8 sm:pt-6">
          <p className="text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} DevCV. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
