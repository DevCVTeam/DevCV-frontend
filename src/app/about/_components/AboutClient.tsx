'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaHandshake, FaLightbulb, FaRocket, FaUsers } from 'react-icons/fa';

const stats = [
  { label: '누적 이력서', value: '0+' },
  { label: '기업 파트너', value: '0+' },
  { label: '취업 성공', value: '0+' },
  { label: '월 방문자', value: '0+' }
];

const values = [
  {
    icon: FaLightbulb,
    title: '혁신',
    description: '최신 기술과 트렌드를 반영한 서비스를 제공합니다.'
  },
  {
    icon: FaHandshake,
    title: '신뢰',
    description: '정직하고 투명한 서비스 운영으로 신뢰를 쌓아갑니다.'
  },
  {
    icon: FaUsers,
    title: '커뮤니티',
    description: '개발자들의 성장을 위한 커뮤니티를 만들어갑니다.'
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

const team = [
  {
    name: 'pangyosim',
    role: 'Backend Developer',
    skills: 'Spring Web, Java, JPA, AWS',
    image:
      'https://github.com/DevCVTeam/.github/assets/108069902/f6030531-0b1f-4cfa-b7b0-82488445c256',
    github: 'https://github.com/pangyosim',
    email: 'spg9687@gmail.com'
  },
  {
    name: 'Taehyeonn',
    role: 'Backend Developer',
    skills: 'Spring Web, Java, JPA',
    image:
      'https://github.com/DevCVTeam/.github/assets/108069902/041986a5-6be4-48c0-8f62-969187062cd2',
    github: 'https://github.com/Taehyeonn',
    email: '97taehyun@gmail.com'
  },
  {
    name: 'luxihua',
    role: 'Backend Developer',
    skills: 'Spring Web, Java, JPA',
    image:
      'https://github.com/DevCVTeam/.github/assets/108069902/4a7d6087-b152-4b09-ab02-b8a0f02db29f',
    github: 'https://github.com/luxihua',
    email: 'maseoyoung12@gmail.com'
  },
  {
    name: 'Toris-dev',
    role: 'Frontend Developer',
    skills: 'Next.js, TypeScript',
    image:
      'https://github.com/DevCVTeam/.github/assets/108069902/2d5842e0-6a12-43d1-8ef6-e587af05b540',
    github: 'https://github.com/toris-dev',
    email: 'ironjustlikethat@gmail.com'
  }
];

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.section
          className="px-4 py-12 text-center sm:px-6 md:py-20 lg:px-8"
          variants={itemVariants}
        >
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:mb-6 sm:text-4xl md:text-5xl">
            개발자의 성장을 돕는
            <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-600 to-green-400 bg-clip-text text-transparent">
              DevCV
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base text-gray-600 sm:mb-12 sm:text-lg md:text-xl">
            우리는 개발자들이 자신의 가치를 잘 표현하고,
            <br className="hidden sm:block" />
            원하는 커리어를 쌓을 수 있도록 돕습니다.
          </p>
          <div className="relative mx-auto h-[250px] w-full max-w-4xl overflow-hidden rounded-xl shadow-lg sm:h-[300px] sm:rounded-2xl sm:shadow-2xl md:h-[400px]">
            <Image
              src="/images/about/team.png"
              alt="Our Team"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1000px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          className="px-4 py-12 sm:px-6 md:py-16 lg:px-8"
          variants={itemVariants}
        >
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 lg:gap-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="p-4 text-center sm:p-6"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="mb-1 text-2xl font-bold text-gray-900 sm:mb-2 sm:text-3xl md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 sm:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          className="px-4 py-12 sm:px-6 md:py-16 lg:px-8"
          variants={itemVariants}
        >
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 sm:mb-12 sm:text-3xl">
            우리의 가치
          </h2>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-1 lg:grid-cols-3">
            {values.map((value) => (
              <motion.div
                key={value.title}
                className="rounded-xl bg-white p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl sm:p-6"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-blue-100 sm:mb-4 sm:size-12">
                  <value.icon className="text-xl text-blue-600 sm:text-2xl" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 sm:text-base">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          className="px-4 py-12 sm:px-6 md:py-16 lg:px-8"
          variants={itemVariants}
        >
          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-green-400 p-6 text-white sm:rounded-2xl sm:p-8 md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <FaRocket className="mx-auto mb-4 text-3xl sm:mb-6 sm:text-4xl" />
              <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl">
                우리의 미션
              </h2>
              <p className="text-base opacity-90 sm:text-lg">
                모든 개발자가 자신의 가치를 제대로 인정받고,
                <br className="hidden sm:block" />
                원하는 커리어를 성취할 수 있도록 돕는 것.
                <br className="hidden sm:block" />
                이것이 DevCV의 존재 이유입니다.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Team */}
        <motion.section
          className="px-4 py-12 sm:px-6 md:py-16 lg:px-8"
          variants={itemVariants}
        >
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 sm:mb-12 sm:text-3xl">
            개발팀 소개
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-4 lg:gap-8">
            {team.map((member) => (
              <motion.div
                key={member.name}
                className="rounded-xl bg-white p-4 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl sm:p-6"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="relative mx-auto size-16 overflow-hidden rounded-full sm:size-20 md:size-24 lg:size-32">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 128px"
                    className="object-cover"
                    priority
                  />
                </div>
                <h3 className="mt-2 text-sm font-semibold text-gray-900 sm:mt-3 sm:text-base md:mt-4 md:text-lg">
                  {member.name}
                </h3>
                <p className="text-xs text-gray-600 sm:text-sm">
                  {member.role}
                </p>
                <p className="mt-1 text-xs text-gray-500">{member.skills}</p>
                <div className="mt-2 flex justify-center space-x-2 sm:mt-3 sm:space-x-3">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 sm:text-sm"
                  >
                    GitHub
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-xs text-blue-600 hover:text-blue-800 sm:text-sm"
                  >
                    Email
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
