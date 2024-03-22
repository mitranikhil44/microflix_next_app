"use client"

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/Loading";
import defaultLogo from '@/public/microflix_logo.png'

const Search_Result = ({ initialContents }) => {
  const [contents, setContents] = useState(initialContents || []);
  const [totalResult, setTotalResult] = useState(0);
  const [page, setPage] = useState(0);
  const [limit] = useState(12);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const fetchMoreData = async () => {
    try {
      setIsLoading(true);

      const nextPage = page + 1;
      const response = await fetch(`/api/search_result/?query=${query}&page=${nextPage}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'reload'
      });
      const data = await response.json();

      if (Array.isArray(data.result.data)) {
        setPage(nextPage);
        setContents([...contents, ...data.result.data]);
        setTotalResult(data.result.totalData);
        if (contents.length + limit >= data.result.totalData) {
          setHasMore(false);
        }
      } else {
        console.error("Fetched data does not contain an array of contents:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialContents) {
      setContents(initialContents);
    } else {
      fetchMoreData();
    }
  }, []);

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
    <>
      <div>
        {isLoading && <LoadingSpinner />}
        <h1 className="text-base">
          <strong>Movie Results for: </strong>{query}
        </h1>
        <p><strong>Total Result is:</strong> {totalResult}</p>
        <InfiniteScroll
          dataLength={contents.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 style={{ textAlign: 'center', marginTop: '2%' }}>Loading...</h4>}
        >
          <div className="grid grid-cols-2 mt-4 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 overflow-hidden">
            {contents.map((element, index) => {
              const imdbRating = parseFloat(element.imdb?.[0]?.match(/[\d.]+/) || '0');
              return (
                <Link key={index + 1} href={`/${element.slug}`} className="p-4" passHref>
                    <div className="to-black relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 ease-in-out ">
                      <div className="relative overflow-hidden flex items-center justify-center">
                        <Image
                          width={144}
                          height={144}
                          src={element.image || defaultLogo}
                          alt={element.title.replace(/Download/, "").trim()}
                          className="object-cover hover:scale-110 overflow-hidden rounded-lg w-auto h-auto"
                          style={{ clipPath: 'polygon(0 10%, 100% 10%, 100% 100%, 0% 100%)' }}
                        />
                        <div
                          className={`absolute top-0 left-0 p-1 font-bold text-sm bg-opacity-50 rounded-tl-md ${getRatingColor(element.imdbDetails && element.imdbDetails.imdbRating ? element.imdbDetails.imdbRating.rating != null ? element.imdbDetails.imdbRating.rating : 0 : 0)}`}
                        >
                          <p>{element.imdbDetails && element.imdbDetails.imdbRating ? element.imdbDetails.imdbRating.rating != null ? element.imdbDetails.imdbRating.rating : 0 : 0}</p>
                          <p>{element.imdbDetails && element.imdbDetails.imdbRating ? element.imdbDetails.imdbRating.votes != null ? element.imdbDetails.imdbRating.votes : 0 : 0}</p>
                        </div>
                      </div>
                      <div className="text-center mt-2">
                        <h4 className="text-sm font-semibold mb-2">{element.title}</h4>
                      </div>
                    </div>
                </Link>
              )
            })}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Search_Result;
