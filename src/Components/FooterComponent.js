import React from 'react';

const FooterComponent = () => {
  return (
      <footer className="bg-gray-100 border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700 p-4">
        <div className="max-w-screen-xl mx-auto">
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 dark:text-gray-400 space-x-4">
            <li>
              <a href="/abouts" className="hover:underline">About</a>
            </li>
            <li>
              <a href="/blogs" className="hover:underline">Blog</a>
            </li>
            <li>
              <a href="/products" className="hover:underline">Product</a>
            </li>
            <li>
              <a href="/projects" className="hover:underline">Project</a>
            </li>
            <li>
              <a href="/prices" className="hover:underline">Price</a>
            </li>
            <li>
              <a href="/contacts" className="hover:underline">Contact</a>
            </li>
          </ul>
          <hr className="my-6 border-gray-200 dark:border-gray-700" />
          <span className="block text-sm text-gray-500 dark:text-gray-400 text-center">
            © 2024 <a href="/" className="hover:underline">CSW-ZOBIR™</a>. All Rights Reserved.
          </span>
        </div>
      </footer>
  );
}

export default FooterComponent;
