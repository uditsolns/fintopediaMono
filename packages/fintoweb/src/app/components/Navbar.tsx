"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Logo from "../../assets/Fintopedia logo-White.png";
import Arrow from "../../assets/Arrow - Down Circle.png";
import SearchIcon from "../../assets/iconamoon_search-light.png";
import CartIcon from "../../assets/Shopping-Cart-2.png";
import UserIcon from "../../assets/mingcute_user-4-fill.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  function getMenuClasses() {
    let menuClasses = [];
    if (isOpen) {
      menuClasses = [
        "flex",
        "absolute",
        "top-[80px]",
        "bg-gray-800",
        "w-full",
        "p-4",
        "left-0",
        "gap-10",
        "flex-col",
      ];
    } else {
      menuClasses = ["hidden", "md:flex"];
    }
    return menuClasses.join(" ");
  }

  return (
    <nav className="background-gradient text-white p-4 sm:p-6 flex justify-between items-center border-b border-gray-400">
      <div className="flex items-center">
        <span className="font-bold">Browse</span>
        <Image src={Arrow} alt="Arrow" className="ml-2 inline-block" />
      </div>

      <div className="flex items-center">
        <a href="/" className="text-2xl font-bold">
          <Image src={Logo} alt="Logo" className="ml-2 inline-block" />
        </a>
      </div>

      <div className="flex items-center">
        <Link href="/search" prefetch={true} className="mx-2 hover:text-gray-300">
          <Image
            src={SearchIcon}
            alt="Search"
            className="inline-block cursor-pointer"
          />
        </Link>

        <div className="md:hidden flex items-center ml-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        <div className={getMenuClasses()}>
          <Link
            href="/cart"
            prefetch={true}
            className="mx-2 hover:text-gray-300 flex items-center"
          >
            <Image src={CartIcon} alt="Cart" className="inline-block mr-2" />
            Cart
          </Link>
          <Link
            href="/sign-up"
            prefetch={true}
            className="mx-2 hover:text-gray-300 flex items-center"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            prefetch={true}
            className="mx-2 hover:text-gray-300 flex items-center bg-white text-black py-2 px-4 rounded-md"
          >
            <Image src={UserIcon} alt="User" className="inline-block mr-2" />
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};
