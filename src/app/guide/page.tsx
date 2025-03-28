import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '이용가이드 | DevCV',
  description: 'DevCV 서비스 이용 방법을 상세히 알아보세요.'
};

const guides = [
  {
    title: '1. 회원가입',
    description: '간단한 이메일 인증으로 DevCV를 시작하세요.',
    steps: [
      '이메일 주소 입력',
      '인증 코드 확인',
      '기본 정보 입력',
      '가입 완료'
    ],
    image: '/guide/signup.jpg'
  },
  {
    title: '2. 템플릿 선택',
    description: '다양한 템플릿 중 원하는 디자인을 선택하세요.',
    steps: [
      '템플릿 페이지 방문',
      '카테고리별 템플릿 확인',
      '템플릿 미리보기',
      '원하는 템플릿 선택'
    ],
    image: '/guide/template.jpg'
  },
  {
    title: '3. 이력서 작성',
    description: '직관적인 에디터로 이력서를 작성하세요.',
    steps: [
      '기본 정보 입력',
      '경력 사항 추가',
      '학력 정보 입력',
      '스킬 및 자격증 등록'
    ],
    image: '/guide/resume.jpg'
  },
  {
    title: '4. 다운로드 및 공유',
    description: '작성한 이력서를 다양한 형식으로 저장하고 공유하세요.',
    steps: [
      'PDF 형식으로 저장',
      '링크로 공유하기',
      '이메일로 전송',
      '인쇄하기'
    ],
    image: '/guide/share.jpg'
  }
];

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            이용가이드
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            DevCV를 100% 활용하는 방법을 단계별로 알아보세요.
          </p>
        </div>

        {/* Guide Steps */}
        <div className="mt-16 space-y-16">
          {guides.map((guide, index) => (
            <div
              key={guide.title}
              className={`flex flex-col gap-8 lg:flex-row ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className="flex-1 lg:py-12">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {guide.title}
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  {guide.description}
                </p>
                <ul className="mt-8 space-y-4">
                  {guide.steps.map((step, stepIndex) => (
                    <li
                      key={step}
                      className="flex items-center gap-3 text-gray-600"
                    >
                      <span className="flex size-6 items-center justify-center rounded-full bg-main/10 text-sm font-medium text-main">
                        {stepIndex + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image */}
              <div className="flex-1">
                <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-16 rounded-2xl bg-main/5 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            추가 도움이 필요하신가요?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600">
            더 자세한 설명이 필요하시다면 고객센터를 방문해주세요.
          </p>
          <button className="mt-8 rounded-md bg-main px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-main/90">
            고객센터 방문하기
          </button>
        </div>
      </div>
    </main>
  );
}
