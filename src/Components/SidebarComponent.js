import React from 'react';
import Logo from '../images/logo.png';

const SidebarComponent = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div>
      {/* Button to toggle the sidebar */}
      <button
        onClick={toggleSidebar}
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 fixed top-3 right-4 z-50"
        aria-controls="sidebar"
        aria-expanded={isSidebarOpen}
      >
        <span className="sr-only">Toggle Sidebar</span>
        {isSidebarOpen ? (
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        ) : (
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900 md:w-64 w-full transition-transform duration-300 overflow-hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        id="sidebar"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center p-4 mt-20 block ">
            <img src={Logo} className="h-20 flex justify-center" alt="CSW-BLOG" />
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="block py-2 px-4 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/abouts"
                  className="block py-2 px-4 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/blogs"
                  className="block py-2 px-4 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/news"
                  className="block py-2 px-4 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  News
                </a>
              </li>
              <li>
                <a
                  href="/contacts"
                  className="block py-2 px-4 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
