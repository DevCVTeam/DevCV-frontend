/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'devcv-bucket.s3.amazonaws.com' },
      { protocol: 'http', hostname: 'devcv-bucket.s3.amazonaws.com' }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/imp/:path*',
        destination: 'https://api.iamport.kr/:path*'
      },
      {
        source: '/server/:path*',
        destination: `${process.env.SERVER_URL}/:path*`
      }
    ];
  }
};

export default nextConfig;
