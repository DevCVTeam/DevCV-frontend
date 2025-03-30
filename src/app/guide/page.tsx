import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용 가이드 | DevCV',
  description: 'DevCV 서비스 이용 방법을 안내합니다.'
};

const guides = [
  {
    title: '이력서 작성하기',
    description: '이력서 작성 페이지에서 간단하게 이력서를 작성할 수 있습니다.',
    steps: [
      '이력서 작성 버튼을 클릭하세요.',
      '기본 정보를 입력하세요.',
      '경력과 프로젝트 경험을 추가하세요.',
      '기술 스택을 선택하세요.',
      '작성이 완료되면 저장하세요.'
    ]
  },
  {
    title: '이력서 검색하기',
    description: '다른 개발자들의 이력서를 검색하고 참고할 수 있습니다.',
    steps: [
      '검색 페이지로 이동하세요.',
      '기술 스택, 경력 등 원하는 조건을 선택하세요.',
      '검색 결과에서 원하는 이력서를 확인하세요.'
    ]
  },
  {
    title: '이력서 공유하기',
    description: '작성한 이력서를 다른 개발자들과 공유할 수 있습니다.',
    steps: [
      '내 이력서 페이지에서 공유하고 싶은 이력서를 선택하세요.',
      '공개 설정을 활성화하세요.',
      '공유 링크를 복사하여 다른 사람과 공유하세요.'
    ]
  }
];

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            이용 가이드
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg md:leading-8">
            DevCV 서비스 이용 방법을 안내해드립니다.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <div
              key={guide.title}
              className="rounded-lg bg-white p-6 shadow-lg sm:p-8"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {guide.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600">{guide.description}</p>
              <ol className="mt-4 space-y-2">
                {guide.steps.map((step, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {index + 1}. {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
