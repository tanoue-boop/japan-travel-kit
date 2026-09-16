const { removedGuides } = require("./lib/redirects");

// Captured once per build; surfaced in the footer as "Updated <Month YYYY>".
const BUILD_DATE = new Date().toISOString();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BUILD_DATE: BUILD_DATE,
  },
  async redirects() {
    return [
      {
        source: "/best-esim-japan",
        destination: "/guides/esim/best-esim-japan",
        permanent: true,
      },
      {
        // Previously pointed at japan-sim-card-vs-esim-2026, which is now merged into best-esim-japan.
        source: "/guides/esim/esim-vs-sim-japan",
        destination: "/guides/esim/best-esim-japan",
        permanent: true,
      },
      ...Object.entries(removedGuides).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
};

module.exports = nextConfig;
