import Link from "next/link";
import React from "react";

const HeaderMyProfile = () => {
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <span className="self-center text-2xl font-bold text-indigo-600 whitespace-nowrap dark:text-white">
              DevHub
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <Link
              href="/profile"
              className="text-2xl font-bold inline-block px-4 py-2 text-indigo-600 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
            >
              My Profile
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderMyProfile;
