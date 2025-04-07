'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    title: '이력서 공유',
    description: '현업 개발자들의 실제 이력서를 공유하고 참고할 수 있습니다.',
    image: '/images/resume-sharing.png'
  },
  {
    title: '전문가 리뷰',
    description: '경험 많은 개발자들에게 이력서 리뷰를 받을 수 있습니다.',
    image: '/images/expert-review.png'
  },
  {
    title: '템플릿 제공',
    description: '다양한 이력서 템플릿을 제공하여 손쉽게 작성할 수 있습니다.',
    image: '/images/resume-templates.png'
  }
];

const techStack = [
  {
    category: '프론트엔드',
    items: [
      'Next.js 14',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'React Query'
    ]
  },
  {
    category: '백엔드',
    items: ['Spring Boot 3', 'Java 17', 'JPA/Hibernate', 'PostgreSQL', 'Redis']
  },
  {
    category: '인프라',
    items: ['AWS', 'Docker', 'GitHub Actions', 'Nginx', 'Vercel']
  }
];

export default function GettingStartedPage() {
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
            DevCV 시작하기
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            DevCV는 개발자들의 이력서 공유 플랫폼입니다. 현업 개발자들의 실제
            이력서를 참고하고, 전문가의 리뷰를 받아보세요.
          </motion.p>
        </div>

        {/* 주요 기능 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </motion.div>

        {/* 기술 스택 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            기술 스택
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {techStack.map((stack) => (
              <div
                key={stack.category}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {stack.category}
                </h3>
                <ul className="space-y-2">
                  {stack.items.map((item) => (
                    <li key={item} className="flex items-center text-gray-600">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 시작하기 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-blue-50 rounded-xl p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            프로젝트 시작하기
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                프론트엔드
              </h3>
              <div className="bg-gray-900 rounded-lg p-4 text-white font-mono text-sm">
                <p>git clone https://github.com/DevCVTeam/DevCV-frontend.git</p>
                <p>cd DevCV-frontend</p>
                <p>npm install</p>
                <p>npm run dev</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">백엔드</h3>
              <div className="bg-gray-900 rounded-lg p-4 text-white font-mono text-sm">
                <p>git clone https://github.com/DevCVTeam/DevCV-backend.git</p>
                <p>cd DevCV-backend</p>
                <p>./gradlew build</p>
                <p>./gradlew bootRun</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 다음 단계 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">다음 단계</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/docs/user-guide"
              className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
            >
              사용자 가이드 보기
            </Link>
            <Link
              href="/docs/contributing"
              className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
            >
              프로젝트에 기여하기
            </Link>
            <Link
              href="/docs/api"
              className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
            >
              API 문서 확인하기
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
