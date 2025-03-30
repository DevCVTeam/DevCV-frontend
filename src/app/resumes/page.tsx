import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이력서 목록 | DevCV',
  description: '개발자들의 이력서를 확인하고 참고할 수 있습니다.'
};

export default function ResumesPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            이력서 목록
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg md:leading-8">
            다양한 개발자들의 이력서를 확인하고 참고하여 나만의 이력서를
            만들어보세요.
          </p>
        </div>
        {/* 이력서 목록 구현 예정 */}
      </div>
    </main>
  );
}
