'use client';

import { motion } from 'framer-motion';
import {
  FaFileAlt,
  FaQuestionCircle,
  FaSearch,
  FaUserEdit
} from 'react-icons/fa';

const guides = [
  {
    id: 1,
    title: '이력서 작성하기',
    icon: FaFileAlt,
    steps: [
      {
        title: '기본 정보 입력',
        description: '이름, 연락처, 이메일 등 기본적인 개인정보를 입력합니다.'
      },
      {
        title: '경력 사항 작성',
        description:
          '회사명, 근무 기간, 주요 업무 등 경력 정보를 상세히 기록합니다.'
      },
      {
        title: '기술 스택 추가',
        description: '보유한 기술과 스킬을 선택하고 숙련도를 표시합니다.'
      }
    ]
  },
  {
    id: 2,
    title: '이력서 공유하기',
    icon: FaUserEdit,
    steps: [
      {
        title: '공개 범위 설정',
        description:
          '이력서를 전체 공개할지, 특정 기업에만 공개할지 선택합니다.'
      },
      {
        title: '링크 생성',
        description: '공유 가능한 링크를 생성하여 원하는 대상과 공유합니다.'
      },
      {
        title: '열람 통계 확인',
        description: '이력서 조회수와 관심 표시 수 등의 통계를 확인합니다.'
      }
    ]
  }
];

const faqs = [
  {
    question: '이력서는 어떻게 작성하나요?',
    answer:
      '상단의 "이력서 작성" 버튼을 클릭하여 시작할 수 있습니다. 기본 템플릿이 제공되며, 각 섹션을 원하는 대로 수정할 수 있습니다.'
  },
  {
    question: '작성한 이력서는 어떻게 공유하나요?',
    answer:
      '이력서 상세 페이지에서 "공유하기" 버튼을 클릭하면 공유 링크가 생성됩니다. 이 링크를 통해 다른 사람과 공유할 수 있습니다.'
  },
  {
    question: '이력서 템플릿을 변경할 수 있나요?',
    answer:
      '네, 다양한 템플릿이 제공됩니다. 이력서 편집 화면에서 "템플릿 변경" 옵션을 통해 원하는 디자인을 선택할 수 있습니다.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function GuideClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.section className="text-center mb-16" variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            이용 가이드
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            DevCV의 모든 기능을 쉽고 편리하게 사용하실 수 있도록
            <br />
            상세한 가이드를 제공해 드립니다.
          </p>
        </motion.section>

        {/* Search Section */}
        <motion.section className="mb-16" variants={itemVariants}>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="궁금한 내용을 검색해보세요"
                className="w-full px-6 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none pr-12"
              />
              <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            </div>
          </div>
        </motion.section>

        {/* Guides Section */}
        <motion.section className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            상세 가이드
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {guides.map((guide) => (
              <motion.div
                key={guide.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <guide.icon className="text-blue-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {guide.title}
                  </h3>
                </div>
                <div className="space-y-4">
                  {guide.steps.map((step, index) => (
                    <div key={step.title} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {step.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section variants={itemVariants}>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            자주 묻는 질문
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <FaQuestionCircle className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
