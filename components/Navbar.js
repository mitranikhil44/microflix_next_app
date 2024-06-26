"use client";

import Link from "next/link";
import Image from "next/image";
import { useWebStore } from "@/context";
import Logo from "../public/microflix_logo.png";

const Navbar = () => {    
  const { setProgress } = useWebStore();
  const showLoading = () => {
    setProgress(30);
  };
  return (
    <>
      <div className="px-5 py-2 sticky top-0 z-50 bg-black">
        <div className="xl:w-[1560px] sm:w-[75%] w-full mx-auto">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center" onClick={showLoading}>
              <div className="w-10 xl:w-[15%] lg:w-[13%] smd:w-[10%]">
                <Image src={Logo} alt="Logo" />
              </div>
              <p className="text-yellow-600 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl xxl:text-3xl ml-[1rem]">🅼🅸🅲🆁🅾🅵🅻🅸🆇</p>
            </Link>
            <div className="space-x-4 mr-[2%]">
              <Link href="/contact_us" passHref onClick={showLoading}>
                <div className="text-white hover:text-yellow-500 hover:underline">Contact Us</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
