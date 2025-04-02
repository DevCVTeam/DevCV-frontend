'use client';

import { motion } from 'framer-motion';
import { FaGlobe, FaServer } from 'react-icons/fa';

const roadmaps = [
  {
    id: 1,
    title: '프론트엔드 개발자',
    icon: FaGlobe,
    description: '웹 브라우저에서 실행되는 사용자 인터페이스를 개발합니다.',
    steps: [
      {
        title: '기초',
        items: ['HTML', 'CSS', 'JavaScript'],
        description: '웹 개발의 기본이 되는 기술들을 학습합니다.'
      },
      {
        title: '프레임워크',
        items: ['React', 'Vue.js', 'Angular'],
        description:
          '현대적인 웹 애플리케이션 개발을 위한 프레임워크를 배웁니다.'
      },
      {
        title: '고급',
        items: ['TypeScript', 'Next.js', 'Testing'],
        description: '타입 안정성과 서버 사이드 렌더링을 학습합니다.'
      }
    ]
  },
  {
    id: 2,
    title: '백엔드 개발자',
    icon: FaServer,
    description: '서버 측 로직과 데이터베이스를 다루는 개발을 합니다.',
    steps: [
      {
        title: '기초',
        items: ['Node.js', 'Python', 'Java'],
        description: '서버 사이드 프로그래밍 언어를 학습합니다.'
      },
      {
        title: '데이터베이스',
        items: ['MySQL', 'MongoDB', 'PostgreSQL'],
        description: '다양한 데이터베이스 시스템을 학습합니다.'
      },
      {
        title: '고급',
        items: ['Docker', 'Kubernetes', 'AWS'],
        description: '컨테이너화와 클라우드 서비스를 학습합니다.'
      }
    ]
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

const stepVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function RoadmapClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            개발자 로드맵
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            단계별 학습 가이드를 통해 원하는 개발자로 성장할 수 있습니다. 각
            경로는 실무에서 검증된 기술 스택으로 구성되어 있습니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {roadmaps.map((roadmap) => (
            <motion.div
              key={roadmap.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <roadmap.icon className="text-blue-600 text-2xl" />
                </div>
                <h2 className="ml-4 text-2xl font-semibold text-gray-900">
                  {roadmap.title}
                </h2>
              </div>

              <p className="text-gray-600 mb-6">{roadmap.description}</p>

              <div className="space-y-6">
                {roadmap.steps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    variants={stepVariants}
                    className="relative pl-6 border-l-2 border-blue-200"
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-200" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{step.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
              >
                로드맵 자세히 보기
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
