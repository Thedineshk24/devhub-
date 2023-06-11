import Link from "next/link";
import React, { useState } from "react";

const HeaderMyProfile = () => {
  const [showNotice, setShowNotice] = useState(true);

  const handleNoticeClose = () => {
    setShowNotice(false);
  };

  return (
    <header>
      {showNotice && (
        <div className="bg-indigo-500 text-white px-4 py-2 flex justify-between items-center">
          <span className="font-bold">
          Please click on "Join Now" when the timer reaches zero.
          </span>
          <button
            className="text-white focus:outline-none"
            onClick={handleNoticeClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 8.586l3.536-3.536 1.414 1.414L11.414 10l3.536 3.536-1.414 1.414L10 11.414l-3.536 3.536-1.414-1.414L8.586 10 5.05 6.464l1.414-1.414L10 8.586z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
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
