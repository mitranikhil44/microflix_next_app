"use client"

import 'swiper/css';
import Link from 'next/link';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';
import 'swiper/css/effect-coverflow';
import LoadingSpinner from "./Loading";
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import defaultLogo from '@/public/microflix_logo.png';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';


const LatestContents = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);

  const getRatingColor = (rating) => {
    const imdbRating = rating ? parseFloat(rating) : 0;
    switch (true) {
      case imdbRating >= 9:
        return 'bg-green-800';
      case imdbRating >= 8:
        return 'bg-green-500';
      case imdbRating >= 7:
        return 'bg-yellow-700';
      case imdbRating >= 6:
        return 'bg-orange-700';
      case imdbRating >= 5:
        return 'bg-orange-500';
      case imdbRating >= 4:
        return 'bg-red-500';
      case imdbRating >= 3:
        return 'bg-red-800';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="relative h-auto">
      {isLoading && <LoadingSpinner />}
      <h2 className="text-3xl xl:text-2xl md:text-xl smd:text-lg sm:text-sm text-white my-4">Latest Contents</h2>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={10}
        breakpoints={{
          600: { slidesPerView: 2 },
          756: { slidesPerView: 3 },
          1080: { slidesPerView: 4 },
          1560: { slidesPerView: 5 },
          1984: { slidesPerView: 6 },
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        watchSlidesProgress={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {data &&
          data.map((element, index) => (
            <SwiperSlide key={element._id}>
              <Link href={element.slug} className="h-auto">
                <div className='absolute bottom-[4%] p-[2%] z-10'>
                  <div className="text" data-swiper-parallax="-100">
                    <p>
                      {element.title.replace(/Download/, "").trim()}
                    </p>
                  </div>
                  <div className="title" data-swiper-parallax="-200">
                    <div className="flex items-center">
                      <p className="mr-2">Rating:</p>
                      <p className={`rounded px-2 py-1 text-xs ${getRatingColor(element.imdbDetails && element.imdbDetails.imdbRating ? element.imdbDetails.imdbRating.rating != null ? element.imdbDetails.imdbRating.rating : 0 : 0)}`}>
                        {element.imdbDetails && element.imdbDetails.imdbRating ? element.imdbDetails.imdbRating.rating != null ? element.imdbDetails.imdbRating.rating : 0 : 0}
                      </p>
                    </div>
                    <p className="text-xs">Votes: {element.imdbDetails && element.imdbDetails.imdbRating ? element.imdbDetails.imdbRating.votes != null ? element.imdbDetails.imdbRating.votes : 0 : 0}</p>
                  </div>
                </div>
                <div className="h-[45vh] xl:h-[40vh] lg:h-[35vh]">
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Image
                      src={element.image || defaultLogo}
                      sizes="(max-width: 165px) 100vw, (max-width: 768px) 50vw, 33vw"
                      alt={element.title.replace(/Download/, "").trim()}
                      objectFit="cover"
                      layout="fill"
                      priority
                    />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default LatestContents;
