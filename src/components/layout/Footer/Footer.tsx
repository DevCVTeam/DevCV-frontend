'use client';

import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const footerLinks = {
  product: [
    { name: '채용 정보', href: '/jobs', icon: '🎯' },
    { name: '기술 블로그', href: '/tech-blog', icon: '📝' },
    { name: '개발자 로드맵', href: '/roadmap', icon: '🗺️' }
  ],
  company: [
    { name: '회사 소개', href: '/about', target: '_self', icon: '🏢' },
    {
      name: '팀 블로그',
      href: 'https://toris-dev.tistory.com',
      target: '_blank',
      icon: '✍️'
    },
    { name: '채용 공고', href: '/careers', target: '_self', icon: '💼' }
  ],
  support: [
    { name: '이용가이드', href: '/guide', icon: '📖' },
    { name: '개발자 인터뷰', href: '/interviews', icon: '🎤' },
    { name: '문의하기', href: '/contact', icon: '💌' }
  ],
  legal: [
    { name: '이용약관', href: '/terms', icon: '📜' },
    { name: '개인정보처리방침', href: '/privacy', icon: '🔒' },
    { name: '오픈소스 라이선스', href: '/licenses', icon: '⚖️' }
  ],
  social: [
    {
      name: 'GitHub',
      href: 'https://github.com/devCVTeam',
      icon: FaGithub,
      target: '_blank'
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: FaLinkedin,
      target: '_blank'
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: FaTwitter,
      target: '_blank'
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

const sparkleVariants = {
  initial: { scale: 0, rotate: 0 },
  animate: {
    scale: [0, 1, 0.8, 1],
    rotate: [0, 45, -35, 0],
    transition: { duration: 0.5 }
  }
};

export default function Footer() {
  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      controls.start('animate');
    }, 3000);

    return () => clearInterval(interval);
  }, [controls]);

  return (
    <motion.footer
      className="relative bg-gradient-to-b from-gray-50 to-gray-100 rounded-t-3xl overflow-hidden z-10"
      aria-labelledby="footer-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-blue-50 via-green-50 to-transparent rounded-full blur-3xl opacity-30 animate-pulse" />
        <motion.div
          className="absolute top-12 right-12"
          variants={sparkleVariants}
          initial="initial"
          animate={controls}
        >
          <HiSparkles className="text-yellow-400 size-8 animate-pulse" />
        </motion.div>
      </div>

      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <motion.div className="space-y-6" variants={itemVariants}>
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
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent bg-size-200 animate-gradient">
                  DevCV
                </span>
              </motion.div>
            </Link>
            <p className="text-sm leading-6 text-gray-600 max-w-md">
              DevCV와 함께라면 몇 분 만에 멋진 이력서를 만들 수 있습니다.
              전문가급 이력서로 여러분의 커리어를 한 단계 발전시켜보세요.
            </p>
            <div className="flex space-x-4">
              {footerLinks.social.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  target={item.target}
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="size-5" aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <div className="mt-8 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <motion.div variants={itemVariants}>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  서비스
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.product.map((item) => (
                    <motion.li
                      key={item.name}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Link
                        href={item.href}
                        className="group flex items-center space-x-2 text-sm leading-6 text-gray-600 hover:text-gray-900"
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.icon}
                        </span>
                        <span className="relative">
                          {item.name}
                          <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gray-900 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div className="mt-10 md:mt-0" variants={itemVariants}>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  회사
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.company.map((item) => (
                    <motion.li
                      key={item.name}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Link
                        href={item.href}
                        target={item.target}
                        className="group flex items-center space-x-2 text-sm leading-6 text-gray-600 hover:text-gray-900"
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.icon}
                        </span>
                        <span className="relative">
                          {item.name}
                          <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gray-900 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <motion.div variants={itemVariants}>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  고객지원
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.support.map((item) => (
                    <motion.li
                      key={item.name}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Link
                        href={item.href}
                        className="group flex items-center space-x-2 text-sm leading-6 text-gray-600 hover:text-gray-900"
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.icon}
                        </span>
                        <span className="relative">
                          {item.name}
                          <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gray-900 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div className="mt-10 md:mt-0" variants={itemVariants}>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  법적 고지
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.legal.map((item) => (
                    <motion.li
                      key={item.name}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Link
                        href={item.href}
                        className="group flex items-center space-x-2 text-sm leading-6 text-gray-600 hover:text-gray-900"
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.icon}
                        </span>
                        <span className="relative">
                          {item.name}
                          <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gray-900 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-900/10">
          <p className="text-xs leading-5 text-gray-500 text-center">
            &copy; {new Date().getFullYear()} DevCV. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
