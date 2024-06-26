"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "next/navigation";
import defaultLogo from "@/public/microflix_logo.png";
import CategoryData from "@/components/other/CategoryData";
import { useWebStore } from "@/context";

const Search_Result = ({ initialContents }) => {
  const [contents, setContents] = useState(initialContents || []);
  const { setProgress, setIsLoading } = useWebStore();
  const [totalResult, setTotalResult] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [limit] = useState(12);

  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const fetchMoreData = async () => {
    try {
      setIsLoading(true);
      const nextPage = page + 1;
      const response = await fetch(
        `/api/search_result/?query=${query}&page=${nextPage}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (Array.isArray(data.result.data)) {
        setPage(nextPage);
        setContents([...contents, ...data.result.data]);
        setTotalResult(data.result.totalData);
        setIsLoading(false);
        if (contents.length + limit >= data.result.totalData) {
          setHasMore(false);
          setIsLoading(false);
        }
      } else {
        console.error(
          "Fetched data does not contain an array of contents:",
          data
        );
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  useEffect(() => {
    if (initialContents) {
      setIsLoading(true);
      setContents(initialContents);
    } else {
      fetchMoreData();
    }
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

  const getImageSource = (element) => {
    const image = element.image;
    // Check if element has a custom image
    if (image) {
      if (image.includes("https://gogocdn.net")) {
        return image.replace("https://ww5.gogoanimes.fi", "");
      }
      if (image.includes("m.vegamovies.yt")) {
        return image.replace("m.vegamovies.yt", "vegamovies.ist");
      }
      if(image.includes("vegamovies.yt")){
        return image.replace("vegamovies.yt", "vegamovies.ist");
      }
      if(image.includes("vegamovies.mex.com")){
        return image.replace("//vegamovies.mex.com", "https://vegamovies.ist");
      }
      if(image.includes("vegamovies.ph")){
        return image.replace("vegamovies.ph", "vegamovies.ist");
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
      <CategoryData />
      <div className="mt-[2%]">
        <h1 className="text-base">
          <strong>Movie Results for: </strong>
          {query}
        </h1>
        <p>
          <strong>Total Result is:</strong> {totalResult}
        </p>
        <InfiniteScroll
          dataLength={contents.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <h4 style={{ textAlign: "center", marginTop: "2%" }}>Loading...</h4>
          }
        >
          <div className="grid grid-cols-2 mt-4 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 overflow-hidden">
            {contents.map((element, index) => {
              setIsLoading(false);
              return (
                <Link
                  key={index + 1}
                  href={`/${
                    element.title.includes("Download") ? "data" : "anime_hub"
                  }/${element.slug}${
                    element.title.includes("Download") ? "" : "/0/1"
                  }`}
                  className="p-4"
                  passHref
                >
                  <div className="to-black relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 ease-in-out ">
                    <div className="relative overflow-hidden flex items-center justify-center">
                      <Image
                        width={144}
                        height={144}
                        src={getImageSource(element)}
                        alt={element.title.replace(/Download/, "").trim()}
                        className="object-cover hover:scale-110 overflow-hidden rounded-lg w-auto h-auto"
                        style={{
                          clipPath:
                            "polygon(0 10%, 100% 10%, 100% 100%, 0% 100%)",
                        }}
                      />
                      <div
                        className={`absolute top-0 left-0 p-1 font-bold text-sm bg-opacity-50 rounded-tl-md ${getRatingColor(
                          element.imdbDetails && element.imdbDetails.imdbRating
                            ? element.imdbDetails.imdbRating.rating != null
                              ? element.imdbDetails.imdbRating.rating
                              : 0
                            : 0
                        )}`}
                      >
                        <p>
                          {element.imdbDetails && element.imdbDetails.imdbRating
                            ? element.imdbDetails.imdbRating.rating != null
                              ? element.imdbDetails.imdbRating.rating
                              : 0
                            : 0}
                        </p>
                        <p>
                          {element.imdbDetails && element.imdbDetails.imdbRating
                            ? element.imdbDetails.imdbRating.votes != null
                              ? element.imdbDetails.imdbRating.votes
                              : 0
                            : 0}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-center text-center mt-2">
                      <h4 className="text-xs md:text-sm font-semibold mb-2">
                        {element.title}
                      </h4>
                      <p className="text-gray-600">
                        Year: {element.releaseYear}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Search_Result;
