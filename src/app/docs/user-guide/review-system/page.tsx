'use client';

import { motion } from 'framer-motion';
import { FaCheck, FaComments, FaEdit, FaSearch } from 'react-icons/fa';

const reviewProcess = [
  {
    id: 1,
    title: '리뷰어 찾기',
    description: '전문 분야와 경력을 기반으로 적합한 리뷰어를 찾습니다.',
    icon: FaSearch,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 2,
    title: '리뷰 요청',
    description: '선택한 리뷰어에게 이력서 검토를 요청합니다.',
    icon: FaComments,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 3,
    title: '피드백 받기',
    description: '리뷰어로부터 상세한 피드백과 개선 제안을 받습니다.',
    icon: FaEdit,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 4,
    title: '이력서 개선',
    description: '받은 피드백을 바탕으로 이력서를 수정하고 개선합니다.',
    icon: FaCheck,
    color: 'bg-yellow-100 text-yellow-600'
  }
];

const feedbackCategories = [
  {
    title: '전문성',
    items: [
      '기술 스택의 적절성',
      '프로젝트 성과의 구체성',
      '업무 경험의 전문성'
    ]
  },
  {
    title: '가독성',
    items: ['문장의 명확성', '구조의 일관성', '핵심 내용의 강조']
  },
  {
    title: '완성도',
    items: ['맞춤법 및 문법', '포맷팅 및 레이아웃', '전체적인 구성']
  }
];

export default function ReviewSystemGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center text-4xl font-bold text-gray-900"
      >
        리뷰 시스템 이용 가이드
      </motion.h1>

      <div className="mb-16">
        <h2 className="mb-8 text-2xl font-semibold text-gray-900">
          리뷰 프로세스
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {reviewProcess.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-start space-x-4 rounded-lg bg-white p-6 shadow-md"
            >
              <div
                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${step.color}`}
              >
                <step.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="rounded-lg bg-gray-50 p-8"
      >
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">
          피드백 카테고리
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {feedbackCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.2 }}
              className="rounded-lg bg-white p-6 shadow-md"
            >
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item} className="flex items-center text-gray-600">
                    <span className="mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
