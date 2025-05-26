'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  AiOutlineCalendar,
  AiOutlineDashboard,
  AiOutlineFileText,
  AiOutlineMessage,
  AiOutlineSetting,
  AiOutlineUser
} from 'react-icons/ai';

const menuItems = [
  { title: '대시보드', icon: <AiOutlineDashboard />, href: '/admin' },
  { title: '이벤트 관리', icon: <AiOutlineCalendar />, href: '/admin/events' },
  {
    title: '이력서 승인',
    icon: <AiOutlineFileText />,
    href: '/admin/resumePending'
  },
  { title: '회원 관리', icon: <AiOutlineUser />, href: '/admin/users' },
  { title: '문의 관리', icon: <AiOutlineMessage />, href: '/admin/inquiries' },
  { title: '설정', icon: <AiOutlineSetting />, href: '/admin/settings' }
];

export default function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  // 로그인 상태 및 권한 확인
  useEffect(() => {
    // 로딩 중에는 아무 것도 하지 않음
    if (status === 'loading') return;

    // 로그인하지 않았거나, 관리자가 아닌 경우 리다이렉트
    if (!session || session.user?.role !== 'admin') {
      router.replace('/');
    }
  }, [session, status, router]);

  // 로딩 중이거나 권한이 없는 경우 로딩 화면 표시
  if (status === 'loading' || !session || session.user?.role !== 'admin') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-xl font-semibold">권한 확인 중...</div>
          <div className="mx-auto size-8 animate-spin rounded-full border-4 border-t-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 사이드바 */}
      <aside className="hidden w-64 bg-gray-800 text-white md:block">
        <div className="border-b border-gray-700 p-4">
          <h2 className="text-xl font-bold">DevCV 관리자</h2>
        </div>

        <nav className="mt-6">
          <ul>
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <div
                    className={`flex items-center p-4 transition-colors hover:bg-gray-700 ${
                      pathname === item.href ? 'bg-gray-700' : ''
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* 모바일 헤더 */}
      <div className="w-full bg-gray-800 p-4 text-white md:hidden">
        <h2 className="text-xl font-bold">DevCV 관리자</h2>
      </div>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
