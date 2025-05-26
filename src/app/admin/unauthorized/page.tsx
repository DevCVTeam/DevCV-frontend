'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaExclamationTriangle, FaHome, FaLock } from 'react-icons/fa';

export default function UnauthorizedPage() {
  const router = useRouter();

  // 5초 후 홈페이지로 자동 리다이렉트
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 p-3">
            <FaLock className="size-10 text-red-600" />
          </div>
        </div>

        <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">
          접근 권한이 없습니다
        </h1>

        <div className="mb-6 rounded-md bg-yellow-50 p-4">
          <div className="flex">
            <div className="shrink-0">
              <FaExclamationTriangle className="size-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                관리자 페이지에 접근하기 위한 권한이 없습니다. 계정 권한 확인이
                필요하시면 시스템 관리자에게 문의하세요.
              </p>
            </div>
          </div>
        </div>

        <p className="mb-6 text-center text-sm text-gray-600">
          5초 후 자동으로 홈페이지로 이동합니다.
        </p>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FaHome className="mr-2" />
            홈페이지로 이동
          </Link>
        </div>
      </div>
    </div>
  );
}
