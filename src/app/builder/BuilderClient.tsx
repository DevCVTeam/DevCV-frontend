'use client';

import Lottie from 'lottie-react';
import builderAnimation from '../../../public/animations/builder-animation.json';

const templates = [
  {
    id: 1,
    name: '심플 모던',
    description: '깔끔하고 현대적인 디자인의 이력서 템플릿',
    category: '일반'
  },
  {
    id: 2,
    name: '프로페셔널',
    description: '전문성을 강조한 비즈니스 스타일의 이력서 템플릿',
    category: '경력직'
  },
  {
    id: 3,
    name: '크리에이티브',
    description: '창의적인 직군을 위한 독특한 디자인의 이력서 템플릿',
    category: '디자인'
  }
];

export default function BuilderClient() {
  return (
    <main className="min-h-screen bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            이력서 작성
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            DevCV의 직관적인 이력서 빌더로 전문가급 이력서를 쉽고 빠르게
            작성하세요.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <Lottie animationData={builderAnimation} loop={true} />
          </div>
        </div>

        {/* Template Selection */}
        <div className="mt-16">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            템플릿 선택
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <div
                key={template.id}
                className="group cursor-pointer rounded-lg bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-h-2 aspect-w-3 relative mb-4 overflow-hidden rounded-lg bg-gray-100">
                  {/* Template Preview Image Placeholder */}
                  <div className="flex items-center justify-center">
                    <span className="text-2xl text-gray-400">Preview</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {template.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {template.description}
                </p>
                <span className="mt-4 inline-block rounded-full bg-main/10 px-3 py-1 text-xs font-medium text-main">
                  {template.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div className="mt-12 text-center">
          <button className="rounded-md bg-main px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-main/90">
            새 이력서 작성하기
          </button>
        </div>
      </div>
    </main>
  );
}
