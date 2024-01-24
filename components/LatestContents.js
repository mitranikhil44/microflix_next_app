"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LatestContents = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const autoScroll = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % data.length);
    };

    timerRef.current = setInterval(autoScroll, 3000);

    // Set up mouse event listener to reset the timer on user interaction
    const handleUserInteraction = () => {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(autoScroll, 3000);
    };

    document.addEventListener('mousemove', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      clearInterval(timerRef.current);
      document.removeEventListener('mousemove', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [data]);

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const getRatingColor = (rating) => {
    const imdbRating = parseFloat(rating);

    switch (true) {
      case imdbRating >= 9:
        return 'text-green-900';
      case imdbRating >= 8:
        return 'text-green-700';
      case imdbRating >= 7:
        return 'text-green-500';
      case imdbRating >= 6:
        return "text-yellow-700"
      case imdbRating >= 5:
        return "text-orange-700"
      case imdbRating >= 4:
        return 'text-orange-500';
      case imdbRating >= 3:
        return "text-red-500"
      default:
        return "text-red-700"
    }
  };

  return (
    <div className="relative overflow-hidden h-96">
      <div className="flex transition-transform duration-500 ease-in-out transform">
        {data &&
          data.map((element, index) => (
            <Link
              href={element.slug}
              key={index}
              className={`w-full h-96 bg-cover bg-center bg-no-repeat ${currentSlide === index ? 'block' : 'hidden'
                }`}
            >
              <div className="relative w-full h-[30rem]">
                <Image
                  src={element.image}
                  alt={element.title}
                  width={window.innerWidth - 20} height="10"
                  className='opacity-50'
                  objectFit="cover"
                />
              </div>
              <div
                className={`absolute bottom-12 left-4 p-1 font-bold text-sm bg-opacity-50 ${getRatingColor(element.imdbDetails && element.imdbDetails.imdbRating ? element.imdbDetails.imdbRating.rating != null ? element.imdbDetails.imdbRating.rating : 0 : 0)}`}
              >

                <h1>
                  {element.title.replace(/Download/, "").trim()}
                </h1>
                <p>Rating: {element.imdbDetails && element.imdbDetails.imdbRating ? element.imdbDetails.imdbRating.rating != null ? element.imdbDetails.imdbRating.rating : 0 : 0}</p>
                <p>Votes: {element.imdbDetails && element.imdbDetails.imdbRating ? element.imdbDetails.imdbRating.votes != null ? element.imdbDetails.imdbRating.votes : 0 : 0}</p>
              </div>
            </Link>
          ))}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {data &&
          data.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-400'
                }`}
            />
          ))}
      </div>
    </div>
  );
};

export default LatestContents;
