/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  assetPrefix: "",
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { hostname: "vegamovies.dad" },
      { hostname: "dotmovies.bet" },
      { hostname: "imgbb.ink" },
      { hostname: "vegamovies.ngo" },
      { hostname: "vegamovies.ong" },
      { hostname: "vegamovies.yt" },
      { hostname: "image.tmdb.org" },
      { hostname: "www.themoviedb.org" },
      { hostname: "catimages.org" },
      { hostname: "m.media-amazon.com" },
      { hostname: "imagetot.com" },
      { hostname: "myimg.bid" },
      { hostname: "i3.extraimage.xyz" },
      { hostname: "images.justwatch.com" },
      { hostname: "extraimage.net" },
      { hostname: "www.jiopic.com" },
      { hostname: "1.bp.blogspot.com" },
      { hostname: "keepimg.com" },
      { hostname: "img1.imageride.net" },
      { hostname: "img.imageride.net" },
      { hostname: "imgshare.info" },
      { hostname: "3.bp.blogspot.com" },
      { hostname: "vegamovies.cash" },
      { hostname: "vegamovies.rsvp" },
      { hostname: "vegamovies.ph" },
      { hostname: "ww5.gogoanimes.fi" },
      { hostname: "gogocdn.net" },
      { hostname: "ww5.gogoanimes.fihttps" },
      { hostname: "vegamovies.ist" },
      { hostname: "luxmovies.vip" },
      { hostname: "vegamovies.mex.com" },
      { hostname: "m.vegamovies.yt" },
      { hostname: "vegamovies.yt" },
    ],
  },
};

module.exports = nextConfig;
