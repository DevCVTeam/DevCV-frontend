'use client';

import { motion } from 'framer-motion';
import { FaBookReader, FaCode, FaLaptopCode, FaRocket } from 'react-icons/fa';

interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  skills: string[];
  icon: JSX.Element;
  resources: {
    title: string;
    link: string;
  }[];
}

const roadmapSteps: RoadmapStep[] = [
  {
    id: 1,
    title: '기초 프로그래밍',
    description: '프로그래밍의 기본 개념과 웹 개발의 기초를 학습합니다.',
    skills: ['HTML', 'CSS', 'JavaScript', 'Git'],
    icon: <FaCode className="w-6 h-6" />,
    resources: [
      { title: 'MDN Web Docs', link: 'https://developer.mozilla.org' },
      { title: 'FreeCodeCamp', link: 'https://www.freecodecamp.org' }
    ]
  },
  {
    id: 2,
    title: '프론트엔드 개발',
    description: '현대적인 프론트엔드 프레임워크와 도구들을 학습합니다.',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    icon: <FaLaptopCode className="w-6 h-6" />,
    resources: [
      { title: 'React 공식 문서', link: 'https://react.dev' },
      { title: 'TypeScript 핸드북', link: 'https://www.typescriptlang.org' }
    ]
  },
  {
    id: 3,
    title: '백엔드 개발',
    description: '서버 사이드 프로그래밍과 데이터베이스를 학습합니다.',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'REST API'],
    icon: <FaBookReader className="w-6 h-6" />,
    resources: [
      { title: 'Node.js 공식 문서', link: 'https://nodejs.org' },
      { title: 'Express 가이드', link: 'https://expressjs.com' }
    ]
  },
  {
    id: 4,
    title: '심화 학습',
    description: '고급 개발 기술과 최신 트렌드를 학습합니다.',
    skills: ['Docker', 'AWS', 'GraphQL', 'Testing'],
    icon: <FaRocket className="w-6 h-6" />,
    resources: [
      { title: 'Docker 문서', link: 'https://docs.docker.com' },
      { title: 'AWS 학습하기', link: 'https://aws.amazon.com/training' }
    ]
  }
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            개발자 로드맵
          </h1>
          <p className="text-lg text-gray-600">
            단계별 학습 가이드와 추천 리소스를 확인하세요
          </p>
        </motion.div>

        <div className="space-y-8">
          {roadmapSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    {step.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {step.title}
                    </h2>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      필요 기술
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {step.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      추천 리소스
                    </h3>
                    <ul className="space-y-2">
                      {step.resources.map((resource) => (
                        <li key={resource.title}>
                          <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2"
                          >
                            <span>→</span>
                            {resource.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
