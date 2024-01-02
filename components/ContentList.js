'use client'

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from "next/image";
import LoadingSpinner from "./Loading";

const ContentList = ({ category, initialContents }) => {
  const apiKey = process.env.API_KEY || "https://microflix.vercel.app/";
  const [contents, setContents] = useState(initialContents || []);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      const data = await fetch(`${apiKey}api/blogs/?category=${category}&page=${nextPage}`);
      const parsedData = await data.json();
      if (Array.isArray(parsedData[0].data)) {
        setPage(nextPage); 
        setContents([...contents, ...parsedData[0].data]);
        if (contents.length + limit >= parsedData[0].total) {
          setHasMore(false); 
        }
      } else {
        console.error("Fetched data does not contain an array of contents:", parsedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
    if (initialContents && initialContents.length === 0) {
      setHasMore(false);
    }
  }, [initialContents]);

  const showLoading = async () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }

  const getRatingColor = (rating) => {
    const imdbRating = parseFloat(rating);

    switch (true) {
      case imdbRating >= 9:
        return 'bg-green-900';
      case imdbRating >= 8:
        return 'bg-green-700';
      case imdbRating >= 7:
        return 'bg-green-500';
      case imdbRating >= 6:
        return "bg-yellow-700"
      case imdbRating >= 5:
        return "bg-orange-700"
      case imdbRating >= 4:
        return 'bg-orange-500';
      case imdbRating >= 3:
        return "bg-red-500"
      default:
        return "bg-red-700"
    }
  };

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <InfiniteScroll
        dataLength={contents.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4 className='text-center my-[2%]'>Loading...</h4>}
      >
        <div className="grid grid-cols-2 mt-4 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 overflow-hidden">
          {contents && contents.map((element) => {
            const imdbRating = parseFloat(element.imdb?.[0]?.match(/[\d.]+/) || '0');
            return (
            <Link key={element.slug} href={`/${element.slug}`} onClick={showLoading} className='p-4 hover:scale-110 '>
              <div className="to-black relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 ease-in-out ">
                <div className="relative overflow-hidden flex items-center justify-center">
                  <Image width="144" height="144"
                    src={element.image}
                    alt="Image"
                    className="object-cover hover:scale-110 overflow-hidden rounded-lg"
                  />
                  <div
                          className={`IMDB rounded-tl-lg absolute top-0 left-0 p-1 text-sm text-white bg-opacity-50 ${getRatingColor(element.imdbDetails.imdbRating.rating)}`}
                        >
                          <p>{element.imdbDetails.imdbRating.rating}</p>
                          <p>{element.imdbDetails.imdbRating.votes}</p>
                        </div>
                </div>
                <div className="text-center mt-2">
                  <h4 className="text-sm font-semibold mb-2">{element.title}</h4>
                </div>
              </div>
            </Link>
          )})}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ContentList;
