import Modal from './Modal';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState('');
  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = async (e) => {
    const newSearchTerm = e.target.value;
    await setSearchTerm(newSearchTerm);
    await setSelectedSuggestion('');
    fetchSuggestions(newSearchTerm);
  };

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(`http://localhost:3000/api/search_result/?query=${query}`);
      const data = await response.json();

      if (Array.isArray(data.suggestions)) {
        setSearchResult(data);
        const titles = data.suggestions.map(item => item.title);
        setSuggestions(titles);
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const submit = async (e) => {
    const pushData = async () => {
      await router.push({
        pathname: '/search',
        query: {
          data: searchTerm,
          searchResult: JSON.stringify(searchResult),
        },
      });
      setSearchTerm("");
      closeModal();
    }
    if (!e) {
      pushData()
    } else {
      e.preventDefault();
      pushData()
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setSearchTerm(suggestion);
    closeModal();
    submit();
  };

  useEffect(() => {
    if (suggestions && suggestions.length > 0) {
      openModal();
    } else {
      closeModal();
    }
  }, [suggestions]);
  return (
    <>
      <header className="text-gray-400 body-font sticky bottom-0 left-0 text-sm md:text-base lg:text-lg bg-transparent">
        <div className='flex justify-center items-center bg-slate-600 rounded-3xl w-[75%] mx-auto mb-[1%]'>
          <Link href="/data/movies" className="mr-3 md:mr-5 hover:text-white bg-transparent">Movies</Link>
          <Link href="/data/web_series" className="mr-3 md:mr-5 hover:text-white bg-transparent">Web Series</Link>

          {/* Dropdown Button */}
          <div className=" relative group bg-transparent">
            <button className="text-white px-3 py-2 rounded-md focus:outline-none">
              More <svg className="bg-transparent h-4 w-4 inline-block ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M10 0a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd" />
              </svg>
            </button>
            <ul className="absolute hidden overflow-hidden top-0 left-0 text-gray-600 pt-2 group-hover:block z-10 w-60">
              <Link href="/data/other_country_content" className="block px-4 py-2">Other Country Content</Link>
              <Link href="/data/other_country_18+_content" className="block px-4 py-2">Other Country 18+ Content</Link>
              <Link href="/data/indian_content" className="block px-4 py-2">Indian Content</Link>
              <Link href="/data/indian_18+_content" className="block px-4 py-2">Indian 18+ Content</Link>
            </ul>
          </div>
          {/* End Dropdown Button */}
        </div>
        <div className="mx-auto flex p-3 md:p-5 flex-col md:flex-row justify-center items-center">
          <nav className="md:ml-auto md:py-1 md:pr-4 md:border-r md:border-gray-700 flex flex-wrap items-center justify-center">
            <div className='flex justify-center items-center flex-col mr-3 md:mr-5'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
              </svg>
              <Link href="/" className="hover:text-white">Home</Link>
            </div>


          </nav>
          <form onSubmit={submit} className="ml-auto">
            <div className="relative max-w-md">
              <div className="bg-transparent absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-5.2-5.2"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <input
                className="py-2 pl-10 pr-4 border border-gray-300 rounded-full w-full focus:ring focus:ring-blue-400 focus:border-blue-400"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
              />
            </div>
          </form>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className='p-[3%]'>
              <h2 className="font-semibold mb-4">Suggestions</h2>
              <hr className='mb-3' />
              <ul>
                {suggestions && suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer ${suggestion === selectedSuggestion ? 'text-blue-500' : 'text-gray-400'
                      } hover:text-white`}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                    <hr className='m-[3%]' />
                  </li>
                ))}
              </ul>
            </div>
          </Modal>
        </div>
      </header>
    </>
  )
}

export default Footer