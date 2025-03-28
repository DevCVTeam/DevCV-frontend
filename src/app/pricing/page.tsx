import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '가격 안내 | DevCV',
  description: 'DevCV의 합리적인 가격 정책을 확인해보세요.'
};

const pricingPlans = [
  {
    name: '무료',
    price: '0',
    description: '기본적인 이력서 작성을 위한 무료 플랜',
    features: [
      '기본 템플릿 3개',
      '이력서 1개 작성',
      '기본 편집 기능',
      '14일 저장'
    ]
  },
  {
    name: '프리미엄',
    price: '9,900',
    description: '전문적인 이력서 작성을 위한 프리미엄 플랜',
    features: [
      '모든 템플릿 사용 가능',
      '무제한 이력서 작성',
      '고급 편집 기능',
      'AI 맞춤 추천',
      'PDF 다운로드',
      '평생 저장'
    ]
  }
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            합리적인 가격으로 시작하세요
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            DevCV는 모든 구직자가 전문적인 이력서를 작성할 수 있도록 합리적인
            가격을 제공합니다.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 sm:gap-6 lg:gap-8">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200"
            >
              <h3 className="text-lg font-semibold leading-8 text-gray-900">
                {plan.name}
              </h3>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                {plan.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  ₩{plan.price}
                </span>
                <span className="text-sm font-semibold leading-6 text-gray-600">
                  /월
                </span>
              </p>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
              >
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <svg
                      className="h-6 w-5 flex-none text-main"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="mt-8 block w-full rounded-md bg-main px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-main/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
              >
                시작하기
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
