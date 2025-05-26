import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');

  // 관리자 페이지에 대한 접근 제어 (unauthorized 페이지와 admin login 페이지는 제외)
  if (
    isAdminPath &&
    !request.nextUrl.pathname.startsWith('/admin/unauthorized') &&
    !request.nextUrl.pathname.startsWith('/admin/login')
  ) {
    // 로그인하지 않은 경우
    if (!token) {
      console.log(
        `Unauthorized access attempt to ${request.nextUrl.pathname} - Not logged in`
      );
      // 일반 로그인 페이지 대신 관리자 로그인 페이지로 리다이렉트
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // 관리자 권한이 없는 경우 (role이 admin이 아닌 경우)
    if (token.role !== 'admin') {
      console.log(
        `Unauthorized access attempt to ${request.nextUrl.pathname} - User: ${token.email}, Role: ${token.role}`
      );
      return NextResponse.redirect(new URL('/admin/unauthorized', request.url));
    }

    // 관리자 권한이 있는 경우 접근 허용
    return NextResponse.next();
  }

  // 그 외 일반 페이지 접근 제어
  if (
    request.nextUrl.pathname.startsWith('/auth/profile') ||
    request.nextUrl.pathname.startsWith('/event') ||
    request.nextUrl.pathname.startsWith('/order') ||
    request.nextUrl.pathname === '/resume/register'
  ) {
    // 로그인하지 않은 경우
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // 모든 조건을 통과한 경우 접근 허용
  return NextResponse.next();
}

// 미들웨어가 적용될 경로 지정
export const config = {
  matcher: [
    // '/auth/signup',
    // '/auth/signin',
    '/admin',
    '/admin/:path*',
    '/auth/profile',
    '/auth/profile/:path*',
    '/event',
    '/event/:path*',
    '/order',
    '/resume/register'
  ]
};
