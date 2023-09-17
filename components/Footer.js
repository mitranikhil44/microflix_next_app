import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <header className="text-gray-400 body-font sticky bottom-0 left-0 text-sm md:text-base lg:text-lg bg-transparent">
        <div className='flex justify-center items-center bg-slate-600 rounded-3xl w-[75%] mx-auto mb-[1%] p-[1%]'>
          <Link href="/data/movies" className="mr-3 md:mr-5 hover:text-white bg-transparent">Movies</Link>
          <Link href="/data/web_series" className="mr-3 md:mr-5 hover:text-white bg-transparent">Web Series</Link>

          {/* Dropdown Button */}
          <div className="relative group bg-transparent">
            <button className="text-white rounded-md focus:outline-none flex justify-center items-center gap-1">
              More <svg className="bg-transparent h-4 w-4 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M10 0a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd" />
              </svg>
            </button>
            <ul className="absolute hidden overflow-hidden bottom-0 rounded-md text-gray-600 pt-2 group-hover:block z-10 w-60">
              <Link href="/data/other_country_content" className="block px-4 py-2">Other Country Content</Link>
              <Link href="/data/other_country_18+_content" className="block px-4 py-2">Other Country 18+ Content</Link>
              <Link href="/data/indian_content" className="block px-4 py-2">Indian Content</Link>
              <Link href="/data/indian_18+_content" className="block px-4 py-2">Indian 18+ Content</Link>
            </ul>
          </div>
          {/* End Dropdown Button */}
        </div>
          <nav className="p-[2%] sm:p-[1.5%] md:p-[1%] flex gap-5 items-center justify-center">
            <div className='flex justify-center items-center flex-col'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
              </svg>
              <Link href="/" className="hover:text-white">Home</Link>
            </div>
            <div className='flex justify-center items-center flex-col'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
              <Link href="/search" className="hover:text-white">Search</Link>
            </div>
          </nav>
      </header>
    </>
  )
}

export default Footer