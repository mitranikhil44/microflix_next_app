import Link from 'next/link';
import Image from 'next/image';
import Logo from '../public/microflix_logo.png';

const Navbar = () => {


  return (
    <>
    <div className='flex justify-between items-center p-[4%] container'>
        <Link href="/" className='flex justify-center items-center w-[18%] sm:w-[10%] lg:w-[8%]'>
          <Image src={Logo} alt="logo" className='p-[2%]' />
        </Link>
        <Link href="/contact_us" className="mx-3 md:mx-5 hover:text-white">Contact</Link>
    </div>
    
                </>
  );
};

export default Navbar;
