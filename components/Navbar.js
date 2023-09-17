import Link from 'next/link';
import Image from 'next/image';
import Logo from '../public/microflix_logo.png';

const Navbar = () => {
  return (
    <div className="px-5 py-2 flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="flex items-center">
        <div className="h-10 w-10">
          <Image src={Logo} alt="Logo" />
        </div>
      </Link>
      <div className="space-x-4">
        <Link href="/contact_us" className="text-white hover:text-gray-400">
          Contact
        </Link>
        {/* Add more links here */}
      </div>
    </div>
  );
};

export default Navbar;
