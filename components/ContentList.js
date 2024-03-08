'use client'

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import LoadingSpinner from "./Loading";
import ReactPaginate from 'react-paginate';

const ContentList = ({ category, initialContents }) => {
  const apiKey = process.env.API_KEY || "http://localhost:3000/";
  const [contents, setContents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  
  const fetchPage = async (currentPage) => {
    try {
      const data = await fetch(`${apiKey}api/blogs/?category=${category}&page=${currentPage}`);
      const parsedData = await data.json();
      if(!data.ok){
        console.error(data.message)
      }
        setCurrentPage(currentPage);
        setTotalPages(parsedData[0].totalPages);
        setContents(parsedData[0].data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchPage(currentPage);
  }, []);

  const showLoading = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  const getRatingColor = (rating) => {
    const imdbRating = rating ? parseFloat(rating.rating) : 0;
    switch (true) {
      case imdbRating >= 9:
        return 'bg-green-800';
      case imdbRating >= 8:
        return 'bg-green-500';
      case imdbRating >= 7:
        return "bg-yellow-700"
      case imdbRating >= 6:
        return "bg-orange-700"
      case imdbRating >= 5:
        return 'bg-orange-500';
      case imdbRating >= 4:
        return "bg-red-500";
      case imdbRating >= 3:
        return "bg-red-800";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <div>
        <div className="grid grid-cols-2 mt-4 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 overflow-hidden">
          {contents && contents.map((element, index) => (
            <Link key={index + 1} href={`/${element.slug}`} onClick={showLoading} className='p-4 hover:scale-110 '>
              <div className="to-black relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 ease-in-out ">
                <div className="relative overflow-hidden flex items-center justify-center">
                  <Image width="144" height="144"
                    src={element.image}
                    alt="Image"
                    className="object-cover hover:scale-110 overflow-hidden rounded-lg"
                  />
                  <div
                    className={`IMDB rounded-tl-lg absolute top-0 left-0 p-1 text-sm text-white bg-opacity-50 ${getRatingColor(element.imdbDetails ? element.imdbDetails.imdbRating.rating : "bg-gray-500")}`}
                  >
                    <p>{element.imdbDetails ? element.imdbDetails.imdbRating.rating : 0}</p>
                    <p>{element.imdbDetails ? element.imdbDetails.imdbRating.votes : 0}</p>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <h4 className="text-sm font-semibold mb-2">{element.title}</h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {totalPages > 1 && (
        <div className="mt-8 text-sm">
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={1}
              marginPagesDisplayed={1}
              onPageChange={(selectedPage) => fetchPage(selectedPage.selected + 1)}
              containerClassName="pagination flex justify-center items-center"
              activeClassName="active"
              pageClassName="mx-2 cursor-pointer bg-gray-500 px-2 rounded-lg"
            />
        </div>
      )}
      </div>
    </div>
  );
};

export default ContentList;
