import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/auth/signin',
        '/auth/signup',
        '/profile/',
        '/_next/',
        '/static/'
      ]
    },
    sitemap: 'https://devcv.net/sitemap.xml',
    host: 'https://devcv.net'
  };
}
