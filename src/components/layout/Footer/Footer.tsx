'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const footerLinks = {
  product: [
    { name: '채용 정보', href: '/jobs' },
    { name: '기술 블로그', href: '/tech-blog' },
    { name: '개발자 로드맵', href: '/roadmap' }
  ],
  company: [
    { name: '회사 소개', href: '/about' },
    { name: '팀 블로그', href: 'https://toris-dev.tistory.com' },
    { name: '채용 공고', href: '/careers' }
  ],
  support: [
    { name: '이용가이드', href: '/guide' },
    { name: '개발자 인터뷰', href: '/interviews' },
    { name: '문의하기', href: '/contact' }
  ],
  legal: [
    { name: '이용약관', href: '/terms' },
    { name: '개인정보처리방침', href: '/privacy' },
    { name: '오픈소스 라이선스', href: '/licenses' }
  ],
  social: [
    {
      name: 'GitHub',
      href: 'https://github.com/devCVTeam',
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

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

export default function Footer() {
  return (
    <motion.footer
      className="relative bg-gradient-to-b from-gray-50 to-gray-200 rounded-3xl overflow-hidden z-10"
      aria-labelledby="footer-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-gray-100 to-transparent rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-gray-200 to-transparent rounded-full blur-3xl opacity-50" />
      </div>

      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 sm:pb-10 sm:pt-20 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <motion.div
            className="space-y-4 sm:space-y-6"
            variants={itemVariants}
          >
            <Link href="/" className="group flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
              >
                <Image
                  src="/logo.png"
                  alt="DevCV Logo"
                  width={40}
                  height={40}
                  className="h-8 w-auto transition-transform duration-300 group-hover:rotate-12"
                />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  DevCV
                </span>
              </motion.div>
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
                  className="text-gray-500 transition-colors hover:text-gray-900"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="size-5" aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-6">
              <motion.div variants={itemVariants}>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  서비스
                </h3>
                <ul role="list" className="mt-4 space-y-2 sm:mt-6">
                  {footerLinks.product.map((item) => (
                    <motion.li
                      key={item.name}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 transition-colors hover:text-gray-900 relative group"
                      >
                        {item.name}
                        <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gray-900 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div className="mt-6 md:mt-0" variants={itemVariants}>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  회사
                </h3>
                <ul role="list" className="mt-4 space-y-2 sm:mt-6">
                  {footerLinks.company.map((item) => (
                    <motion.li
                      key={item.name}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 transition-colors hover:text-gray-900 relative group"
                      >
                        {item.name}
                        <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gray-900 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-6">
              <motion.div variants={itemVariants}>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  고객지원
                </h3>
                <ul role="list" className="mt-4 space-y-2 sm:mt-6">
                  {footerLinks.support.map((item) => (
                    <motion.li
                      key={item.name}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 transition-colors hover:text-gray-900 relative group"
                      >
                        {item.name}
                        <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gray-900 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div className="mt-6 md:mt-0" variants={itemVariants}>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  법적 고지
                </h3>
                <ul role="list" className="mt-4 space-y-2 sm:mt-6">
                  {footerLinks.legal.map((item) => (
                    <motion.li
                      key={item.name}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 transition-colors hover:text-gray-900 relative group"
                      >
                        {item.name}
                        <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gray-900 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
        <motion.div className="mt-8 pt-6" variants={itemVariants}>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          <p className="mt-4 text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} DevCV. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
