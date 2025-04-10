'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const faqCategories = [
  {
    title: '일반',
    questions: [
      {
        question: 'DevCV는 어떤 서비스인가요?',
        answer:
          'DevCV는 개발자들을 위한 이력서 공유 플랫폼입니다. 현업 개발자들의 실제 이력서를 참고하고, 전문가의 리뷰를 받을 수 있습니다.'
      },
      {
        question: '서비스 이용은 무료인가요?',
        answer:
          '기본적인 이력서 작성과 공유는 무료입니다. 전문가 리뷰 등 일부 프리미엄 기능은 유료로 제공됩니다.'
      },
      {
        question: '비공개로 이력서를 작성할 수 있나요?',
        answer:
          '네, 이력서 작성 시 공개 범위를 설정할 수 있습니다. 비공개, 링크 공유, 전체 공개 중 선택 가능합니다.'
      }
    ]
  },
  {
    title: '이력서 작성',
    questions: [
      {
        question: '어떤 템플릿을 사용할 수 있나요?',
        answer:
          '다양한 직무와 경력 수준에 맞는 템플릿을 제공합니다. 프론트엔드, 백엔드, DevOps 등 직무별 맞춤 템플릿이 준비되어 있습니다.'
      },
      {
        question: '이력서를 여러 버전으로 관리할 수 있나요?',
        answer:
          '네, 하나의 계정으로 여러 버전의 이력서를 작성하고 관리할 수 있습니다. 각 버전은 독립적으로 공개 설정이 가능합니다.'
      },
      {
        question: '이력서에 프로젝트를 어떻게 추가하나요?',
        answer:
          '이력서 작성 시 프로젝트 섹션에서 프로젝트를 추가할 수 있습니다. GitHub 저장소를 연동하면 자동으로 프로젝트 정보를 가져올 수 있습니다.'
      }
    ]
  },
  {
    title: '리뷰 시스템',
    questions: [
      {
        question: '누가 이력서를 리뷰하나요?',
        answer:
          '검증된 현업 개발자들이 리뷰어로 활동합니다. 리뷰어는 경력과 전문 분야를 바탕으로 선별됩니다.'
      },
      {
        question: '리뷰는 얼마나 걸리나요?',
        answer:
          '일반적으로 리뷰 요청 후 48시간 이내에 피드백을 받을 수 있습니다. 리뷰어의 상황에 따라 다소 지연될 수 있습니다.'
      },
      {
        question: '리뷰 피드백은 어떤 내용을 포함하나요?',
        answer:
          '이력서의 구성, 내용의 명확성, 기술 스택의 적절성, 프로젝트 설명 등에 대한 구체적인 피드백이 제공됩니다.'
      }
    ]
  },
  {
    title: '계정 관리',
    questions: [
      {
        question: '계정을 어떻게 삭제하나요?',
        answer:
          '설정 > 계정 관리에서 계정 삭제를 진행할 수 있습니다. 계정 삭제 시 모든 이력서와 데이터가 영구적으로 삭제됩니다.'
      },
      {
        question: '비밀번호를 잊어버렸어요.',
        answer:
          '로그인 페이지에서 "비밀번호 찾기"를 클릭하여 이메일 인증을 통해 비밀번호를 재설정할 수 있습니다.'
      },
      {
        question: '소셜 로그인을 연동할 수 있나요?',
        answer:
          '네, GitHub, Google 계정을 연동하여 로그인할 수 있습니다. 계정 설정에서 언제든지 연동을 추가하거나 해제할 수 있습니다.'
      }
    ]
  },
  {
    title: '기술적 문제',
    questions: [
      {
        question: '지원하는 브라우저는 무엇인가요?',
        answer:
          '최신 버전의 Chrome, Firefox, Safari, Edge를 지원합니다. 원활한 사용을 위해 브라우저를 최신 버전으로 유지해주세요.'
      },
      {
        question: '이력서 작성 중 내용이 사라졌어요.',
        answer:
          '작성 중인 내용은 자동으로 저장됩니다. 설정 > 임시 저장 항목에서 복구할 수 있습니다.'
      },
      {
        question: '첨부 파일 용량 제한이 있나요?',
        answer:
          '이력서에 첨부하는 이미지는 파일당 5MB, 포트폴리오 문서는 파일당 20MB로 제한됩니다.'
      }
    ]
  }
];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState('일반');
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);

  const toggleQuestion = (question: string) => {
    setOpenQuestions((prev) =>
      prev.includes(question)
        ? prev.filter((q) => q !== question)
        : [...prev, question]
    );
  };

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
            자주 묻는 질문
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-3xl text-lg text-gray-600"
          >
            DevCV 사용 중 궁금한 점을 확인해보세요. 더 자세한 내용은 사용자
            가이드를 참고해주세요.
          </motion.p>
        </div>

        {/* FAQ 카테고리 탭 */}
        <div className="mb-8 flex space-x-4 overflow-x-auto">
          {faqCategories.map((category) => (
            <button
              key={category.title}
              onClick={() => setActiveCategory(category.title)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 font-medium ${
                activeCategory === category.title
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* FAQ 아코디언 */}
        <div className="space-y-4">
          {faqCategories
            .find((category) => category.title === activeCategory)
            ?.questions.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
              >
                <button
                  onClick={() => toggleQuestion(faq.question)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <FaChevronDown
                    className={`size-5 text-gray-400 transition-transform ${
                      openQuestions.includes(faq.question) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openQuestions.includes(faq.question) && (
                  <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
        </div>

        {/* 추가 도움말 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 rounded-xl bg-blue-50 p-6 text-center"
        >
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            원하는 답변을 찾지 못하셨나요?
          </h2>
          <div className="flex justify-center space-x-4">
            <a
              href="https://github.com/DevCVTeam/DevCV-frontend/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-white px-6 py-3 text-gray-600 transition-colors hover:bg-gray-50"
            >
              GitHub 이슈 등록
            </a>
            <a
              href="https://discord.gg/AhcUF2zB"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-white px-6 py-3 text-gray-600 transition-colors hover:bg-gray-50"
            >
              Discord 문의하기
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
