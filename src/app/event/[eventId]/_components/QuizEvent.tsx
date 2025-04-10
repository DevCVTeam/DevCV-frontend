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
      className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg"
    >
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-center space-x-4">
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex size-16 items-center justify-center rounded-full bg-blue-100"
            >
              <FaQuestion className="text-3xl text-blue-600" />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute -right-2 -top-2 rounded-full bg-yellow-400 p-2"
            >
              <BsLightbulb className="text-xl text-white" />
            </motion.div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">퀴즈 이벤트</h3>
            <p className="text-gray-600">
              모든 질문에 답하고{' '}
              <span className="font-bold text-blue-600">{points} 포인트</span>를
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
              className="rounded-xl border border-gray-100 bg-white/50 p-6 shadow-sm backdrop-blur-sm"
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
                  className="w-full rounded-lg border border-gray-200 p-3 transition-all duration-200
                           focus:border-transparent focus:ring-2 focus:ring-blue-400"
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
            className="w-full rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 px-6 py-4 font-semibold
                     text-white shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none
                     focus:ring-2 focus:ring-blue-400/50 disabled:cursor-not-allowed
                     disabled:opacity-50"
          >
            답변 제출하기
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
