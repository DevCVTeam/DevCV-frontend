'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendar, FaTag, FaUser } from 'react-icons/fa';

const posts = [
  {
    id: 1,
    title: 'Next.js 13의 새로운 기능 살펴보기',
    excerpt:
      'Next.js 13에서 도입된 주요 기능들과 성능 개선 사항들을 자세히 알아봅니다.',
    author: '김개발',
    date: '2024-03-20',
    category: 'Frontend',
    tags: ['Next.js', 'React', 'Web Development'],
    imageUrl: '/blog/nextjs-13.jpg'
  },
  {
    id: 2,
    title: 'TypeScript 5.0 업데이트 정리',
    excerpt:
      'TypeScript 5.0의 새로운 기능과 개선된 타입 시스템에 대해 살펴봅니다.',
    author: '이타입',
    date: '2024-03-18',
    category: 'TypeScript',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    imageUrl: '/blog/typescript-5.jpg'
  }
  // 더 많은 블로그 포스트 추가 가능
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function TechBlogClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">기술 블로그</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            최신 개발 트렌드와 기술적 인사이트를 공유합니다. DevCV 개발팀의 실제
            경험과 노하우를 만나보세요.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-white/90 text-gray-900 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-auto space-y-3">
                  <div className="flex items-center text-sm text-gray-500 gap-4">
                    <div className="flex items-center">
                      <FaUser className="mr-2" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <FaCalendar className="mr-2" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center text-xs text-blue-600"
                      >
                        <FaTag className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/tech-blog/${post.id}`}
                  className="mt-4 inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  자세히 보기
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
