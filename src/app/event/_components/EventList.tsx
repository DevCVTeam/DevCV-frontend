'use client';

import { type EventList as EventListType } from '@/utils/type';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IoMdTime } from 'react-icons/io';

const eventResume = [
  { id: '25', alt: '[네카라쿠배당토] 백엔드 이력서', src: '/bigtech.png' },
  { id: '4', alt: '[대기업] 프론트엔드 이력서', src: '/frontend.png' },
  { id: '26', alt: '[대기업] 백엔드 이력서', src: '/backend.png' }
];

interface EventListProps {
  events: EventListType;
}

const EventList = ({ events }: EventListProps) => {
  const router = useRouter();

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div
      className="mx-auto max-w-7xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-center mb-12" variants={itemVariants}>
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent sm:text-5xl md:text-6xl">
          이벤트
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          DevCV에서 제공하는 특별한 이력서 템플릿과 이벤트를 만나보세요
        </p>
      </motion.div>

      {/* 이벤트 이력서 섹션 */}
      <motion.div variants={itemVariants} className="mb-16">
        <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          추천 이력서
        </h2>
        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          {eventResume.map((resume) => (
            <motion.div
              key={resume.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/5 before:to-purple-500/5 before:opacity-0 before:transition-opacity before:duration-300
              hover:before:opacity-100 cursor-pointer"
              onClick={() => router.push(`/resume/${resume.id}`)}
            >
              <div className="aspect-[4/3] relative mb-6 overflow-hidden rounded-xl">
                <Image
                  src={resume.src}
                  alt={resume.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="relative">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {resume.alt}
                </h3>
                <div className="mt-4 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                    포인트 지급
                  </span>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                    한정 판매
                  </span>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-md
                    hover:from-blue-700 hover:to-blue-800 hover:shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    transition-all duration-300"
                  >
                    자세히 보기
                  </motion.button>
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm text-gray-600">
                      실시간 구매 가능
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* 출석 이벤트 섹션 */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
          진행중인 이벤트
        </h2>
        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          {events.eventListResponse
            .filter((event) => event.eventCategory === 'ATTENDANCE')
            .map((event, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500/5 before:to-pink-500/5 before:opacity-0 before:transition-opacity before:duration-300
                hover:before:opacity-100 cursor-pointer"
                onClick={() => router.push(`/event/${event.eventId}`)}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700">
                      {event.point.toLocaleString()} Point
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                    {event.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <IoMdTime className="text-purple-500" />
                    <span className="text-sm">
                      {new Date(event.startDate).toLocaleDateString('ko-kr')} ~{' '}
                      {new Date(event.endDate).toLocaleDateString('ko-kr')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </motion.div>

      <motion.div className="mt-16 text-center" variants={itemVariants}>
        <p className="text-gray-600">
          * 이벤트 상품은 한정 수량으로 제공되며, 조기 종료될 수 있습니다.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default EventList;
