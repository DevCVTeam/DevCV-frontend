'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner
} from 'react-icons/fa';

export default function AdminAuthCheckPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [authState, setAuthState] = useState<'checking' | 'success' | 'error'>(
    'checking'
  );
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let redirectTimer: NodeJS.Timeout;

    if (status === 'loading') {
      return; // 세션 로딩 중이면 아무것도 하지 않음
    }

    // 세션이 있는 경우
    if (session) {
      // 사용자가 관리자 권한이 있는지 확인
      if (session.user?.role === 'admin') {
        setAuthState('success');
        // 성공 시 2초 후 관리자 대시보드로 리다이렉트
        redirectTimer = setTimeout(() => {
          router.push('/admin');
        }, 2000);
      } else {
        // 관리자 권한이 없는 경우
        setAuthState('error');
        setErrorMessage(
          '관리자 권한이 없는 계정입니다. 관리자 계정으로 다시 로그인해주세요.'
        );
        // 4초 후 관리자 로그인 페이지로 리다이렉트
        redirectTimer = setTimeout(() => {
          router.push('/admin/login');
        }, 4000);
      }
    } else if (status === 'unauthenticated') {
      // 로그인하지 않은 경우
      setAuthState('error');
      setErrorMessage('로그인이 필요합니다.');
      // 2초 후 관리자 로그인 페이지로 리다이렉트
      redirectTimer = setTimeout(() => {
        router.push('/admin/login');
      }, 2000);
    }

    return () => {
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
    };
  }, [session, status, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        {authState === 'checking' && (
          <div className="text-center">
            <FaSpinner className="mx-auto size-12 animate-spin text-blue-500" />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              권한 확인 중...
            </h2>
            <p className="mt-2 text-gray-600">
              관리자 권한을 확인하고 있습니다. 잠시만 기다려주세요.
            </p>
          </div>
        )}

        {authState === 'success' && (
          <div className="text-center">
            <FaCheckCircle className="mx-auto size-12 text-green-500" />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              인증 성공!
            </h2>
            <p className="mt-2 text-gray-600">관리자 페이지로 이동합니다.</p>
            <div className="mt-4">
              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full animate-progress-bar bg-green-500 transition-all duration-2000"></div>
              </div>
            </div>
          </div>
        )}

        {authState === 'error' && (
          <div className="text-center">
            <FaExclamationTriangle className="mx-auto size-12 text-red-500" />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              인증 실패
            </h2>
            <p className="mt-2 text-gray-600">{errorMessage}</p>
            <div className="mt-4">
              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full animate-progress-bar bg-red-500 transition-all duration-4000"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
