import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '회사 소개 | DevCV',
  description:
    'DevCV는 모든 구직자가 전문적인 이력서를 쉽게 작성할 수 있도록 돕습니다.'
};

const stats = [
  { name: '누적 사용자', value: '10만+' },
  { name: '이력서 작성 수', value: '50만+' },
  { name: '합격률', value: '85%' },
  { name: '기업 고객사', value: '1,000+' }
];

const values = [
  {
    title: '혁신',
    description: 'AI 기술을 활용하여 이력서 작성 프로세스를 혁신합니다.'
  },
  {
    title: '전문성',
    description: '각 분야 전문가들의 노하우를 담은 템플릿을 제공합니다.'
  },
  {
    title: '신뢰성',
    description: '검증된 템플릿과 가이드로 신뢰할 수 있는 서비스를 제공합니다.'
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            더 나은 커리어의 시작
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            DevCV는 모든 구직자가 자신의 가치를 잘 표현할 수 있도록 돕는 것을
            목표로 합니다.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 bg-white p-8 shadow-lg sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="text-center">
              <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
              <dd className="mt-2 text-3xl font-bold tracking-tight text-main">
                {stat.value}
              </dd>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mt-16">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            우리의 가치
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-lg bg-white p-8 shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {value.title}
                </h3>
                <p className="mt-4 text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mt-16">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            팀 소개
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((member) => (
              <div
                key={member}
                className="rounded-lg bg-white p-8 text-center shadow-lg"
              >
                <div className="mx-auto size-32 overflow-hidden rounded-full">
                  <Image
                    src={`/team/member${member}.jpg`}
                    alt={`Team Member ${member}`}
                    width={128}
                    height={128}
                    className="size-full object-cover"
                  />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">
                  홍길동
                </h3>
                <p className="text-gray-600">CEO & Founder</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
