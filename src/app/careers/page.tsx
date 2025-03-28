import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '채용 | DevCV',
  description: 'DevCV와 함께 성장할 인재를 찾습니다.'
};

const positions = [
  {
    id: 1,
    title: '프론트엔드 개발자',
    team: '개발팀',
    location: '서울',
    type: '정규직',
    experience: '3년 이상',
    description:
      'React와 TypeScript를 활용하여 사용자 경험이 뛰어난 웹 애플리케이션을 개발합니다.'
  },
  {
    id: 2,
    title: '백엔드 개발자',
    team: '개발팀',
    location: '서울',
    type: '정규직',
    experience: '3년 이상',
    description:
      'Node.js와 AWS를 활용하여 확장 가능한 서버 인프라를 구축하고 관리합니다.'
  },
  {
    id: 3,
    title: 'UX/UI 디자이너',
    team: '디자인팀',
    location: '서울',
    type: '정규직',
    experience: '2년 이상',
    description:
      '사용자 중심의 직관적인 인터페이스를 디자인하고 프로토타입을 제작합니다.'
  }
];

const benefits = [
  '자율 출퇴근',
  '재택근무',
  '점심 식대 지원',
  '업무 장비 지원',
  '자기계발비 지원',
  '건강검진 지원',
  '4대보험',
  '스톡옵션'
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            DevCV와 함께 성장하세요
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            우리는 이력서 시장을 혁신하고 있습니다. 함께할 열정 가득한 동료를
            기다립니다.
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-16">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            복리후생
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center justify-center rounded-lg bg-white p-4 text-center shadow-lg"
              >
                <span className="text-sm font-medium text-gray-900">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mt-16">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            채용 중인 포지션
          </h2>
          <div className="mt-8 grid gap-6">
            {positions.map((position) => (
              <div
                key={position.id}
                className="rounded-lg bg-white p-6 shadow-lg sm:p-8"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {position.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-full bg-main/10 px-3 py-1 text-xs font-medium text-main">
                        {position.team}
                      </span>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                        {position.location}
                      </span>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                        {position.type}
                      </span>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                        {position.experience}
                      </span>
                    </div>
                    <p className="mt-4 text-sm text-gray-600">
                      {position.description}
                    </p>
                  </div>
                  <button className="mt-4 rounded-md bg-main px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-main/90 sm:mt-0">
                    지원하기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
