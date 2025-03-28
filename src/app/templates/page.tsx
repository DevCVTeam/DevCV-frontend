import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '템플릿 | DevCV',
  description: 'DevCV의 다양한 이력서 템플릿을 확인해보세요.'
};

export default function TemplatesPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            이력서 템플릿
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            DevCV가 제공하는 다양한 이력서 템플릿을 확인하고 여러분에게 맞는
            템플릿을 선택하세요.
          </p>
        </div>
        {/* Template Grid will be added here */}
      </div>
    </main>
  );
}
