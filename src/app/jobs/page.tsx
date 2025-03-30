'use client';

import { motion } from 'framer-motion';
import { FaBriefcase, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';

interface Job {
  id: number;
  company: string;
  position: string;
  location: string;
  description: string;
  skills: string[];
}

const sampleJobs: Job[] = [
  {
    id: 1,
    company: '테크스타트',
    position: '시니어 프론트엔드 개발자',
    location: '서울 강남',
    description: 'React와 TypeScript를 활용한 웹 애플리케이션 개발',
    skills: ['React', 'TypeScript', 'Next.js']
  },
  {
    id: 2,
    company: '클라우드테크',
    position: '백엔드 개발자',
    location: '서울 판교',
    description: 'Java Spring을 이용한 백엔드 시스템 개발',
    skills: ['Java', 'Spring', 'MySQL']
  }
  // 더 많은 샘플 데이터 추가 가능
];

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">채용 정보</h1>
          <p className="text-lg text-gray-600">
            최신 개발자 채용 정보를 확인하세요
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sampleJobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {job.position}
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <FaBuilding className="mr-2" />
                    {job.company}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaBriefcase className="mr-2" />
                    {job.description}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  상세 보기
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
