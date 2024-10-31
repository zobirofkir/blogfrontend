import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarComponent from '../components/SidebarComponent';
import FooterComponent from '../components/FooterComponent';
import HeaderComponent from '../Components/HeaderComponent';

const LayoutComponent = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const isSidebarVisible = ![
    '/dashboard',
    '/create-blog',
    '/update-blog',
    '/create-user',
    '/update-user',
    '/create-product',
    '/update-product',
    '/create-project',
    '/update-project'
  ].includes(location.pathname);

  const showHeader = ![
    '/dashboard',
    '/create-blog',
    '/update-blog',
    '/create-user',
    '/create-product',
    '/update-product',
    '/create-project',
    '/update-project'
  ].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 bg-white">
      {showHeader && <HeaderComponent />}
      <div className="flex flex-1">
        {isSidebarVisible && (
          <SidebarComponent
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        )}
        <main
          className={`flex-grow transition-all overflow-hidden duration-300 ${
            isSidebarOpen && isSidebarVisible ? 'ml-64' : 'ml-0'
          }`}
        >
          {children}
        </main>
      </div>
      {isSidebarVisible && <FooterComponent />}
    </div>
  );
};

export default LayoutComponent;
