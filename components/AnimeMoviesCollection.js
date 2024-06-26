"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import defaultLogo from "@/public/microflix_logo.png";
import { FreeMode, Pagination } from "swiper/modules";
import { useWebStore } from "@/context";
import { useEffect } from "react";

const MoviesCollection = ({ data, collectionName, movieLink }) => {
  const { setProgress } = useWebStore();
  const showLoading = () => {
    setProgress(30);
  };

  useEffect(() => {
    setProgress(100);
  }, []);

  const getRatingColor = (rating) => {
    const imdbRating = rating ? parseFloat(rating) : 0;

    switch (true) {
      case imdbRating >= 9:
        return "bg-green-800";
      case imdbRating >= 8:
        return "bg-green-500";
      case imdbRating >= 7:
        return "bg-yellow-700";
      case imdbRating >= 6:
        return "bg-orange-700";
      case imdbRating >= 5:
        return "bg-orange-500";
      case imdbRating >= 4:
        return "bg-red-500";
      case imdbRating >= 3:
        return "bg-red-800";
      default:
        return "bg-gray-500";
    }
  };

  const lastImg = (urls) => {
    if (urls && urls.length > 0) {
      return urls[urls.length - 1].url;
    } else {
      return defaultLogo;
    }
  };

  // Function to get the appropriate image source
  const getImageSource = (element) => {
    const image = element.image;

    // Check if element has a custom image
    if (image) {
      if (image.includes("https://gogocdn.net")) {
        return image.replace("https://ww5.gogoanimes.fi", "");
      }

      // Handle vegamovies domain replacements
      const vegamoviesPatterns = [
        { old: "m.vegamovies.yt", new: "vegamovies.ist" },
        { old: "vegamovies.yt", new: "vegamovies.ist" },
        { old: "//vegamovies.mex.com", new: "https://vegamovies.ist" },
      ];

      for (const pattern of vegamoviesPatterns) {
        if (image.includes(pattern.old)) {
          return image.replace(pattern.old, pattern.new);
        }
      }

      return image;
    }

    // Check if IMDb details are available and contain poster links
    if (element.imdbDetails && element.imdbDetails.imdbPosterLink) {
      const posterLinks = element.imdbDetails.imdbPosterLink;
      // Check if posterLinks is an array and not empty
      if (Array.isArray(posterLinks) && posterLinks.length > 0) {
        // Return the last poster link URL
        return posterLinks[posterLinks.length - 1].url;
      }
    }

    // If no custom image or IMDb poster links available, return default logo
    return defaultLogo;
  };

  return (
    <>
      <div>
        <Link href={`/anime_hub/${movieLink}`}>
          <h2 className="text-yellow-600 xxl:text-3xl xl:text-2xl lg:text-xl smd:text-lg text-base font-semibold my-4">
            {collectionName}
          </h2>
        </Link>
      </div>
      <div>
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            200: { slidesPerView: 1 },
            320: { slidesPerView: 2 },
            540: { slidesPerView: 3 },
            880: { slidesPerView: 4 },
            1100: { slidesPerView: 5 },
            1300: { slidesPerView: 6 },
            1600: { slidesPerView: 8 },
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {data &&
            data.map((element, index) => (
              <SwiperSlide key={index}>
                <Link
                  href={`/anime_hub/${element.slug}/0/1`}
                  onClick={showLoading}
                >
                  <div className="flex flex-col justify-center w-[144px] m-auto items-center hover:scale-105 cursor-pointer">
                    <div className="relative h-60 -z-10">
                      <Image
                        width={144}
                        height={144}
                        src={getImageSource(element)}
                        alt={element.title.replace(/Download/, "").trim()}
                        className="hover:scale-95 rounded-lg w-full h-full clip-path -mt-[20%] vignette"
                      />

                      <div
                        className={`absolute top-0 left-0 p-1 font-bold text-sm bg-opacity-50 rounded-tl-md ${getRatingColor(
                          element.imdbDetails && element.imdbDetails.imdbRating
                            ? element.imdbDetails.imdbRating.rating
                              ? element.imdbDetails.imdbRating.rating
                              : 0
                            : 0
                        )}`}
                      >
                        <p>
                          Rating:{" "}
                          {element.imdbDetails && element.imdbDetails.imdbRating
                            ? element.imdbDetails.imdbRating.rating
                              ? element.imdbDetails.imdbRating.rating
                              : 0
                            : 0}
                        </p>
                        <p>
                          {" "}
                          Votes:{" "}
                          {element.imdbDetails && element.imdbDetails.imdbRating
                            ? element.imdbDetails.imdbRating.votes
                              ? element.imdbDetails.imdbRating.votes
                              : 0
                            : 0}
                        </p>
                      </div>
                    </div>
                    <p className="z-50 text-center font-light text-xs -mt-[10%] md:text-sm ">
                      {element.title}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};

export default MoviesCollection;
