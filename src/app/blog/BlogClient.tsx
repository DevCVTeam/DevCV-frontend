'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import blogAnimation from '../../../public/animations/blog-animation.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const posts = [
  {
    id: 1,
    title: '2024년 개발자 채용 트렌드',
    description:
      '2024년 개발자 채용 시장의 주요 트렌드와 준비해야 할 기술 스택을 알아봅니다.',
    date: '2024-03-15',
    author: '김철수',
    category: '채용 트렌드',
    image: '/blog/trend.jpg'
  },
  {
    id: 2,
    title: '이력서 작성 필수 팁 10가지',
    description:
      '채용 담당자의 시선을 사로잡는 이력서 작성을 위한 핵심 팁을 소개합니다.',
    date: '2024-03-10',
    author: '이영희',
    category: '이력서 팁',
    image: '/blog/resume-tips.jpg'
  },
  {
    id: 3,
    title: '성공적인 이직 준비 방법',
    description:
      '경력직 개발자를 위한 이직 준비 방법과 면접 팁을 상세히 알아봅니다.',
    date: '2024-03-05',
    author: '박지민',
    category: '커리어',
    image: '/blog/career.jpg'
  }
];

export default function BlogClient() {
  return (
    <main className="min-h-screen bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            DevCV 블로그
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            이력서 작성 팁부터 채용 시장 동향까지, 커리어 성장에 필요한 모든
            인사이트
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <Lottie animationData={blogAnimation} loop={true} />
          </div>
        </div>

        {/* Categories */}
        <div className="mt-10 flex justify-center gap-4">
          {['전체', '채용 트렌드', '이력서 팁', '커리어', '인터뷰'].map(
            (category) => (
              <button
                key={category}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-main hover:text-white"
              >
                {category}
              </button>
            )
          )}
        </div>

        {/* Blog Posts */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <article className="group overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:-translate-y-1">
                <div className="aspect-h-2 aspect-w-3 relative overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <span className="rounded-full bg-main/10 px-3 py-1 text-xs font-medium text-main">
                      {post.category}
                    </span>
                    <time
                      dateTime={post.date}
                      className="text-xs text-gray-500"
                    >
                      {post.date}
                    </time>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-main">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                    {post.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="size-6 overflow-hidden rounded-full bg-gray-100">
                      <Image
                        src={`/avatars/avatar${post.id}.jpg`}
                        alt={post.author}
                        width={24}
                        height={24}
                        className="size-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {post.author}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="rounded-md bg-main px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-main/90">
            더보기
          </button>
        </div>
      </div>
    </main>
  );
}
