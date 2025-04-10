'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  FaBook,
  FaBug,
  FaCode,
  FaComments,
  FaGithub,
  FaLightbulb
} from 'react-icons/fa';
import { HiChevronRight } from 'react-icons/hi';

const contributingGuides = [
  {
    id: 'setup',
    title: '개발 환경 설정',
    icon: <FaCode className="size-6" />,
    content: [
      {
        title: '필수 요구사항',
        items: [
          'Node.js 18.0.0 이상',
          'npm 9.0.0 이상',
          'Git',
          'VS Code (권장)'
        ]
      },
      {
        title: '프로젝트 설정',
        items: [
          '1. 저장소 Fork: GitHub에서 DevCV 저장소를 Fork합니다.',
          '2. 저장소 Clone: git clone https://github.com/[your-username]/DevCV.git',
          '3. 종속성 설치: npm install',
          '4. 환경 변수 설정: .env.example을 .env.local로 복사하고 필요한 값을 설정',
          '5. 개발 서버 실행: npm run dev'
        ]
      }
    ]
  },
  {
    id: 'guidelines',
    title: '기여 가이드라인',
    icon: <FaBook className="size-6" />,
    content: [
      {
        title: '코드 스타일',
        items: [
          'ESLint와 Prettier 설정을 준수해주세요.',
          '의미 있는 변수명과 함수명을 사용해주세요.',
          '주석은 "왜"에 초점을 맞춰 작성해주세요.',
          '커밋 메시지는 conventional commits 형식을 따라주세요.'
        ]
      },
      {
        title: '브랜치 전략',
        items: [
          'feature/: 새로운 기능 개발',
          'fix/: 버그 수정',
          'docs/: 문서 수정',
          'refactor/: 코드 리팩토링',
          'test/: 테스트 코드 작성'
        ]
      }
    ]
  },
  {
    id: 'workflow',
    title: '작업 프로세스',
    icon: <FaLightbulb className="size-6" />,
    content: [
      {
        title: '기여 절차',
        items: [
          '1. 이슈 생성 또는 확인',
          '2. 새로운 브랜치 생성',
          '3. 코드 작성 및 테스트',
          '4. 변경사항 커밋',
          '5. Pull Request 생성',
          '6. 코드 리뷰 및 수정',
          '7. Merge 및 배포'
        ]
      },
      {
        title: 'Pull Request 체크리스트',
        items: [
          '코드 스타일 준수 여부',
          '테스트 코드 작성 여부',
          '문서 업데이트 필요 여부',
          '불필요한 console.log 제거',
          '성능 영향 검토'
        ]
      }
    ]
  },
  {
    id: 'testing',
    title: '테스트 가이드',
    icon: <FaBug className="size-6" />,
    content: [
      {
        title: '테스트 작성',
        items: [
          '새로운 기능은 반드시 테스트와 함께 작성해주세요.',
          'Jest와 React Testing Library를 사용합니다.',
          '테스트 커버리지는 80% 이상을 유지해주세요.',
          'E2E 테스트는 Cypress를 사용합니다.'
        ]
      },
      {
        title: '테스트 실행',
        items: [
          'npm run test: 단위 테스트 실행',
          'npm run test:watch: 개발 중 테스트',
          'npm run test:coverage: 커버리지 리포트',
          'npm run test:e2e: E2E 테스트 실행'
        ]
      }
    ]
  },
  {
    id: 'community',
    title: '커뮤니티 참여',
    icon: <FaComments className="size-6" />,
    content: [
      {
        title: '의사소통 채널',
        items: [
          'GitHub Discussions: 일반적인 논의',
          'GitHub Issues: 버그 리포트 및 기능 제안',
          'Discord: 실시간 커뮤니케이션',
          'Weekly Meeting: 주간 화상 미팅'
        ]
      },
      {
        title: '행동 강령',
        items: [
          '서로를 존중하고 배려하는 태도를 유지해주세요.',
          '건설적인 피드백을 제공해주세요.',
          '다양성을 존중하고 포용적인 환경을 만들어주세요.',
          '프로젝트의 발전을 위해 협력해주세요.'
        ]
      }
    ]
  }
];

export default function ContributingGuidePage() {
  const [activeSection, setActiveSection] = useState('setup');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* 헤더 섹션 */}
        <div className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl"
          >
            기여 가이드
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-3xl text-lg text-gray-600"
          >
            DevCV의 발전에 기여해주셔서 감사합니다. 이 가이드는 프로젝트 기여를
            위한 상세한 안내를 제공합니다.
          </motion.p>
        </div>

        {/* GitHub 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 flex justify-center"
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

        {/* 메인 콘텐츠 */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* 사이드바 네비게이션 */}
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-8 space-y-1">
              {contributingGuides.map((guide) => (
                <button
                  key={guide.id}
                  onClick={() => setActiveSection(guide.id)}
                  className={`flex w-full items-center rounded-lg px-4 py-3 text-left transition-colors ${
                    activeSection === guide.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-3">{guide.icon}</span>
                  <span className="flex-1 font-medium">{guide.title}</span>
                  <HiChevronRight
                    className={`size-5 transition-transform ${
                      activeSection === guide.id ? 'rotate-90' : ''
                    }`}
                  />
                </button>
              ))}
            </div>
          </motion.nav>

          {/* 콘텐츠 영역 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3"
          >
            {contributingGuides.map(
              (guide) =>
                activeSection === guide.id && (
                  <div
                    key={guide.id}
                    className="rounded-xl bg-white p-6 shadow-sm sm:p-8"
                  >
                    <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-900">
                      {guide.icon}
                      <span className="ml-3">{guide.title}</span>
                    </h2>
                    <div className="space-y-8">
                      {guide.content.map((section, index) => (
                        <div key={index} className="space-y-4">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {section.title}
                          </h3>
                          <ul className="space-y-3">
                            {section.items.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                className="flex items-start text-gray-600"
                              >
                                <span className="mr-2 mt-1.5 size-1.5 shrink-0 rounded-full bg-blue-500" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
