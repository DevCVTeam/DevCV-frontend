'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.keys();

  return (
    <div className="flex h-[60vh] flex-col justify-center text-center">
      <h2 className="text-3xl font-semibold text-rose-600">404 Not Found</h2>
      <p className="mt-4 text-gray-500">
        {error.next().value
          ? '로그인 후 이용 가능한 서비스입니다.'
          : '해당 경로에 맞는 페이지를 찾을 수 없습니다.'}
      </p>
      <div className="mt-8">
        <button
          type="button"
          onClick={() => router.replace('/')}
          className="rounded-xl bg-main px-4 py-2.5 hover:bg-sub  hover:shadow-lg"
        >
          메인으로 돌아가기
        </button>
      </div>
    </div>
  );
}
