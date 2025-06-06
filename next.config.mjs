/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json'
    });
    return config;
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'devcv-bucket.s3.amazonaws.com' },
      { protocol: 'http', hostname: 'devcv-bucket.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' }
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
