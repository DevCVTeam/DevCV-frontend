import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '기업 서비스 | DevCV',
  description: '기업을 위한 맞춤형 채용 솔루션을 제공합니다.'
};

const features = [
  {
    title: '맞춤형 채용 플랫폼',
    description:
      '귀사의 채용 프로세스에 최적화된 맞춤형 채용 플랫폼을 제공합니다.'
  },
  {
    title: 'AI 인재 매칭',
    description: '인공지능 기술을 활용하여 최적의 인재를 추천해드립니다.'
  },
  {
    title: '기업 브랜딩',
    description: '채용 페이지에 기업의 브랜드 아이덴티티를 완벽하게 반영합니다.'
  },
  {
    title: '데이터 분석',
    description: '상세한 채용 데이터 분석을 통해 더 나은 의사결정을 지원합니다.'
  }
];

export default function EnterprisePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            기업 맞춤형 채용 솔루션
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            DevCV의 기업 서비스로 더 효율적인 채용 프로세스를 경험하세요.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg bg-white p-8 shadow-lg ring-1 ring-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-4 text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-main/5 p-8 sm:p-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              지금 바로 문의하세요
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600">
              기업 맞춤형 솔루션에 대해 더 자세히 알아보고 싶으시다면 지금 바로
              문의해주세요.
            </p>
            <button className="mt-8 rounded-md bg-main px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-main/90">
              문의하기
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
