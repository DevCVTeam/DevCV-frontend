'use client';

import Lottie from 'lottie-react';
import Image from 'next/image';
import Link from 'next/link';
import pressAnimation from '../../../public/animations/press-animation.json';

const pressReleases = [
  {
    id: 1,
    title: 'DevCV, 시리즈 A 투자 유치 성공',
    description:
      '이력서 작성 플랫폼 DevCV가 100억 원 규모의 시리즈 A 투자 유치에 성공했습니다.',
    date: '2024-03-20',
    source: '테크크런치',
    image: '/press/investment.jpg'
  },
  {
    id: 2,
    title: '월간 사용자 100만 명 돌파',
    description:
      'DevCV가 서비스 출시 1년 만에 월간 활성 사용자 100만 명을 돌파했습니다.',
    date: '2024-03-15',
    source: '벤처뉴스',
    image: '/press/growth.jpg'
  },
  {
    id: 3,
    title: '기업 고객 1,000개사 확보',
    description:
      'DevCV의 기업 채용 솔루션을 도입한 기업이 1,000개사를 넘어섰습니다.',
    date: '2024-03-10',
    source: '디지털데일리',
    image: '/press/enterprise.jpg'
  }
];

export default function PressClient() {
  return (
    <main className="min-h-screen bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            보도자료
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            DevCV의 최신 소식과 미디어 자료를 확인하세요
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <Lottie animationData={pressAnimation} loop={true} />
          </div>
        </div>

        {/* Press Releases */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pressReleases.map((press) => (
            <Link key={press.id} href={`/press/${press.id}`}>
              <article className="group overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:-translate-y-1">
                <div className="aspect-h-2 aspect-w-3 relative overflow-hidden">
                  <Image
                    src={press.image}
                    alt={press.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-main">
                      {press.source}
                    </span>
                    <time
                      dateTime={press.date}
                      className="text-sm text-gray-500"
                    >
                      {press.date}
                    </time>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-main">
                    {press.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                    {press.description}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Media Kit */}
        <div className="mt-16">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            미디어 키트
          </h2>
          <div className="mt-8 rounded-lg bg-white p-8 shadow-lg">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  회사 로고 및 브랜드 자료
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  DevCV의 로고와 브랜드 가이드라인을 다운로드할 수 있습니다.
                </p>
                <button className="mt-4 rounded-md bg-main px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-main/90">
                  다운로드
                </button>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  보도자료 키트
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  DevCV의 상세 정보와 통계 자료가 포함된 보도자료 키트입니다.
                </p>
                <button className="mt-4 rounded-md bg-main px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-main/90">
                  다운로드
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
