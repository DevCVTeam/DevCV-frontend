'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

interface InterviewCardProps {
  interview: {
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
  };
}

export default function InterviewCard({ interview }: InterviewCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg">
      <div className="absolute right-4 top-4 z-10 flex space-x-3">
        {interview.links.github && (
          <a
            href={interview.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white/90 p-2 text-gray-600 transition-colors hover:bg-white hover:text-gray-900"
          >
            <FaGithub className="h-5 w-5" />
          </a>
        )}
        {interview.links.linkedin && (
          <a
            href={interview.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white/90 p-2 text-gray-600 transition-colors hover:bg-white hover:text-gray-900"
          >
            <FaLinkedin className="h-5 w-5" />
          </a>
        )}
      </div>
      <Link href={`/interviews/${interview.id}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={interview.image}
            alt={interview.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              {interview.name}
            </h3>
            <p className="text-sm text-gray-600">
              {interview.role} at {interview.company}
            </p>
          </div>
          <p className="mb-4 line-clamp-3 text-gray-600">{interview.summary}</p>
          <div className="flex flex-wrap gap-2">
            {interview.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-500">{interview.date}</div>
        </div>
      </Link>
    </div>
  );
}
