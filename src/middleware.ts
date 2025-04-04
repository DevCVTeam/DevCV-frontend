export { default } from 'next-auth/middleware';

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
