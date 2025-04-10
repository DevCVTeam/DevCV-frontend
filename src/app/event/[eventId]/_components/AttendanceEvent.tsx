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
      className="mx-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-lg"
    >
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex size-20 items-center justify-center rounded-full bg-green-100"
          >
            <FaRegCalendarCheck className="text-3xl text-green-600" />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute -right-2 -top-2 rounded-full bg-yellow-400 p-2"
          >
            <BsStars className="text-xl text-white" />
          </motion.div>
        </div>

        <div className="space-y-2 text-center">
          <h3 className="text-xl font-bold text-gray-800">출석체크</h3>
          <p className="text-gray-600">
            오늘의 출석체크를 완료하고{' '}
            <span className="font-bold text-green-600">{points} 포인트</span>를
            받아보세요!
          </p>
        </div>

        <textarea
          placeholder="오늘의 소감을 남겨주세요 (선택사항)"
          className="w-full resize-none rounded-xl border border-gray-200 p-4 transition-all
                   duration-200 focus:border-transparent focus:ring-2 focus:ring-green-400"
          rows={3}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <button
          onClick={() => onAttendanceCheck(feedback)}
          className="w-full rounded-xl bg-gradient-to-r from-green-400 to-green-500 px-6 py-4 font-semibold
                   text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg
                   focus:outline-none focus:ring-2 focus:ring-green-400/50"
        >
          출석체크 하기
        </button>
      </div>
    </motion.div>
  );
};
