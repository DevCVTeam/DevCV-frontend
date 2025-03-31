'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Job {
  id: string;
  source: 'wanted' | 'saramin';
  title: string;
  company: string;
  location: string;
  salary: string;
  imageUrl: string;
  url: string;
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'wanted' | 'saramin'>('all');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        const data = await response.json();
        setJobs(data.jobs);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs =
    filter === 'all' ? jobs : jobs.filter((job) => job.source === filter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            개발자 채용 정보
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            원티드와 사람인의 최신 개발자 채용 정보를 한눈에 확인하세요
          </p>
        </div>

        <div className="mt-8">
          <div className="flex justify-center gap-4">
            {(['all', 'wanted', 'saramin'] as const).map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`
                  rounded-lg px-6 py-2 text-sm font-semibold transition-all duration-200
                  ${
                    filter === option
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                {option === 'all'
                  ? '전체'
                  : option === 'wanted'
                    ? '원티드'
                    : '사람인'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="mt-16 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-r-transparent" />
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <Link
                key={`${job.source}-${job.id}`}
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  className="h-full overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={job.imageUrl || '/placeholder.png'}
                        alt={`${job.company} 로고`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-semibold text-gray-900">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-500">{job.company}</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg
                        className="size-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg
                        className="size-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="truncate">
                        {job.salary || '면접 후 결정'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span
                      className={`
                        inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${
                          job.source === 'wanted'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-green-50 text-green-700'
                        }
                      `}
                    >
                      {job.source === 'wanted' ? '원티드' : '사람인'}
                    </span>
                    <svg
                      className="size-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}

        {!loading && filteredJobs.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-gray-500">
              {filter === 'all'
                ? '등록된 채용 정보가 없습니다.'
                : `${filter === 'wanted' ? '원티드' : '사람인'}에 등록된 채용 정보가 없습니다.`}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
