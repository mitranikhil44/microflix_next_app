import Link from 'next/link'
import React from "react";

function Navbar() {
    return (
        <>
            <nav className="">
                    <div className="flex items-center">
                        <ul id="list" className="flex p-2 bg-white rounded">
                            <li className="flex cursor-pointer text-gray-600 text-sm leading-3 tracking-normal m-4 p-4 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                                <Link href="/">
                                    <span className="ml-2 font-bold">Home</span>
                                </Link>
                            </li>
                            <li className="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal m-4 p-4">
                                <Link href="/about">
                                    <span className="ml-2 font-bold">About</span>
                                </Link>
                            </li>
                            <li className="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal m-4 p-4">
                                <Link href="/blog">
                                    <span className="ml-2 font-bold">Blog</span>
                                </Link>
                            </li>
                            <li className="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal m-4 p-4">
                                <Link href="/contact_us">
                                    <span className="ml-2 font-bold">Contact us</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
            </nav>
        </>
    )
}

export default Navbar