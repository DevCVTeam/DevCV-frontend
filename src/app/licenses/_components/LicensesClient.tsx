'use client';

import { motion } from 'framer-motion';
import { FaBook, FaGithub } from 'react-icons/fa';

const licenses = [
  {
    name: 'Next.js',
    version: '14.1.0',
    license: 'MIT',
    description:
      'The React Framework for Production - Next.js gives you the best developer experience with all the features you need for production.',
    repository: 'https://github.com/vercel/next.js'
  },
  {
    name: 'React',
    version: '18.2.0',
    license: 'MIT',
    description:
      'A JavaScript library for building user interfaces. React makes it painless to create interactive UIs.',
    repository: 'https://github.com/facebook/react'
  },
  {
    name: 'Tailwind CSS',
    version: '3.4.1',
    license: 'MIT',
    description:
      'A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.',
    repository: 'https://github.com/tailwindlabs/tailwindcss'
  },
  {
    name: 'Framer Motion',
    version: '11.0.5',
    license: 'MIT',
    description:
      'An open source motion library for React, made by Framer. Power your site with animation and gestures.',
    repository: 'https://github.com/framer/motion'
  },
  {
    name: 'React Icons',
    version: '5.0.1',
    license: 'MIT',
    description:
      'Include popular icons in your React projects easily with react-icons, which utilizes ES6 imports.',
    repository: 'https://github.com/react-icons/react-icons'
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

export default function LicensesClient() {
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
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-6">
            <FaBook className="text-blue-600 text-3xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            오픈소스 라이선스
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            DevCV는 다음과 같은 오픈소스 프로젝트들을 기반으로 구축되었습니다.
            <br />각 프로젝트의 라이선스 정보를 확인하실 수 있습니다.
          </p>
        </motion.section>

        {/* Licenses Grid */}
        <motion.div
          className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {licenses.map((lib) => (
            <motion.div
              key={lib.name}
              variants={itemVariants}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    {lib.name}
                  </h2>
                  <a
                    href={lib.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaGithub className="text-2xl" />
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                    v{lib.version}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                    {lib.license}
                  </span>
                </div>
                <p className="text-gray-600">{lib.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* YouTube Video Section */}
        <motion.section
          className="mt-16 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              DevCV 소개 영상
            </h2>
            <p className="text-gray-600">
              DevCV의 주요 기능과 사용 방법을 소개하는 영상입니다.
            </p>
          </div>
          <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/Ef3YNel5cag?si=lryryVIeLo3JabHB"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              className="border-none"
              allowFullScreen
              autoFocus
            ></iframe>
          </div>
        </motion.section>

        {/* Additional Info */}
        <motion.section
          className="mt-16 max-w-4xl mx-auto text-center"
          variants={itemVariants}
        >
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              오픈소스에 기여하기
            </h3>
            <p className="text-gray-600 mb-6">
              DevCV는 오픈소스 커뮤니티를 지원하며, 여러분의 기여를 환영합니다.
            </p>
            <a
              href="https://github.com/DevCVTeam"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              <FaGithub className="text-xl" />
              GitHub에서 보기
            </a>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
