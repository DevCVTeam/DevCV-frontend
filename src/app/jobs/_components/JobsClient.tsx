'use client';

import { motion } from 'framer-motion';
import { FaBuilding, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const jobs = [
  {
    id: 1,
    title: '시니어 프론트엔드 개발자',
    company: '테크스타트',
    location: '서울 강남구',
    type: '정규직',
    experience: '5년 이상',
    skills: ['React', 'TypeScript', 'Next.js'],
    description: '최신 웹 기술을 활용한 프론트엔드 개발'
  },
  {
    id: 2,
    title: '백엔드 개발자',
    company: '클라우드테크',
    location: '서울 서초구',
    type: '정규직',
    experience: '3년 이상',
    skills: ['Node.js', 'Python', 'AWS'],
    description: '확장 가능한 백엔드 시스템 설계 및 개발'
  }
  // 더 많은 채용 정보 추가 가능
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

export default function JobsClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">채용 정보</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            DevCV와 함께 성장할 수 있는 기회를 찾아보세요. 우리는 항상 열정적인
            인재를 찾고 있습니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {job.title}
                </h3>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {job.type}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <FaBuilding className="mr-2" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaClock className="mr-2" />
                  <span>{job.experience}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-gray-600 mb-4">{job.description}</p>

              <button className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                지원하기
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
