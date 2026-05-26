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
      {
        source: "/guides/esim/esim-vs-sim-japan",
        destination: "/guides/esim/japan-sim-card-vs-esim-2026",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
