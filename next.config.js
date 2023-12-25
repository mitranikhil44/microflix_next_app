/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  assetPrefix: "",
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: [
      "vegamovies.dad",
      "imgbb.ink"
    ],
  },
};

module.exports = nextConfig;
