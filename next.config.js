/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/best-esim-japan",
        destination: "/guides/esim/best-esim-japan",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
