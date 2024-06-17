export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/admin',
    '/auth/profile',
    '/event',
    '/orders/order',
    '/products/register'
  ]
};
