/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true,
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/page/1',
      },
    ]
  },
};

module.exports = nextConfig;
