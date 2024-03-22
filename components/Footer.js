'use client'

import Link from 'next/link';
import LoadingSpinner from "./Loading";
import { useState } from 'react';

const Footer = () => {
  const [isLoading, setIsLoading] = useState(false); 
  const showLoading = async () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false); 
    }, 2000); 
  }
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <header className="text-gray-400 body-font sticky bottom-0 left-0 text-xs xxs:text-sm lg:text-base xl:text-lg">
        <div className='flex justify-center items-center rounded-xl xs:rounded-2xl w-[85%] mx-auto mb-[1%] p-[2%] sm:p-[1%] lg:p-[0.5%] vignette'>
          <Link href="/data/movies" className="mr-3 md:mr-5 xl:mr-8 hover:text-yellow-500" onClick={showLoading}>Movies</Link>
          <Link href="/data/web_series" className="mr-3 md:mr-5 xl:mr-8 hover:text-yellow-500" onClick={showLoading}>Web Series</Link>
          <div className='hidden xs:block '>
            <Link href="/data/contents" className="mr-3 md:mr-5 xl:mr-8 hover:text-yellow-500" onClick={showLoading}>Contents</Link>
            <Link href="/data/adult_contents" className="mr-3 md:mr-5 xl:mr-8 hover:text-yellow-500" onClick={showLoading}>18+ Contents</Link>
          </div>

          {/* Dropdown Buttons */}

          {/* More Contents Dropdown Button */}
          <div className="relative group xs:hidden mr-3 md:mr-5 xl:mr-8">
            <button className="text-white hover:text-yellow-500 rounded-md focus:outline-none flex justify-center items-center gap-1">
              More
            </button>
            <ul className="absolute hidden overflow-hidden bottom-6 rounded-md bg-inherit bg-yellow-950 text-white group-hover:block z-10 w-24 xxs:w-32 ">
              <Link href="/data/contents" className="block p-2" onClick={showLoading}>Contents</Link>
              <Link href="/data/adult_contents" className="block p-2" onClick={showLoading}>18+ Contents</Link>
            </ul>
          </div>

          {/* Top Rated Contents Button */}
          <div className="relative group bg-transparent">
            <button className="text-white hover:text-yellow-500 rounded-md focus:outline-none flex justify-center items-center gap-1">
              Top Rated
            </button>
            <ul className="absolute hidden overflow-hidden bottom-6 rounded-md bg-yellow-950 text-white group-hover:block z-10 w-24 xxs:w-32 ">
              <Link href="/data/top_contents" className="block p-2" onClick={showLoading}>Top Contents</Link>
              <Link href="/data/top_adult_contents" className="block p-2" onClick={showLoading}>Top 18+ Contents</Link>
              <Link href="/data/top_movies" className="block p-2" onClick={showLoading}>Top Movies</Link>
              <Link href="/data/top_web_series" className="block p-2" onClick={showLoading}>Top TV Series</Link>
            </ul>
          </div>
          {/* End Dropdown Button */}

        </div>
        <nav className="p-[2%] sm:p-[1.5%] md:p-[1%] flex gap-5 items-center justify-center bg-gray-950">
          <div className='flex justify-center items-center flex-col cursor-pointer hover:text-yellow-500 '>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
              <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
            </svg>
            <Link href="/" onClick={showLoading}>Home</Link>
          </div>
          <div className='flex justify-center items-center flex-col cursor-pointer hover:text-yellow-500'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            <Link href="/search" onClick={showLoading}>Search</Link>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Footer