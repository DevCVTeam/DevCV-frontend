'use client';

import { motion } from 'framer-motion';
import { FaCalendar, FaTag, FaUser } from 'react-icons/fa';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  tags: string[];
}

const samplePosts: BlogPost[] = [
  {
    id: 1,
    title: 'Next.js 13의 새로운 기능 살펴보기',
    excerpt:
      'Next.js 13에서 추가된 주요 기능들과 성능 개선 사항들을 자세히 알아봅니다.',
    author: '김개발',
    date: '2024-02-20',
    category: '프론트엔드',
    imageUrl: '/blog/nextjs.jpg',
    tags: ['Next.js', 'React', 'Web Development']
  },
  {
    id: 2,
    title: '효율적인 상태 관리를 위한 Zustand 활용법',
    excerpt:
      'React 애플리케이션에서 Zustand를 사용한 상태 관리 방법을 소개합니다.',
    author: '이기술',
    date: '2024-02-18',
    category: '상태관리',
    imageUrl: '/blog/state.jpg',
    tags: ['React', 'Zustand', 'State Management']
  }
];

export default function TechBlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">기술 블로그</h1>
          <p className="text-lg text-gray-600">
            최신 개발 트렌드와 기술 인사이트를 공유합니다
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {samplePosts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 w-full">
                <div className="absolute inset-0 bg-blue-600 opacity-10" />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-blue-600">
                  {post.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                  <span className="flex items-center">
                    <FaUser className="mr-2" />
                    {post.author}
                  </span>
                  <span className="flex items-center">
                    <FaCalendar className="mr-2" />
                    {post.date}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center text-sm text-blue-600"
                    >
                      <FaTag className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg 
                  hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  자세히 보기
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
