/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  assetPrefix: "",
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: [
      "vegamovies.dad",
      "dotmovies.bet",
      "imgbb.ink"
    ],
  },
};

module.exports = nextConfig;
