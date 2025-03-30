'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaRegCalendarCheck } from 'react-icons/fa6';

interface PendingProps {
  onClick: (feedback: string) => void;
}

const feedbackOptions = [
  '이력서 작성에 도움이 되었어요',
  '다른 개발자의 이력서가 궁금해요',
  '이력서 공유 문화가 좋아요',
  '직접 입력하기'
];

const Pending = ({ onClick }: PendingProps) => {
  const [selectedFeedback, setSelectedFeedback] = useState('');
  const [customFeedback, setCustomFeedback] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  const handleFeedbackSelect = (feedback: string) => {
    if (feedback === '직접 입력하기') {
      setIsCustom(true);
      setSelectedFeedback('');
    } else {
      setIsCustom(false);
      setSelectedFeedback(feedback);
    }
  };

  const handleSubmit = () => {
    const feedback = isCustom ? customFeedback : selectedFeedback;
    if (!feedback) return;
    onClick(feedback);
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-6 p-6 sm:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="rounded-full bg-blue-50 p-4"
      >
        <FaRegCalendarCheck className="text-4xl sm:text-5xl text-blue-500" />
      </motion.div>

      <div className="text-center space-y-2 mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
          오늘의 소감을 남겨주세요
        </h3>
        <p className="text-gray-600 text-sm sm:text-base">
          간단한 피드백을 남기고 출석체크를 완료해보세요
        </p>
      </div>

      <div className="w-full max-w-md space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {feedbackOptions.map((option) => (
            <motion.button
              key={option}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleFeedbackSelect(option)}
              className={`p-3 rounded-xl text-sm sm:text-base transition-all duration-300
                ${
                  selectedFeedback === option
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              {option}
            </motion.button>
          ))}
        </div>

        {isCustom && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <textarea
              value={customFeedback}
              onChange={(e) => setCustomFeedback(e.target.value)}
              placeholder="여러분의 소감을 자유롭게 작성해주세요..."
              className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-all duration-300 resize-none text-sm sm:text-base"
              rows={3}
            />
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!selectedFeedback && !customFeedback}
          className={`w-full py-3 px-6 rounded-xl text-white font-medium transition-all duration-300
            ${
              !selectedFeedback && !customFeedback
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg'
            }
          `}
        >
          출석체크 하기
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Pending;
