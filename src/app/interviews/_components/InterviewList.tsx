'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import InterviewCard from './InterviewCard';

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
}

interface InterviewListProps {
  interviews: Interview[];
}

export default function InterviewList({ interviews }: InterviewListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get unique tags from all interviews
  const allTags = Array.from(
    new Set(interviews.flatMap((interview) => interview.tags))
  ).sort();

  // Filter interviews based on search term and selected tag
  const filteredInterviews = interviews.filter((interview) => {
    const matchesSearch =
      interview.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.summary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag = selectedTag
      ? interview.tags.includes(selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="이름, 역할, 회사 또는 키워드로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:w-96"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              selectedTag === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            전체
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredInterviews.map((interview) => (
            <motion.div
              key={interview.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <InterviewCard interview={interview} />
            </motion.div>
          ))}
          {filteredInterviews.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center text-gray-500"
            >
              검색 결과가 없습니다.
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
