'use client';

import { motion } from 'framer-motion';
import { FaRegCheckCircle } from 'react-icons/fa';

const AttendanceCheckIn = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-6 py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        <FaRegCheckCircle className="text-6xl sm:text-7xl text-green-500" />
      </motion.div>
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-gray-900">출석체크 완료!</h3>
        <p className="text-gray-600">포인트가 지급되었습니다.</p>
      </div>
    </motion.div>
  );
};

export default AttendanceCheckIn;
