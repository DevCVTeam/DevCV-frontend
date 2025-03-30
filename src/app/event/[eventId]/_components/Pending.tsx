'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaRegCalendarCheck } from 'react-icons/fa6';

interface PendingProps {
  onClick: (feedback: string) => void;
}

const feedbackOptions = [
  '매우 유익했어요!',
  '발표자의 설명이 좋았어요',
  '다음에도 참여하고 싶어요',
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
    onClick(isCustom ? customFeedback : selectedFeedback);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center space-y-6 py-8"
    >
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          className="flex items-center justify-center rounded-full bg-blue-100 p-4"
        >
          <FaRegCalendarCheck className="size-8 text-blue-600" />
        </motion.div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">출석체크</h2>
          <p className="mt-2 text-sm text-gray-600">
            오늘 세미나는 어떠셨나요? 간단한 피드백을 남겨주세요.
          </p>
        </div>
      </div>

      <div className="w-full space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {feedbackOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleFeedbackSelect(option)}
              className={`rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                selectedFeedback === option
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {isCustom && (
          <div className="space-y-2">
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
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="피드백을 자유롭게 작성해주세요..."
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!selectedFeedback && !customFeedback}
          className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400"
        >
          출석체크 하기
        </button>
      </div>
    </motion.div>
  );
};

export default Pending;
