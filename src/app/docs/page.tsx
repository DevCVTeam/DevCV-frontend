'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaBook, FaCode, FaGithub, FaQuestion, FaRocket } from 'react-icons/fa';

const documentationSections = [
  {
    id: 'getting-started',
    title: '시작하기',
    description: 'DevCV 프로젝트 소개와 설치 방법을 안내합니다.',
    icon: <FaRocket className="size-6" />,
    href: '/docs/getting-started',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'user-guide',
    title: '사용자 가이드',
    description: '이력서 작성, 공유, 리뷰 등 주요 기능 사용법을 설명합니다.',
    icon: <FaBook className="size-6" />,
    href: '/docs/user-guide',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'contributing',
    title: '기여 가이드',
    description: '프로젝트 기여 방법과 개발 가이드라인을 제공합니다.',
    icon: <FaCode className="size-6" />,
    href: '/docs/contributing',
    color: 'from-purple-500 to-purple-600'
  },

  {
    id: 'faq',
    title: '자주 묻는 질문',
    description: '일반적인 질문과 문제 해결 방법을 안내합니다.',
    icon: <FaQuestion className="size-6" />,
    href: '/docs/faq',
    color: 'from-red-500 to-red-600'
  }
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* 헤더 섹션 */}
        <div className="mb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl"
          >
            DevCV 문서
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-3xl text-lg text-gray-600"
          >
            개발자 이력서 공유 플랫폼 DevCV의 공식 문서입니다. 사용 방법부터
            개발 가이드까지 필요한 모든 정보를 찾아보세요.
          </motion.p>
        </div>

        {/* GitHub 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16 flex justify-center"
        >
          <a
            href="https://github.com/devCVTeam"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 text-white transition-colors hover:bg-gray-800"
          >
            <FaGithub className="mr-2 size-5" />
            GitHub 저장소 방문하기
          </a>
        </motion.div>

        {/* 문서 섹션 그리드 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {documentationSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 3) }}
            >
              <Link href={section.href}>
                <div className="h-full rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div
                    className={`inline-flex size-12 items-center justify-center rounded-lg bg-gradient-to-br ${section.color} mb-4 text-white`}
                  >
                    {section.icon}
                  </div>
                  <h2 className="mb-2 text-xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                  <p className="text-gray-600">{section.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 빠른 링크 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 rounded-xl bg-blue-50 p-6"
        >
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            주요 기능 바로가기
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/docs/user-guide/resume-creation"
              className="rounded-lg bg-white p-4 transition-colors hover:bg-gray-50"
            >
              이력서 작성하기
            </Link>
            <Link
              href="/docs/user-guide/resume-sharing"
              className="rounded-lg bg-white p-4 transition-colors hover:bg-gray-50"
            >
              이력서 공유하기
            </Link>
            <Link
              href="/docs/user-guide/review-system"
              className="rounded-lg bg-white p-4 transition-colors hover:bg-gray-50"
            >
              리뷰 시스템 이용하기
            </Link>
            <Link
              href="/templates"
              className="rounded-lg bg-white p-4 transition-colors hover:bg-gray-50"
            >
              템플릿 활용하기
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
