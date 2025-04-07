'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaBook,
  FaCode,
  FaGithub,
  FaLightbulb,
  FaQuestion,
  FaRocket
} from 'react-icons/fa';

const documentationSections = [
  {
    id: 'getting-started',
    title: '시작하기',
    description: 'DevCV 프로젝트 소개와 설치 방법을 안내합니다.',
    icon: <FaRocket className="w-6 h-6" />,
    href: '/docs/getting-started',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'user-guide',
    title: '사용자 가이드',
    description: '이력서 작성, 공유, 리뷰 등 주요 기능 사용법을 설명합니다.',
    icon: <FaBook className="w-6 h-6" />,
    href: '/docs/user-guide',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'contributing',
    title: '기여 가이드',
    description: '프로젝트 기여 방법과 개발 가이드라인을 제공합니다.',
    icon: <FaCode className="w-6 h-6" />,
    href: '/docs/contributing',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'api',
    title: 'API 문서',
    description: 'DevCV API의 엔드포인트와 사용 방법을 설명합니다.',
    icon: <FaLightbulb className="w-6 h-6" />,
    href: '/docs/api',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    id: 'faq',
    title: '자주 묻는 질문',
    description: '일반적인 질문과 문제 해결 방법을 안내합니다.',
    icon: <FaQuestion className="w-6 h-6" />,
    href: '/docs/faq',
    color: 'from-red-500 to-red-600'
  }
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* 헤더 섹션 */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
          >
            DevCV 문서
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
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
          className="flex justify-center mb-16"
        >
          <a
            href="https://github.com/devCVTeam"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors"
          >
            <FaGithub className="w-5 h-5 mr-2" />
            GitHub 저장소 방문하기
          </a>
        </motion.div>

        {/* 문서 섹션 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {documentationSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 3) }}
            >
              <Link href={section.href}>
                <div className="h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${section.color} text-white mb-4`}
                  >
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
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
          className="mt-16 p-6 bg-blue-50 rounded-xl"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            주요 기능 바로가기
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/docs/user-guide/resume-creation"
              className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors"
            >
              이력서 작성하기
            </Link>
            <Link
              href="/docs/user-guide/resume-sharing"
              className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors"
            >
              이력서 공유하기
            </Link>
            <Link
              href="/docs/user-guide/review-system"
              className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors"
            >
              리뷰 시스템 이용하기
            </Link>
            <Link
              href="/docs/user-guide/templates"
              className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors"
            >
              템플릿 활용하기
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
