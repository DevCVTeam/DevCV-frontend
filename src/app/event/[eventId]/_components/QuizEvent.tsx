'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { BsLightbulb } from 'react-icons/bs';
import { FaQuestion } from 'react-icons/fa';

interface QuizEventProps {
  questions: string[];
  onSubmit: (answers: string[]) => void;
  points: number;
}

export const QuizEvent = ({ questions, onSubmit, points }: QuizEventProps) => {
  const [answers, setAnswers] = useState<string[]>(
    new Array(questions.length).fill('')
  );

  const handleSubmit = () => {
    if (answers.some((answer) => !answer.trim())) {
      return; // 빈 답변이 있으면 제출하지 않음
    }
    onSubmit(answers);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto p-6 rounded-2xl bg-white shadow-lg"
    >
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-center space-x-4">
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center"
            >
              <FaQuestion className="text-blue-600 text-3xl" />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2"
            >
              <BsLightbulb className="text-white text-xl" />
            </motion.div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">퀴즈 이벤트</h3>
            <p className="text-gray-600">
              모든 질문에 답하고{' '}
              <span className="text-blue-600 font-bold">{points} 포인트</span>를
              획득하세요!
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <label className="block space-y-3">
                <span className="text-lg font-medium text-gray-700">
                  Q{index + 1}. {question}
                </span>
                <textarea
                  value={answers[index]}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[index] = e.target.value;
                    setAnswers(newAnswers);
                  }}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400
                           focus:border-transparent transition-all duration-200"
                  rows={3}
                  placeholder="답변을 입력해주세요..."
                  required
                />
              </label>
            </motion.div>
          ))}

          <motion.button
            onClick={handleSubmit}
            disabled={answers.some((answer) => !answer.trim())}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-xl
                     font-semibold shadow-md hover:shadow-lg transform transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            답변 제출하기
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
