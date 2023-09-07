import Modal from './Modal';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Logo from '../public/microflix_logo.png';
import React, { useState, useEffect } from 'react';

const Navbar = () => {
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
    e.preventDefault();
    await router.push({
      pathname: '/query',
      query: {
        data: searchTerm,
        searchResult: JSON.stringify(searchResult),
      },
    });
    closeModal();
  }

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
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="mx-auto flex flex-wrap p-3 md:p-5 flex-col md:flex-row items-center">
        <Link href="/" className='flex justify-center items-center w-[10%] sm:w-[8%] lg:w-[5%]'>
          <Image src={Logo} alt="logo" className='p-[2%]' />
        </Link>
        <nav className="md:ml-auto md:py-1 md:pr-4 md:border-r md:border-gray-700	flex flex-wrap items-center text-base justify-center">
          <Link href="/" className="mr-3 md:mr-5 hover:text-white">Home</Link>
          <Link href="/series" className="mr-3 md:mr-5 hover:text-white">Series</Link>
          <Link href="/movies" className="mr-3 md:mr-5 hover:text-white">Movies</Link>
          <Link href="/contact_us" className="mr-3 md:mr-5 hover:text-white">Contact</Link>
        </nav>
        <form onSubmit={submit}>
          <div className="relative my-4 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none bg-transparent">
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
              <h2 className="text-lg font-semibold mb-4">Suggestions</h2>
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
  );
};

export default Navbar;
