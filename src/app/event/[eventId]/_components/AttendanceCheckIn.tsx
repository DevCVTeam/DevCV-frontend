'use client';

import { motion } from 'framer-motion';
import { FaRegCheckCircle } from 'react-icons/fa';

interface AttendanceCheckInProps {
  onClose: () => void;
}

const AttendanceCheckIn = ({ onClose }: AttendanceCheckInProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center gap-8 px-6 py-10"
    >
      <div className="flex flex-col items-center space-y-8">
        <div className="flex flex-col items-center space-y-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.6,
              type: 'spring',
              stiffness: 200,
              damping: 20
            }}
            className="flex items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-green-200 p-6 shadow-lg"
          >
            <FaRegCheckCircle className="size-12 text-green-600" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900">출석체크 완료!</h2>
            <p className="mt-3 text-base text-gray-600">
              출석체크가 완료되었습니다.
              <br />
              <span className="font-medium text-green-600">
                50 포인트가 적립
              </span>
              되었습니다.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="w-full space-y-5"
        >
          <div>
            <label
              htmlFor="feedback"
              className="block text-sm font-medium text-gray-700"
            >
              피드백 남기기
              <span className="ml-1 text-sm text-gray-500">(선택사항)</span>
            </label>
            <div className="mt-2">
              <textarea
                id="feedback"
                name="feedback"
                rows={4}
                className="block w-full rounded-xl border border-gray-300 bg-white/50 px-4 py-3 text-gray-900 shadow-sm backdrop-blur-sm transition-all duration-300 placeholder:text-gray-400 hover:bg-white focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500"
                placeholder="오늘 세미나에 대한 의견을 자유롭게 남겨주세요..."
              />
            </div>
          </div>

          <button
            onClick={onClose}
            className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-green-500 to-green-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <span className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative">확인</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AttendanceCheckIn;
