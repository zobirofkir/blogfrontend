import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarComponent from '../Components/SidebarComponent';
import FooterComponent from '../Components/FooterComponent';
import HeaderComponent from '../Components/HeaderComponent';

const LayoutComponent = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const isDashboardRoute = location.pathname === '/dashboard';
  const isCreateBlogRoute = location.pathname === '/create-blog';
  const isUpdateBlogRoute = location.pathname.startsWith('/update');
  const isCreateUserRoute = location.pathname === '/create-user';
  const isUpdateUserRoute = location.pathname === '/update-user';
  
  const isCreateProductRoute = location.pathname === '/create-product';
  const isUpdateProductRoute = location.pathname === '/update-product';


  const isSidebarVisible = !isDashboardRoute && !isCreateBlogRoute && !isUpdateBlogRoute && !isCreateUserRoute && !isUpdateProductRoute && !isCreateProductRoute;

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 bg-white">
      {!isDashboardRoute && !isCreateBlogRoute && !isUpdateBlogRoute && !isCreateUserRoute && !isCreateProductRoute && !isUpdateProductRoute &&<HeaderComponent />}
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
      {!isDashboardRoute && !isCreateBlogRoute && !isUpdateBlogRoute && !isCreateUserRoute && !isUpdateUserRoute && !!isUpdateProductRoute && !isCreateProductRoute &&<FooterComponent />}
    </div>
  );
};

export default LayoutComponent;
