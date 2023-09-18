import React, { useRef, useEffect } from "react";
import Image from 'next/image';
import Link from "next/link";

const Movies_Collection = (props) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    let scrollInterval;

    const startScrolling = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollWidth = container.scrollWidth;
        const containerWidth = container.clientWidth;

        if (scrollWidth > containerWidth) {
          // If there is content to scroll
          let scrollPosition = 0;

          scrollInterval = setInterval(() => {
            container.scrollLeft = scrollPosition;
            scrollPosition++;

            if (scrollPosition >= scrollWidth - containerWidth) {
              scrollPosition = 0; // Reset to the beginning
            }
          }, 10); // Adjust the interval for smoother or faster scrolling
        }
      }
    };

    // Start scrolling animation
    startScrolling();

    // Clear the interval on unmount
    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div>
      <Link href={props.linkPath}>
        <div className="flex justify-between items-center m-2">
          <h3 className="text-md sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl m-2">
            {props.collectionName}
          </h3>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-right cursor-pointer hover:opacity-80 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 2xl:w-7 2xl:h-7"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
        </div>
      </Link>
      <hr className="p-3" />
      <div ref={scrollContainerRef} className="flex items-center overflow-x-auto overflow-y-hidden scrollbar-thumb-rounded-md scrollbar-track-rounded-md scrollbar-thin scrollbar-thumb-[#7d5c20] scrollbar-track-gray-100">
        <div className="flex">

          {props.data && props.data.map((element) => (
            <Link key={element.slug} href={`/content/${element.slug}`}>
              <div className="hover:scale-110 w-28 sm:w-32 md:w-36 lg:w-40 xl:w-44 2xl:w-48 m-2 overflow-auto ">
                <div>
                  <img
                    src={element.image}
                    alt="Image"
                    className="rounded-lg"
                  />
                </div>
                <div className="text-center text-xs md:text-sm lg:text-base xl:text-lg py-3">
                  <h4>{element.title}</h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link href={props.linkPath}
          className="bg-[rgba(255,255,255,0.05)] hover:opacity-90 text-gray-500 mr-2 rounded-full p-4 lg:p-5 xl:p-6 2xl:p-7"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-three-dots cursor-pointer bg-transparent"
            viewBox="0 0 16 16"
          >
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Movies_Collection;
