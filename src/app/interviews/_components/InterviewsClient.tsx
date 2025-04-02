'use client';

import { motion } from 'framer-motion';
import { FaBookmark, FaCode, FaDatabase, FaServer } from 'react-icons/fa';

const categories = [
  {
    id: 1,
    title: '프론트엔드',
    icon: FaCode,
    questions: [
      {
        id: 1,
        question: 'React의 Virtual DOM이란 무엇인가요?',
        answer:
          'Virtual DOM은 실제 DOM의 가벼운 복사본입니다. React는 상태가 변경될 때마다 Virtual DOM을 업데이트하고, 이전 Virtual DOM과 비교하여 실제로 변경이 필요한 부분만 실제 DOM에 적용합니다. 이를 통해 성능을 최적화할 수 있습니다.'
      },
      {
        id: 2,
        question: 'useEffect와 useLayoutEffect의 차이점은 무엇인가요?',
        answer:
          'useEffect는 비동기적으로 실행되며 렌더링이 화면에 반영된 후에 실행됩니다. 반면 useLayoutEffect는 동기적으로 실행되며 DOM이 업데이트되기 전에 실행됩니다. 대부분의 경우 useEffect를 사용하는 것이 좋습니다.'
      }
    ]
  },
  {
    id: 2,
    title: '백엔드',
    icon: FaServer,
    questions: [
      {
        id: 3,
        question: 'RESTful API의 주요 특징은 무엇인가요?',
        answer:
          'RESTful API의 주요 특징은 Stateless(무상태), Client-Server 구조, Cacheable, Uniform Interface, Layered System 등이 있습니다. 각 요청은 독립적이며, 서버는 클라이언트의 상태를 저장하지 않습니다.'
      },
      {
        id: 4,
        question: 'Node.js의 이벤트 루프에 대해 설명해주세요.',
        answer:
          'Node.js의 이벤트 루프는 싱글 스레드 기반으로 비동기 작업을 처리하는 메커니즘입니다. 콜 스택, 콜백 큐, 마이크로태스크 큐 등으로 구성되어 있으며, 비동기 작업을 효율적으로 처리할 수 있게 해줍니다.'
      }
    ]
  },
  {
    id: 3,
    title: '데이터베이스',
    icon: FaDatabase,
    questions: [
      {
        id: 5,
        question: 'SQL과 NoSQL의 차이점은 무엇인가요?',
        answer:
          'SQL 데이터베이스는 정해진 스키마에 따라 데이터를 저장하며, 관계를 통해 데이터를 연결합니다. NoSQL은 스키마가 유연하고, 대량의 데이터를 처리하는데 적합합니다. 선택은 프로젝트의 요구사항에 따라 달라집니다.'
      },
      {
        id: 6,
        question: '인덱스를 사용하는 이유와 주의점은 무엇인가요?',
        answer:
          '인덱스는 데이터 검색 속도를 향상시키기 위해 사용됩니다. 하지만 인덱스는 추가적인 저장공간을 사용하며, 데이터 수정/삭제/추가 시 인덱스도 함께 업데이트해야 하므로 성능에 영향을 줄 수 있습니다.'
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

export default function InterviewsClient() {
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
            기술 면접 가이드
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            실제 면접에서 자주 나오는 질문들과
            <br />
            모범 답안을 제공해드립니다.
          </p>
        </motion.section>

        {/* Categories */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <category.icon className="text-blue-600 text-2xl" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {category.title}
                </h2>
              </div>
              <div className="space-y-4">
                {category.questions.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {item.question}
                        </h3>
                        <p className="text-gray-600 text-sm">{item.answer}</p>
                      </div>
                      <button className="flex-shrink-0 text-gray-400 hover:text-blue-500 transition-colors">
                        <FaBookmark />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.section className="text-center" variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            더 많은 면접 질문이 필요하신가요?
          </h2>
          <p className="text-gray-600 mb-8">
            프리미엄 회원이 되시면 500개 이상의 실제 면접 질문과 답변을 확인하실
            수 있습니다.
          </p>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors">
            프리미엄 가입하기
          </button>
        </motion.section>
      </motion.div>
    </div>
  );
}
