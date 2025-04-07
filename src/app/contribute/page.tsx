'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

export default function ContributePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-3xl font-bold text-gray-900 mb-6"
          >
            프로젝트에 기여하기
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            DevCV는 오픈소스 프로젝트입니다. 여러분의 기여를 환영합니다!
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {/* 코드 기여 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              코드 기여
            </h3>
            <p className="text-gray-600 mb-4">
              버그 수정, 새로운 기능 개발, 성능 개선 등 코드 기여를 통해
              프로젝트를 발전시켜주세요.
            </p>
            <Link
              href="https://github.com/devCVTeam"
              target="_blank"
              className="inline-flex items-center text-blue-600 hover:text-blue-700"
            >
              <FaGithub className="mr-2" />
              GitHub 저장소 방문
            </Link>
          </div>

          {/* 문서화 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">문서화</h3>
            <p className="text-gray-600 mb-4">
              문서 개선, 번역, 예제 추가 등을 통해 더 많은 사용자들이 쉽게
              이용할 수 있도록 도와주세요.
            </p>
            <Link href="/docs" className="text-blue-600 hover:text-blue-700">
              문서 보러가기
            </Link>
          </div>

          {/* 커뮤니티 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              커뮤니티
            </h3>
            <p className="text-gray-600 mb-4">
              이슈 리포팅, 기능 제안, 다른 사용자 돕기 등 커뮤니티 활동에
              참여해주세요.
            </p>
            <Link
              href="https://discord.gg/AhcUF2zB"
              target="_blank"
              className="text-blue-600 hover:text-blue-700"
            >
              커뮤니티 참여하기
            </Link>
          </div>
        </motion.div>

        {/* 기여 가이드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-white p-8 rounded-xl shadow-sm"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            기여 가이드
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>1. GitHub 저장소를 Fork하고 Clone합니다.</p>
            <p>2. 새로운 Branch를 생성합니다.</p>
            <p>3. 변경사항을 Commit하고 Push합니다.</p>
            <p>4. Pull Request를 생성합니다.</p>
            <p>5. 코드 리뷰 후 Merge됩니다.</p>
          </div>
          <div className="mt-8">
            <Link
              href="/docs/contributing"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              자세한 기여 가이드 보기
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
