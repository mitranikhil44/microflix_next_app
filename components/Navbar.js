'use client'

import Link from 'next/link';
import Image from 'next/image';
import Logo from '../public/microflix_logo.png';
import LoadingSpinner from "./Loading";
import { useState } from 'react';

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state
  const showLoading = async () => {
    // Simulate data loading
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false when data is available
    }, 1000); // Simulating a 2-second delay
  }
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="px-5 py-2 flex justify-between items-center sticky top-0 z-50">
        <Link href="/" className="flex items-center" onClick={showLoading}>
          <div className="h-10 w-10">
            <Image src={Logo} alt="Logo" />
          </div>
        </Link>
        <div className="space-x-4">
          <Link href="/contact_us" className="text-white hover:text-yellow-500" onClick={showLoading}>
            Contact
          </Link>
          {/* Add more links here */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
