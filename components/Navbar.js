'use client'

import Link from 'next/link';
import Image from 'next/image';
import Logo from '../public/microflix_logo.png';

const Navbar = () => {
  return (
    <>
      <div className='px-5 py-2 sticky top-0 z-50 bg-black'>
        <div className='xl:w-[1560px] sm:w-[75%] w-full mx-auto'>
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <div className="h-10 w-10">
                <Image src={Logo} alt="Logo" />
              </div>
            </Link>
            <div className="space-x-4">
              <Link href="/contact_us" passHref>
                <div className="text-white hover:text-yellow-500">
                  Contact
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
