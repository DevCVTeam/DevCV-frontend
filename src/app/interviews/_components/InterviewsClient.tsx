'use client';

import { EventCategory } from '@/utils/type';
import { motion } from 'framer-motion';
import InterviewList from './InterviewList';

interface Interview {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  summary: string;
  date: string;
  tags: string[];
  links: {
    github?: string;
    linkedin?: string;
  };
  isEventInterview?: boolean;
  eventCategory?: EventCategory;
}

interface InterviewsClientProps {
  interviews: Interview[];
}

export default function InterviewsClient({
  interviews
}: InterviewsClientProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="mb-4 text-4xl font-bold text-gray-900">개발자 인터뷰</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          다양한 분야의 개발자들의 경험과 인사이트를 통해 여러분의 커리어에
          영감을 얻어보세요.
        </p>
      </motion.div>

      <InterviewList interviews={interviews} />
    </div>
  );
}
