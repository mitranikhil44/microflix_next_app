import Modal from '../components/Modal';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

const search = () => {
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
      const response = await fetch(`https://microflix-next-app.vercel.app/api/search_result/?query=${query}`);
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
    if (suggestions.length > 0 && searchTerm.trim() !== "") {
      openModal();
    } else {
      closeModal();
    }
  }, [suggestions, searchTerm]);
  
  return (
    <>
      <form onSubmit={submit} className="ml-auto mb-2">
        <div className="relative max-w-md">
          <div className="bg-transparent absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"  >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-5.2-5.2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a4 4 0 11-8 0 4 4 0 018 0z" />
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
                <hr className='m-[1%]' />
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </>
  )
}

export default search