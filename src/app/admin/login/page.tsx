'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        setIsLoading(false);
        return;
      }

      // 관리자 여부 확인은 미들웨어에서 처리됨
      // 성공 시 권한 확인 페이지로 이동
      router.push('/admin/auth-check');
    } catch (err) {
      console.error('로그인 오류:', err);
      setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <div className="rounded-lg bg-white px-8 pb-8 pt-6 shadow-md">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">관리자 로그인</h2>
            <p className="mt-2 text-sm text-gray-600">
              DevCV 관리자 전용 페이지입니다.
              <br />
              관리자 계정으로 로그인해주세요.
            </p>
          </div>

          <div className="mb-4 rounded-md bg-yellow-50 p-3">
            <p className="text-sm text-yellow-700">
              이 페이지는 관리자만 접근할 수 있습니다. 일반 사용자는{' '}
              <Link
                href="/auth/login"
                className="font-medium text-blue-600 hover:underline"
              >
                여기
              </Link>
              에서 로그인하세요.
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                이메일
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                className="mb-2 block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                비밀번호
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-md bg-blue-700 py-2 text-white transition-colors hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
              >
                {isLoading ? '로그인 중...' : '관리자 로그인'}
              </button>
            </div>
          </form>

          <div className="text-center text-sm text-gray-600">
            <p>
              비밀번호를 잊으셨나요?{' '}
              <Link
                href="/auth/reset-password"
                className="font-medium text-blue-600 hover:underline"
              >
                비밀번호 재설정
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
