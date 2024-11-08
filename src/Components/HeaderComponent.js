import React from 'react';
import Logo from '../images/logo.png';

const HeaderComponent = ({ toggleSidebar }) => {
  return (
    <nav className="bg-gray-100 border-gray-200 dark:bg-gray-900 sticky top-0 z-50 flex md:py-1 py-4 items-center">
      <div className="flex justify-start items-center">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse mx-10">
          <img src={Logo} className="h-8 rounded-full" alt="CSW-ZOBIR" />
        </a>
      </div>

      <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
        <div className="hidden w-full md:block md:w-auto mr-[100px]" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-100 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {[
              { href: '/', label: 'Home', current: true },
              { href: '/abouts', label: 'About' },
              { href: '/blogs', label: 'Blog' },
              { href: '/products', label: 'Product' },
              { href: '/projects', label: 'Project' },
              { href: '/contacts', label: 'Contact' },
            ].map(({ href, label, current }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`block py-2 px-3 ${
                    current
                      ? 'text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700'
                      : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700'
                  } md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                  aria-current={current ? 'page' : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;
