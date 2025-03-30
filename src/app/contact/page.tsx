import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '문의하기 | DevCV',
  description: 'DevCV 서비스 이용 중 궁금한 점을 문의해주세요.'
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            문의하기
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg md:text-xl md:leading-8">
            서비스 이용 중 궁금한 점이나 제안사항이 있으시다면 문의해주세요.
          </p>
        </div>

        <div className="mt-12 sm:mt-16">
          <div className="group relative rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl sm:p-8">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-900/5 to-gray-700/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900"
                  >
                    이메일
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="mt-2 block w-full rounded-lg border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 transition-shadow duration-300 sm:text-sm sm:leading-6"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-900"
                  >
                    제목
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    className="mt-2 block w-full rounded-lg border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 transition-shadow duration-300 sm:text-sm sm:leading-6"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-900"
                  >
                    문의 내용
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="mt-2 block w-full rounded-lg border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 transition-shadow duration-300 sm:text-sm sm:leading-6"
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                  >
                    문의하기
                  </button>
                </div>
              </form>

              <div className="mt-8 border-t border-gray-900/10 pt-8">
                <h2 className="text-lg font-semibold text-gray-900">
                  다른 문의 방법
                </h2>
                <dl className="mt-4 space-y-4 text-sm leading-6 text-gray-600">
                  <div className="group/item transition-colors duration-300 hover:text-gray-900">
                    <dt className="font-medium text-gray-900">이메일</dt>
                    <dd>support@devcv.net</dd>
                  </div>
                  <div className="group/item">
                    <dt className="font-medium text-gray-900">GitHub</dt>
                    <dd>
                      <a
                        href="https://github.com/devCVTeam"
                        className="relative inline-block text-gray-900 transition-colors duration-300 hover:text-gray-700"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="relative z-10">
                          github.com/devCVTeam
                        </span>
                        <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-gray-900 transition-transform duration-300 group-hover/item:scale-x-100" />
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
