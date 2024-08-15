import React from 'react';
import Logo from '../images/logo.png';

const FooterComponent = () => {
  return (
    <footer className="bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700 p-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center mb-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} className="h-8" alt="Flowbite Logo" />
            <span className="text-2xl font-semibold dark:text-white">Home</span>
          </a>
        </div>
        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 dark:text-gray-400 space-x-4">
          <li>
            <a href="/about" className="hover:underline">About</a>
          </li>
          <li>
            <a href="/blog" className="hover:underline">Blog</a>
          </li>
          <li>
            <a href="/contacts" className="hover:underline">Contact</a>
          </li>
        </ul>
        <hr className="my-6 border-gray-200 dark:border-gray-700" />
        <span className="block text-sm text-gray-500 dark:text-gray-400 text-center">
          © 2024 <a href="/" className="hover:underline">CSW-BLOG™</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default FooterComponent;
