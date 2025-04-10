'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaRegCalendarCheck } from 'react-icons/fa6';

interface PendingProps {
  onClick: (feedback: string) => void;
}

const feedbackOptions = [
  '매우 유익했어요! 👍',
  '발표자의 설명이 좋았어요 🎯',
  '다음에도 참여하고 싶어요 ✨',
  '직접 입력하기 ✏️'
];

const Pending = ({ onClick }: PendingProps) => {
  const [selectedFeedback, setSelectedFeedback] = useState('');
  const [customFeedback, setCustomFeedback] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  const handleFeedbackSelect = (feedback: string) => {
    if (feedback === '직접 입력하기 ✏️') {
      setIsCustom(true);
      setSelectedFeedback('');
    } else {
      setIsCustom(false);
      setSelectedFeedback(feedback);
    }
  };

  const handleSubmit = () => {
    onClick(isCustom ? customFeedback : selectedFeedback);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center space-y-8 px-6 py-10"
    >
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
          className="flex items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 p-6 shadow-lg"
        >
          <FaRegCalendarCheck className="size-12 text-blue-600" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900">출석체크</h2>
          <p className="mt-3 text-base text-gray-600">
            오늘 세미나는 어떠셨나요?
            <br />
            간단한 피드백을 남겨주시면 감사하겠습니다.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="w-full space-y-6"
      >
        <div className="grid grid-cols-2 gap-4">
          {feedbackOptions.map((option, index) => (
            <motion.button
              key={option}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.6 + index * 0.1,
                duration: 0.4
              }}
              onClick={() => handleFeedbackSelect(option)}
              className={`group relative overflow-hidden rounded-xl p-4 text-sm font-medium shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                selectedFeedback === option
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                  : 'bg-white text-gray-900 ring-1 ring-gray-200'
              }`}
            >
              <span
                className={`absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                  selectedFeedback === option ? 'opacity-100' : ''
                }`}
              />
              <span className="relative">{option}</span>
            </motion.button>
          ))}
        </div>

        {isCustom && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            <label
              htmlFor="custom-feedback"
              className="block text-sm font-medium text-gray-700"
            >
              직접 입력
            </label>
            <textarea
              id="custom-feedback"
              value={customFeedback}
              onChange={(e) => setCustomFeedback(e.target.value)}
              rows={4}
              className="block w-full rounded-xl border border-gray-300 bg-white/50 px-4 py-3 text-gray-900 shadow-sm backdrop-blur-sm transition-all duration-300 placeholder:text-gray-400 hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
              placeholder="피드백을 자유롭게 작성해주세요..."
            />
          </motion.div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!selectedFeedback && !customFeedback}
          className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative">출석체크 하기</span>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Pending;
