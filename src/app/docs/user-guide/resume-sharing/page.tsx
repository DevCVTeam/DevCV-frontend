'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaShareAlt } from 'react-icons/fa';

const sharingSteps = [
  {
    id: 1,
    title: '공개 범위 설정',
    description:
      '이력서를 전체 공개, 특정 사용자에게만 공개, 또는 비공개로 설정할 수 있습니다.',
    image: '/images/sharing-settings.png'
  },
  {
    id: 2,
    title: '공유 링크 생성',
    description:
      '고유한 공유 링크를 생성하여 원하는 사람과 이력서를 공유할 수 있습니다.',
    image: '/images/share-link.png'
  },
  {
    id: 3,
    title: '버전 관리',
    description:
      '이력서의 여러 버전을 관리하고 필요한 버전을 선택하여 공유할 수 있습니다.',
    image: '/images/version-control.png'
  }
];

export default function ResumeSharingGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center text-4xl font-bold text-gray-900"
      >
        이력서 공유하기
      </motion.h1>

      <div className="mb-12">
        <motion.div
          className="mx-auto flex size-48 items-center justify-center rounded-full bg-blue-50"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <FaShareAlt className="size-24 text-blue-500" />
        </motion.div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {sharingSteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="overflow-hidden rounded-lg bg-white p-6 shadow-md"
          >
            <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              {step.title}
            </h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 rounded-lg bg-blue-50 p-6"
      >
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">
          공유 시 주의사항
        </h2>
        <ul className="ml-6 list-disc space-y-2 text-gray-600">
          <li>개인정보 노출에 주의하세요.</li>
          <li>공개 범위를 신중하게 설정하세요.</li>
          <li>최신 버전의 이력서를 공유하고 있는지 확인하세요.</li>
          <li>공유 링크는 필요한 경우 언제든 비활성화할 수 있습니다.</li>
        </ul>
      </motion.div>
    </div>
  );
}
