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
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* 헤더 섹션 */}
        <div className="mb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl"
          >
            DevCV 시작하기
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-3xl text-lg text-gray-600"
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
          className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
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
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
            기술 스택
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {techStack.map((stack) => (
              <div
                key={stack.category}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  {stack.category}
                </h3>
                <ul className="space-y-2">
                  {stack.items.map((item) => (
                    <li key={item} className="flex items-center text-gray-600">
                      <span className="mr-2 size-1.5 rounded-full bg-blue-500" />
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
          className="mb-16 rounded-xl bg-blue-50 p-8"
        >
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            프로젝트 시작하기
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                프론트엔드
              </h3>
              <div className="rounded-lg bg-gray-900 p-4 font-mono text-sm text-white">
                <p>git clone https://github.com/DevCVTeam/DevCV-frontend.git</p>
                <p>cd DevCV-frontend</p>
                <p>npm install</p>
                <p>npm run dev</p>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-bold text-gray-900">백엔드</h3>
              <div className="rounded-lg bg-gray-900 p-4 font-mono text-sm text-white">
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
          <h2 className="mb-6 text-2xl font-bold text-gray-900">다음 단계</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Link
              href="/docs/user-guide"
              className="rounded-lg border border-gray-100 bg-white p-4 transition-colors hover:bg-gray-50"
            >
              사용자 가이드 보기
            </Link>
            <Link
              href="/docs/contributing"
              className="rounded-lg border border-gray-100 bg-white p-4 transition-colors hover:bg-gray-50"
            >
              프로젝트에 기여하기
            </Link>
            <Link
              href="/docs/api"
              className="rounded-lg border border-gray-100 bg-white p-4 transition-colors hover:bg-gray-50"
            >
              API 문서 확인하기
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
