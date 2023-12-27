"use client"
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const MoviesCollection = ({ data, collectionName, linkPath }) => {
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      const timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 300); // Adjust the timeout duration as needed
      return () => clearTimeout(timeoutId);
    };

    if (carouselRef.current) {
      carouselRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToSlide = (index) => {
    if (carouselRef.current) {
      const totalSlides = data.length - Math.ceil(window.innerWidth / 200);
      const normalizedIndex = (index + totalSlides) % totalSlides;
      setCurrentSlide(normalizedIndex);
      const scrollAmount = (normalizedIndex * (100 / 3)) / totalSlides;
      carouselRef.current.scrollTo({
        left: carouselRef.current.scrollWidth * scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const nextSlide = () => {
    if (!isScrolling) {
      scrollToSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (!isScrolling) {
      scrollToSlide(currentSlide - 1);
    }
  };

  return (
    <>
      <div>
        <h2 className="absolute bottom-0 left-0 ml-2 mb-2 text-sm text-gray-500">{collectionName}</h2>
      </div>
      <div className="relative">
        <div className="overflow-x-auto w-full">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            ref={carouselRef}
            style={{
              transform: `translateX(-${currentSlide * (100 / 3)}%)`,
              scrollBehavior: "smooth",
            }}
          >
            {data &&
              data.map((element, index) => (
                <div key={index} className="w-1/2 xs:w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6 xl:w-[14.29%] 2xl:w-[12.5%] flex-shrink-0">
                  <Link href={element.slug}>
                  <div
                    onClick={() => scrollToSlide(index)}
                    className="mx-2 flex flex-col justify-center items-center hover:scale-95 cursor-pointer"
                    >
                    <div className="relative h-60">
                      <Image
                        width={144}
                        height={144}
                        src={element.image}
                        alt="Image"
                        className="cropped-image hover:scale-95 rounded-lg"
                        />
                      {/* Additional content here */}
                    </div>
                    <p className="text-center font-light text-xs mt-[4%] md:text-sm ">{element.title}</p>
                  </div>
                        </Link>
                </div>
              ))}
          </div>
        </div>
        <button onClick={prevSlide} className="carousel-button left-0 top-1/2 transform -translate-y-1/2">
          Prev
        </button>
        <button onClick={nextSlide} className="carousel-button right-0 top-1/2 transform -translate-y-1/2">
          Next
        </button>
      </div>
      <style jsx>{`
        .carousel-button {
          position: absolute;
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          padding: 10px;
          border: none;
          cursor: pointer;
        }
        .carousel-button:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </>
  );
};

export default MoviesCollection;
