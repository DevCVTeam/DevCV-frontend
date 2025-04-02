'use client';

import { motion } from 'framer-motion';
import {
  FaClock,
  FaGraduationCap,
  FaHeart,
  FaLaptop,
  FaMapMarkerAlt
} from 'react-icons/fa';

const positions = [
  {
    id: 1,
    title: '시니어 프론트엔드 개발자',
    team: '프론트엔드팀',
    type: '정규직',
    location: '서울 강남구',
    requirements: [
      'React, TypeScript 숙련자',
      '5년 이상의 웹 개발 경험',
      '반응형 웹 디자인 경험',
      'Next.js 사용 경험'
    ],
    responsibilities: [
      '이력서 작성 플랫폼 프론트엔드 개발',
      '사용자 경험 최적화',
      '프론트엔드 아키텍처 설계',
      '주니어 개발자 멘토링'
    ]
  },
  {
    id: 2,
    title: '백엔드 개발자',
    team: '백엔드팀',
    type: '정규직',
    location: '서울 강남구',
    requirements: [
      'Java, Spring Boot 숙련자',
      '3년 이상의 서버 개발 경험',
      'RESTful API 설계 경험',
      'MySQL, MongoDB 사용 경험'
    ],
    responsibilities: [
      'API 서버 개발 및 유지보수',
      '데이터베이스 설계 및 최적화',
      '서비스 성능 모니터링',
      '기술 문서 작성'
    ]
  }
];

const benefits = [
  {
    icon: FaLaptop,
    title: '최신 장비 지원',
    description: '업무에 필요한 최신 장비와 소프트웨어를 제공합니다.'
  },
  {
    icon: FaClock,
    title: '유연근무제',
    description: '자율적인 출퇴근 시간과 재택근무를 지원합니다.'
  },
  {
    icon: FaGraduationCap,
    title: '교육 지원',
    description: '컨퍼런스 참가비와 도서 구매를 지원합니다.'
  },
  {
    icon: FaHeart,
    title: '건강검진',
    description: '연 1회 종합 건강검진을 지원합니다.'
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

export default function CareersClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.section className="py-20 text-center" variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            DevCV와 함께
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-green-400 bg-clip-text text-transparent">
              성장하세요
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            우리는 개발자들의 성장을 돕는 플랫폼을 만들어갑니다.
            <br />
            DevCV와 함께 더 나은 미래를 만들어갈 동료를 찾습니다.
          </p>
        </motion.section>

        {/* Culture Section */}
        <motion.section className="py-16 text-center" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            DevCV의 문화
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Open Positions */}
        <motion.section className="py-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            채용 중인 포지션
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {positions.map((position) => (
              <motion.div
                key={position.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {position.title}
                    </h3>
                    <p className="text-gray-600">{position.team}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {position.type}
                  </span>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{position.location}</span>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    자격 요건
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {position.requirements.map((req) => (
                      <li key={req}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    주요 업무
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {position.responsibilities.map((resp) => (
                      <li key={resp}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                  지원하기
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
