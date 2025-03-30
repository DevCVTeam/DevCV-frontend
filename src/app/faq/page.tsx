import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '자주 묻는 질문 | DevCV',
  description: 'DevCV 서비스 이용 중 자주 묻는 질문들을 모았습니다.'
};

const faqs = [
  {
    question: '이력서는 어떻게 작성하나요?',
    answer:
      '이력서 작성 페이지에서 기본 정보, 경력, 프로젝트 경험, 기술 스택 등을 입력하여 작성할 수 있습니다. 직관적인 인터페이스로 쉽게 작성이 가능합니다.'
  },
  {
    question: '다른 개발자의 이력서를 볼 수 있나요?',
    answer:
      '네, 공개로 설정된 이력서는 검색 페이지에서 확인할 수 있습니다. 기술 스택, 경력 등 다양한 조건으로 검색이 가능합니다.'
  },
  {
    question: '내 이력서를 비공개로 설정할 수 있나요?',
    answer:
      '네, 이력서 설정에서 공개/비공개를 선택할 수 있습니다. 비공개로 설정된 이력서는 본인만 확인할 수 있습니다.'
  },
  {
    question: '이력서를 수정할 수 있나요?',
    answer:
      '네, 언제든지 내 이력서 페이지에서 수정이 가능합니다. 수정된 내용은 실시간으로 저장됩니다.'
  },
  {
    question: '이력서를 PDF로 다운로드 할 수 있나요?',
    answer:
      '네, 작성된 이력서는 PDF 형식으로 다운로드 할 수 있습니다. 다운로드한 PDF는 인쇄나 이메일 첨부가 가능합니다.'
  }
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            자주 묻는 질문
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg md:text-xl md:leading-8">
            DevCV 서비스 이용 중 궁금하신 점을 확인해보세요.
          </p>
        </div>

        <div className="mt-12 space-y-6 sm:mt-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group relative rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-900/5 to-gray-700/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <h2 className="text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-gray-800 sm:text-xl">
                  {faq.question}
                </h2>
                <p className="mt-3 text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700 sm:text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center sm:mt-16">
          <p className="text-base text-gray-600 sm:text-lg">
            더 궁금한 점이 있으신가요?{' '}
            <a
              href="/contact"
              className="relative inline-block font-semibold text-gray-900 transition-colors duration-300 hover:text-gray-700"
            >
              <span className="relative z-10">문의하기</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-gray-900 transition-transform duration-300 hover:scale-x-100" />
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
