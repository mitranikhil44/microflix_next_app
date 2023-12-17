"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "../../components/Loading";

const Search_Result = () => {
  const apiKey = process.env.API_KEY || "https://microflix.vercel.app/";
  const searchSearch = useSearchParams();
  const query = searchSearch.get("query");
  const [contents, setContents] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const [page, setPage] = useState(0);
  const [limit] = useState(12);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoreData = async () => {
    try {
      setIsLoading(true); // Set loading to true before fetching data
  
      const nextPage = page + 1;
      const data = await fetch(
        `${apiKey}api/search_result/?query=${query}&page=${nextPage}`
      );
      const parsedData = await data.json();
      if (Array.isArray(parsedData.result.data)) {
        setPage(nextPage);
        setContents([...contents, ...parsedData.result.data]);
        setTotalResult(parsedData.result.totalData);
        if (contents.length + limit >= parsedData.result.totalData) {
          setHasMore(false);
        }
      } else {
        console.error(
          "Fetched data does not contain an array of contents:",
          parsedData
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };
useEffect(() => {
  fetchMoreData();
}, [])

  const showLoading = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  return (
    <>
    <div>
      {isLoading && <LoadingSpinner />}
      <h1 className="text-base">
        <strong>Movie Results for: </strong>{query}
      </h1>
      <p><strong>Total Result is:</strong>{totalResult}</p>
      <InfiniteScroll
        dataLength={contents.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4 style={{ textAlign: 'center', marginTop: '2%' }}>Loading...</h4>}
      >
        <div className="grid grid-cols-2 mt-4 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 overflow-hidden">
          {contents && contents.map((element, index) => {
            const imdbRating = parseFloat(element.imdb?.[0]?.match(/[\d.]+/) || '0');
            return (
            <Link key={index + 1} href={`/${element.slug}`} onClick={showLoading} className='p-4'>
              <div className="to-black relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 ease-in-out ">
                <div className="relative overflow-hidden flex items-center justify-center">
                  <Image width="144" height="144"
                    src={element.image}
                    alt="Image"
                    className="object-cover hover:scale-110 overflow-hidden rounded-lg"
                  />
                  <p className={`IMDB rounded-tl-lg absolute top-0 left-0 overflow-hidden p-[1%] text-white ${imdbRating >= 9 ? 'bg-green-700' : imdbRating >= 8 ? "bg-green-600": imdbRating >= 7 ? "bg-green-500": imdbRating >= 6.5 ? "bg-yellow-700": imdbRating >= 6 ? "bg-yellow-600": imdbRating >= 5.5 ? "bg-yellow-500": imdbRating >= 5 ? "bg-red-500": imdbRating >= 4.5 ? "bg-red-600": "bg-red-700"}`}>
                {imdbRating.toFixed(1)}
              </p>
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
    </>
  );
};

export default Search_Result;
