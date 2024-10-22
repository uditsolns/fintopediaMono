"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  FaGraduationCap,
  FaStore,
  FaBell,
  FaUser,
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 p-6 border-r border-gray-800">
        <div className="flex items-center mb-8">
          <Image
            src="/placeholder.svg?height=32&width=32"
            alt="Fintopedia Logo"
            width={32}
            height={32}
          />
          <h1 className="ml-2 text-xl font-bold">Fintopedia</h1>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <h2 className="text-sm font-semibold mb-2">
            Fintopedia Credits: 500
          </h2>
          <p className="text-xs text-gray-400 mb-3">
            You can use these credits to purchase courses
          </p>
          <button className="w-full bg-white text-gray-900 rounded px-4 py-2 text-sm font-medium">
            Redeem now
          </button>
        </div>

        <nav className="space-y-4">
          {/* <Link href="/" passHref>
            <a
              className={`flex items-center text-sm font-medium ${
                pathname === "/" ? "text-blue-400" : "text-white"
              }`}
            >
              <FaGraduationCap className="mr-3" />
              My courses
            </a>
          </Link> */}
          <Link
            href="/"
            className={`flex items-center text-sm font-medium ${
              pathname === "/" ? "text-blue-400" : "text-white"
            }`}
          >
            <FaGraduationCap className="mr-3" />
            My courses
          </Link>
          {/* <Link href="/store" passHref>
            <a
              className={`flex items-center text-sm font-medium ${
                pathname === "/store" ? "text-blue-400" : "text-white"
              }`}
            >
              <FaStore className="mr-3" />
              Store
            </a>
          </Link>
          <Link href="/notifications" passHref>
            <a
              className={`flex items-center text-sm font-medium ${
                pathname === "/notifications" ? "text-blue-400" : "text-white"
              }`}
            >
              <FaBell className="mr-3" />
              Notifications
            </a>
          </Link>
          <Link href="/account" passHref>
            <a
              className={`flex items-center justify-between text-sm font-medium ${
                pathname === "/account" ? "text-blue-400" : "text-white"
              }`}
            >
              <span className="flex items-center">
                <FaUser className="mr-3" />
                My account
              </span>
              <FaChevronDown />
            </a>
          </Link> */}
        </nav>

        {/* <Link href="/logout" passHref>
          <a className="absolute bottom-6 flex items-center text-sm font-medium">
            <FaSignOutAlt className="mr-3" />
            Logout
          </a>
        </Link> */}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};

export default Layout;
