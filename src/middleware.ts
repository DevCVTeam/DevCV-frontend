export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/auth/signup',
    // '/auth/signin',
    '/admin',
    '/auth/profile',
    '/event',
    '/event/:path*',
    '/orders/order',
    '/products/register'
  ]
};
