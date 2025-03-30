'use client';

import { motion } from 'framer-motion';
import { FaRegCheckCircle } from 'react-icons/fa';

interface AttendanceCheckInProps {
  onClose: () => void;
}

const AttendanceCheckIn = ({ onClose }: AttendanceCheckInProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center gap-6 py-8"
    >
      <div className="flex flex-col items-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
            className="flex items-center justify-center rounded-full bg-green-100 p-4"
          >
            <FaRegCheckCircle className="size-8 text-green-600" />
          </motion.div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">출석체크 완료!</h2>
            <p className="mt-2 text-sm text-gray-600">
              출석체크가 완료되었습니다. 포인트가 적립되었습니다.
            </p>
          </div>
        </div>

        <div className="w-full space-y-4">
          <div>
            <label
              htmlFor="feedback"
              className="block text-sm font-medium text-gray-700"
            >
              피드백 (선택사항)
            </label>
            <div className="mt-1">
              <textarea
                id="feedback"
                name="feedback"
                rows={4}
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="오늘 세미나에 대한 피드백을 남겨주세요..."
              />
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            확인
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AttendanceCheckIn;
