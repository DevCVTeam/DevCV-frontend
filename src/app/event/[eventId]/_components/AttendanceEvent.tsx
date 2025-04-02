'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { BsStars } from 'react-icons/bs';
import { FaRegCalendarCheck } from 'react-icons/fa6';

interface AttendanceEventProps {
  onAttendanceCheck: (feedback?: string) => void;
  points: number;
}

export const AttendanceEvent = ({
  onAttendanceCheck,
  points
}: AttendanceEventProps) => {
  const [feedback, setFeedback] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto p-6 rounded-2xl bg-white shadow-lg"
    >
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
          >
            <FaRegCalendarCheck className="text-green-600 text-3xl" />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2"
          >
            <BsStars className="text-white text-xl" />
          </motion.div>
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-gray-800">출석체크</h3>
          <p className="text-gray-600">
            오늘의 출석체크를 완료하고{' '}
            <span className="text-green-600 font-bold">{points} 포인트</span>를
            받아보세요!
          </p>
        </div>

        <textarea
          placeholder="오늘의 소감을 남겨주세요 (선택사항)"
          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400
                   focus:border-transparent transition-all duration-200 resize-none"
          rows={3}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <button
          onClick={() => onAttendanceCheck(feedback)}
          className="w-full py-4 px-6 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-xl
                   font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all
                   duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
        >
          출석체크 하기
        </button>
      </div>
    </motion.div>
  );
};
