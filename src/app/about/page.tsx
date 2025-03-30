import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '회사 소개 | DevCV',
  description: 'DevCV는 개발자들의 이력서 공유 플랫폼입니다.'
};

const values = [
  {
    title: '데이터 기반',
    description:
      '개발자들이 선호하는 이력서, 기술 스택, 기업규모를 분석하여 맞춤형 솔루션을 제공합니다.'
  },
  {
    title: '전문성',
    description:
      '각 분야별 전문 개발자들의 실제 이력서를 확인하고 참고할 수 있습니다.'
  },
  {
    title: '접근성',
    description: '누구나 쉽게 이력서를 공유하고 피드백을 받을 수 있습니다.'
  }
];

const team = [
  {
    name: 'pangyosim',
    role: 'Backend Developer',
    skills: 'Spring Boot, Java',
    image:
      'https://github.com/DevCVTeam/.github/assets/108069902/f6030531-0b1f-4cfa-b7b0-82488445c256',
    github: 'https://github.com/pangyosim',
    email: 'spg9687@gmail.com'
  },
  {
    name: 'Taehyeonn',
    role: 'Backend Developer',
    skills: 'Spring Boot, Java',
    image:
      'https://github.com/DevCVTeam/.github/assets/108069902/041986a5-6be4-48c0-8f62-969187062cd2',
    github: 'https://github.com/Taehyeonn',
    email: '97taehyun@gmail.com'
  },
  {
    name: 'luxihua',
    role: 'Frontend Developer',
    skills: 'Next.js, TypeScript',
    image:
      'https://github.com/DevCVTeam/.github/assets/108069902/4a7d6087-b152-4b09-ab02-b8a0f02db29f',
    github: 'https://github.com/luxihua',
    email: 'maseoyoung12@gmail.com'
  },
  {
    name: 'Toris-dev',
    role: 'Frontend Developer',
    skills: 'Next.js, TypeScript',
    image:
      'https://github.com/DevCVTeam/.github/assets/108069902/2d5842e0-6a12-43d1-8ef6-e587af05b540',
    github: 'https://github.com/toris-dev',
    email: 'ironjustlikethat@gmail.com'
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            개발자를 위한 이력서 공유 플랫폼
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg md:leading-8">
            DevCV는 변화하는 개발자 채용 시장에서 개발자들이 더 나은 기회를 찾을
            수 있도록 돕는 플랫폼입니다. 개발자들의 선호도와 시장 동향을
            분석하여 최적화된 이력서 솔루션을 제공합니다.
          </p>
        </div>

        {/* Project Info */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            프로젝트 정보
          </h2>
          <div className="mt-6 rounded-lg bg-white p-6 shadow-lg sm:mt-8 sm:p-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
                  개발 기간
                </h3>
                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                  기획: 2024.05.13 ~ 2024.05.26
                </p>
                <p className="text-sm text-gray-600 sm:text-base">
                  개발: 2024.05.27 ~ 2024.07.09
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
                  배포 정보
                </h3>
                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                  Github Actions를 통한 자동화된 CI/CD 파이프라인
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            서비스 가치
          </h2>
          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-lg bg-white p-6 shadow-lg transition-transform duration-300 hover:scale-105 sm:p-8"
              >
                <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm text-gray-600 sm:mt-4 sm:text-base">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            개발팀 소개
          </h2>
          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-lg bg-white p-4 text-center shadow-lg transition-transform duration-300 hover:scale-105 sm:p-6 md:p-8"
              >
                <div className="relative mx-auto size-20 overflow-hidden rounded-full xs:size-24 sm:size-28 md:size-32">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, 128px"
                    className="object-cover"
                    priority
                  />
                </div>
                <h3 className="mt-3 text-base font-semibold text-gray-900 sm:mt-4 sm:text-lg md:mt-6">
                  {member.name}
                </h3>
                <p className="text-xs text-gray-600 sm:text-sm md:text-base">
                  {member.role}
                </p>
                <p className="mt-1 text-xs text-gray-500 sm:mt-2">
                  {member.skills}
                </p>
                <div className="mt-2 flex justify-center space-x-3 sm:mt-3 md:mt-4 md:space-x-4">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 sm:text-sm md:text-base"
                  >
                    GitHub
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-xs text-blue-600 hover:text-blue-800 sm:text-sm md:text-base"
                  >
                    Email
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
