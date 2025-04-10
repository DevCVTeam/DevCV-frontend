'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    id: 1,
    title: '기본 정보 입력',
    description: '이름, 연락처, 자기소개 등 기본적인 정보를 입력합니다.',
    icon: '👤'
  },
  {
    id: 2,
    title: '경력 사항 작성',
    description: '회사명, 직책, 주요 업무 및 성과를 작성합니다.',
    icon: '💼'
  },
  {
    id: 3,
    title: '기술 스택 추가',
    description: '보유한 기술 스택과 숙련도를 선택합니다.',
    icon: '💻'
  },
  {
    id: 4,
    title: '프로젝트 경험',
    description: '주요 프로젝트 경험과 성과를 작성합니다.',
    icon: '🚀'
  },
  {
    id: 5,
    title: '최종 검토',
    description: '작성된 이력서를 검토하고 필요한 부분을 수정합니다.',
    icon: '✅'
  }
];

export default function ResumeCreationGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center text-4xl font-bold text-gray-900"
      >
        이력서 작성 가이드
      </motion.h1>

      <div className="mb-12 space-y-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative flex items-start space-x-6"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-2xl">
              {step.icon}
            </div>
            <div className="grow">
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="absolute left-6 top-12 h-16 w-[2px] bg-blue-100" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="rounded-lg bg-blue-50 p-6">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">
          이력서 작성 팁
        </h2>
        <ul className="ml-6 list-disc space-y-2 text-gray-600">
          <li>성과 중심의 문장으로 작성하세요.</li>
          <li>구체적인 수치를 포함하면 더욱 설득력 있습니다.</li>
          <li>최신 경험부터 시간 순으로 작성하세요.</li>
          <li>맞춤법과 문법을 꼭 확인하세요.</li>
          <li>PDF 형식으로 저장하여 형식이 깨지지 않도록 하세요.</li>
        </ul>
      </div>
    </div>
  );
}
