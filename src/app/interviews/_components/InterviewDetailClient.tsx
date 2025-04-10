'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaGithub, FaLinkedin } from 'react-icons/fa';

interface InterviewContent {
  type: 'question' | 'answer';
  text: string;
}

interface RelatedInterview {
  id: string;
  name: string;
  role: string;
  company: string;
}

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
  content: InterviewContent[];
  relatedInterviews: RelatedInterview[];
}

interface InterviewDetailClientProps {
  interview: Interview;
}

export default function InterviewDetailClient({
  interview
}: InterviewDetailClientProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <Link
          href="/interviews"
          className="mb-8 inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <FaArrowLeft className="mr-2" />
          인터뷰 목록으로 돌아가기
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-xl bg-white shadow-lg"
        >
          <div className="relative h-96">
            <Image
              src={interview.image}
              alt={interview.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h1 className="mb-2 text-4xl font-bold">{interview.name}</h1>
              <p className="text-xl">
                {interview.role} at {interview.company}
              </p>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {interview.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {interview.links.github && (
                  <a
                    href={interview.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 transition-colors hover:text-gray-900"
                  >
                    <FaGithub className="size-6" />
                  </a>
                )}
                {interview.links.linkedin && (
                  <a
                    href={interview.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 transition-colors hover:text-gray-900"
                  >
                    <FaLinkedin className="size-6" />
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-8">
              {interview.content.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.type === 'question' ? (
                    <div className="rounded-lg bg-gray-50 p-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Q. {item.text}
                      </h3>
                    </div>
                  ) : (
                    <div className="px-4">
                      <p className="text-gray-600">{item.text}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                관련 인터뷰
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {interview.relatedInterviews.map((related) => (
                  <Link
                    key={related.id}
                    href={`/interviews/${related.id}`}
                    className="group rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
                  >
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                      {related.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {related.role} at {related.company}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
