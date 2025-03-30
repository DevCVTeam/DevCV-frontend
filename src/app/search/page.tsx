import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이력서 검색 | DevCV',
  description: '기술 스택, 경력 등 다양한 조건으로 이력서를 검색해보세요.'
};

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            이력서 검색
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg md:leading-8">
            원하는 조건의 이력서를 검색하고 참고하세요.
          </p>
        </div>
        {/* 검색 기능 구현 예정 */}
      </div>
    </main>
  );
}
