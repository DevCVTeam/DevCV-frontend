import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '문의하기 | DevCV',
  description: 'DevCV에 문의사항이나 피드백을 보내주세요.'
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            문의하기
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            궁금하신 점이나 제안사항이 있으시다면 언제든 문의해주세요.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="rounded-2xl bg-white p-8 shadow-lg sm:p-12">
            <form className="space-y-8">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm"
                  placeholder="홍길동"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  문의 유형
                </label>
                <select
                  id="category"
                  name="category"
                  className="mt-1 block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm"
                >
                  <option>서비스 이용 문의</option>
                  <option>결제 관련 문의</option>
                  <option>기술 지원</option>
                  <option>제휴 및 제안</option>
                  <option>기타 문의</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  문의 내용
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="mt-1 block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm"
                  placeholder="문의하실 내용을 자세히 적어주세요."
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-main px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-main/90"
                >
                  문의하기
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 lg:pl-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                고객센터 운영 시간
              </h3>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>평일: 오전 9시 - 오후 6시</p>
                <p>점심시간: 오후 12시 - 오후 1시</p>
                <p>주말 및 공휴일 휴무</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                다른 문의 방법
              </h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">이메일</p>
                  <p className="mt-1 text-sm text-gray-600">
                    support@devcv.net
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">전화</p>
                  <p className="mt-1 text-sm text-gray-600">02-1234-5678</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">주소</p>
                  <p className="mt-1 text-sm text-gray-600">
                    서울특별시 강남구 테헤란로 123 DevCV빌딩 4층
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                자주 묻는 질문
              </h3>
              <p className="mt-4 text-sm text-gray-600">
                문의하시기 전에 자주 묻는 질문을 확인해보세요. 더 빠르게 답변을
                찾으실 수 있습니다.
              </p>
              <button className="mt-4 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200">
                자주 묻는 질문 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
