'use client';

import { motion } from 'framer-motion';
import { FaChevronRight } from 'react-icons/fa';

const terms = [
  {
    title: '제1조 (목적)',
    content:
      '이 약관은 DevCV(이하 "회사")가 제공하는 이력서 작성 서비스(이하 "서비스")의 이용조건 및 절차, 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.'
  },
  {
    title: '제2조 (정의)',
    content: `본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
1. "서비스"란 회사가 제공하는 모든 서비스를 의미합니다.
2. "회원"이란 회사와 서비스 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.
3. "아이디(ID)"란 회원의 식별과 회원의 서비스 이용을 위하여 회원이 선정하고 회사가 승인하는 문자와 숫자의 조합을 말합니다.`
  },
  {
    title: '제3조 (약관의 효력 및 변경)',
    content: `1. 본 약관은 서비스를 이용하고자 하는 모든 회원에 대하여 그 효력을 발생합니다.
2. 회사는 약관의 규제에 관한 법률 등 관련법을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.
3. 회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 회사의 서비스 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.`
  },
  {
    title: '제4조 (이용계약의 체결)',
    content: `1. 이용계약은 회원이 되고자 하는 자(이하 "가입신청자")가 약관의 내용에 대하여 동의를 한 다음 회원가입신청을 하고 회사가 이러한 신청에 대하여 승낙함으로써 체결됩니다.
2. 회사는 가입신청자의 신청에 대하여 서비스 이용을 승낙함을 원칙으로 합니다. 다만, 회사는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수 있습니다.`
  },
  {
    title: '제5조 (서비스의 제공 및 변경)',
    content: `1. 회사는 다음과 같은 서비스를 제공합니다.
- 이력서 작성 및 관리 서비스
- 이력서 템플릿 제공 서비스
- 기타 회사가 추가 개발하거나 다른 회사와의 제휴계약 등을 통해 회원에게 제공하는 일체의 서비스
2. 회사는 서비스의 내용 및 제공일자를 회원에게 통지하고 서비스를 변경하여 제공할 수 있습니다.`
  },
  {
    title: '제6조 (서비스 이용요금)',
    content: `1. 회사가 제공하는 서비스는 기본적으로 무료입니다. 단, 별도의 유료 서비스의 경우 해당 서비스에 명시된 요금을 지불하여야 이용할 수 있습니다.
2. 회사는 유료 서비스 이용요금을 회사와 계약한 전자지불업체에서 정한 방법에 의하거나 회사가 정한 청구서에 합산하여 청구할 수 있습니다.`
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

export default function TermsClient() {
  return (
    <div className="min-h-screen bg-white py-12">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.section className="text-center mb-16" variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            이용약관
          </h1>
          <p className="text-xl text-gray-600">최종 수정일: 2024년 3월 15일</p>
        </motion.section>

        {/* Terms Content */}
        <motion.div
          className="max-w-4xl mx-auto space-y-8"
          variants={containerVariants}
        >
          {terms.map((term, index) => (
            <motion.div
              key={term.title}
              variants={itemVariants}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                  {index + 1}
                </div>
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    {term.title}
                  </h2>
                  <div className="text-gray-600 whitespace-pre-line leading-relaxed">
                    {term.content}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Section */}
        <motion.section
          className="mt-16 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              추가 문의사항이 있으신가요?
            </h3>
            <p className="text-gray-600 mb-6">
              이용약관에 대해 궁금한 점이 있다면 언제든 문의해주세요.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              문의하기
              <FaChevronRight className="text-sm" />
            </a>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
