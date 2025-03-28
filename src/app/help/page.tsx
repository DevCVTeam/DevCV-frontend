import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '고객센터 | DevCV',
  description: 'DevCV 고객센터에서 필요한 도움을 받아보세요.'
};

const categories = [
  {
    title: '시작하기',
    description: '서비스 이용 방법과 기본 기능 안내',
    items: [
      { title: '회원가입 방법', href: '/help/signup' },
      { title: '이력서 작성 가이드', href: '/help/resume-guide' },
      { title: '템플릿 사용 방법', href: '/help/template-guide' }
    ]
  },
  {
    title: '결제 및 환불',
    description: '요금제, 결제 방법, 환불 정책 안내',
    items: [
      { title: '요금제 안내', href: '/help/pricing' },
      { title: '결제 방법', href: '/help/payment' },
      { title: '환불 정책', href: '/help/refund' }
    ]
  },
  {
    title: '계정 관리',
    description: '계정 설정 및 보안',
    items: [
      { title: '프로필 설정', href: '/help/profile' },
      { title: '비밀번호 변경', href: '/help/password' },
      { title: '계정 삭제', href: '/help/account-deletion' }
    ]
  },
  {
    title: '기술 지원',
    description: '오류 해결 및 기술적 문제',
    items: [
      { title: '자주 발생하는 오류', href: '/help/common-errors' },
      { title: '브라우저 호환성', href: '/help/browser-support' },
      { title: '파일 업로드 문제', href: '/help/upload-issues' }
    ]
  }
];

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            무엇을 도와드릴까요?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            DevCV 고객센터에서 자주 묻는 질문들과 상세한 이용 가이드를
            확인해보세요.
          </p>
        </div>

        {/* Search */}
        <div className="mt-10">
          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="궁금하신 내용을 검색해보세요"
                className="block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="size-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.title}
              className="rounded-lg bg-white p-6 shadow-lg"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                {category.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {category.description}
              </p>
              <ul className="mt-4 space-y-2">
                {category.items.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-main"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-16 rounded-2xl bg-main/5 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            원하시는 답변을 찾지 못하셨나요?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600">
            DevCV 고객센터에서 1:1 문의를 통해 상세한 답변을 받아보세요.
          </p>
          <button className="mt-8 rounded-md bg-main px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-main/90">
            1:1 문의하기
          </button>
        </div>
      </div>
    </main>
  );
}
