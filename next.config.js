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
      "imgbb.ink",
      "vegamovies.ngo",
      "vegamovies.ong",
      "images.remotePatterns",
      "image.tmdb.org",
      "www.themoviedb.org",
      "catimages.org", 'catimages.org', "image.tmdb.org", "m.media-amazon.com", "imagetot.com", "www.themoviedb.org", "myimg.bid", "i3.extraimage.xyz", "images.justwatch.com", "extraimage.net", "www.jiopic.com", "1.bp.blogspot.com", "keepimg.com", "img1.imageride.net", "img.imageride.net", "imgshare.info", "3.bp.blogspot.com"
    ],
  },
};

module.exports = nextConfig;
