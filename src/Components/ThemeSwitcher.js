import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom'; // Assuming you are using react-router
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const ThemeSwitcher = () => {
  const location = useLocation();

  // Get initial theme state from cookies or default to 'light'
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = Cookies.get('theme');
    return savedTheme === 'dark';
  });

  // Update theme class and cookie when `isDarkMode` changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      Cookies.set('theme', 'dark', { expires: 365 });
    } else {
      document.documentElement.classList.remove('dark');
      Cookies.set('theme', 'light', { expires: 365 });
    }
  }, [isDarkMode]);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Don't render the switcher if the current path is /dashboard
  if (location.pathname === '/dashboard') {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <SunIcon className="w-6 h-6" aria-hidden="true" />
      ) : (
        <MoonIcon className="w-6 h-6" aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
